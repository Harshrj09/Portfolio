import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

// Full-page liquid gradient: domain-warped noise drawn by one WebGL fragment shader.
// The blobs flow continuously and swirl around the cursor. The canvas renders at a
// fraction of screen resolution and is stretched by CSS — the image is soft anyway,
// so it looks the same at a small fraction of the GPU cost.
// Hardware GPU vs. Chrome's software fallback (hardware acceleration off / GPU blocklisted)
const QUALITY = {
  gpu: { scale: 0.3, fps: 30, octaves: 4 },
  software: { scale: 0.16, fps: 20, octaves: 3 },
}

const vertexSource = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`

const fragmentSource = (octaves: number) => `
precision mediump float;
#define OCTAVES ${octaves}
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uSwirl;
uniform float uScroll;
uniform float uDark;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 r = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < OCTAVES; i++) {
    v += a * noise(p);
    p = r * p * 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * aspect, uv.y) * 1.8;
  vec2 m = vec2(uMouse.x * aspect, uMouse.y) * 1.8;

  // Swirl the field around the cursor
  vec2 d = p - m;
  float md = length(d);
  float twist = uSwirl * exp(-md * md * 2.2);
  float c = cos(twist), s = sin(twist);
  p = m + mat2(c, -s, s, c) * d;
  p.y -= uScroll;

  float t = uTime * 0.05;
  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p + 3.0 * q + vec2(1.7, 9.2) + t * 1.4),
                fbm(p + 3.0 * q + vec2(8.3, 2.8) - t * 1.1));
  float f = fbm(p + 3.0 * r);

  vec3 col;
  if (uDark > 0.5) {
    vec3 base = vec3(0.0, 0.012, 0.004);
    vec3 deep = vec3(0.0, 0.17, 0.06);
    vec3 teal = vec3(0.0, 0.26, 0.2);
    vec3 neon = vec3(0.1, 0.62, 0.3);
    col = mix(base, deep, clamp(f * f * 2.2, 0.0, 1.0));
    col = mix(col, teal, clamp(length(q) * 0.55 - 0.15, 0.0, 1.0) * 0.6);
    col = mix(col, neon, clamp(pow(r.x, 3.0) * 1.6, 0.0, 1.0) * 0.55);
    col += vec3(0.0, 0.5, 0.25) * 0.09 * exp(-md * md * 5.0);
    float vig = smoothstep(1.25, 0.25, length(uv - 0.5));
    col *= mix(0.45, 1.0, vig);
  } else {
    vec3 base = vec3(0.95, 1.0, 0.965);
    vec3 mint = vec3(0.8, 0.97, 0.86);
    vec3 teal = vec3(0.74, 0.95, 0.9);
    vec3 green = vec3(0.6, 0.9, 0.7);
    col = mix(base, mint, clamp(f * f * 2.2, 0.0, 1.0));
    col = mix(col, teal, clamp(length(q) * 0.55 - 0.15, 0.0, 1.0) * 0.6);
    col = mix(col, green, clamp(pow(r.x, 3.0) * 1.6, 0.0, 1.0) * 0.5);
    col -= vec3(0.06, 0.0, 0.04) * exp(-md * md * 5.0);
  }
  gl_FragColor = vec4(col, 1.0);
}
`

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader))
    return null
  }
  return shader
}

export default function LiquidBackground() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const darkRef = useRef(isDark)
  darkRef.current = isDark
  const drawRef = useRef<() => void>(() => {})

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { antialias: false, depth: false, alpha: false, powerPreference: 'low-power' })
    if (!gl) return // CSS fallback gradient on the wrapper stays visible

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
    const renderer = debugInfo ? String(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)) : ''
    const quality = /swiftshader|llvmpipe|software|basic render/i.test(renderer) ? QUALITY.software : QUALITY.gpu

    const vs = compile(gl, gl.VERTEX_SHADER, vertexSource)
    const fs = compile(gl, gl.FRAGMENT_SHADER, fragmentSource(quality.octaves))
    if (!vs || !fs) return
    const program = gl.createProgram()!
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(program, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const u = {
      res: gl.getUniformLocation(program, 'uRes'),
      time: gl.getUniformLocation(program, 'uTime'),
      mouse: gl.getUniformLocation(program, 'uMouse'),
      swirl: gl.getUniformLocation(program, 'uSwirl'),
      scroll: gl.getUniformLocation(program, 'uScroll'),
      dark: gl.getUniformLocation(program, 'uDark'),
    }

    const resize = () => {
      canvas.width = Math.max(1, Math.round(window.innerWidth * quality.scale))
      canvas.height = Math.max(1, Math.round(window.innerHeight * quality.scale))
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    // Cursor target in 0..1 (y up); the rendered position eases toward it
    const target = { x: 0.5, y: 0.6 }
    const mouse = { x: 0.5, y: 0.6 }
    let swirl = 0.6
    let energy = 0
    const onPointer = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth
      const ny = 1 - e.clientY / window.innerHeight
      energy = Math.min(1, energy + Math.hypot(nx - target.x, ny - target.y) * 6)
      target.x = nx
      target.y = ny
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const start = performance.now()
    let raf = 0

    let lastDraw = performance.now()
    const draw = () => {
      const now = performance.now()
      const k = Math.min(4, (now - lastDraw) / 16.7) // easing is tuned per 60fps frame
      lastDraw = now
      mouse.x += (target.x - mouse.x) * (1 - Math.pow(0.94, k))
      mouse.y += (target.y - mouse.y) * (1 - Math.pow(0.94, k))
      energy *= Math.pow(0.96, k)
      // Resting swirl plus a stronger twist while the cursor is moving
      swirl += (0.6 + energy * 2.4 - swirl) * (1 - Math.pow(0.92, k))

      gl.uniform2f(u.res, canvas.width, canvas.height)
      gl.uniform1f(u.time, reducedMotion ? 0 : (performance.now() - start) / 1000)
      gl.uniform2f(u.mouse, mouse.x, mouse.y)
      gl.uniform1f(u.swirl, swirl)
      gl.uniform1f(u.scroll, window.scrollY / window.innerHeight * 0.35)
      gl.uniform1f(u.dark, darkRef.current ? 1 : 0)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    drawRef.current = draw

    // The flow is slow, so a capped frame rate looks identical and halves the GPU work
    const frameMs = 1000 / quality.fps
    let lastFrame = 0
    const loop = (now: number) => {
      if (now - lastFrame >= frameMs - 2) {
        lastFrame = now
        draw()
      }
      raf = requestAnimationFrame(loop)
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })
    if (reducedMotion) {
      draw()
      window.addEventListener('scroll', draw, { passive: true })
    } else {
      window.addEventListener('pointermove', onPointer, { passive: true })
      raf = requestAnimationFrame(loop)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('scroll', draw)
      // Free GL objects but keep the context: StrictMode remounts and reuses this canvas's context
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [])

  // Redraw immediately on theme change (matters when motion is reduced)
  useEffect(() => { drawRef.current() }, [isDark])

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10"
      aria-hidden="true"
      style={{
        background: isDark
          ? 'radial-gradient(ellipse at 30% 20%, #03200c, #000300 70%)'
          : 'radial-gradient(ellipse at 30% 20%, #dcf7e6, #f3fff6 70%)',
      }}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  )
}
