import { useRef, useEffect, useCallback } from 'react'
import { useTheme } from '../context/ThemeContext'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

const CELL_SIZE = 120

// 1 in the middle of the hero, easing to 0 at its edges
function edgeFade(x: number, y: number, w: number, h: number) {
  const dx = (x - w / 2) / (w * 0.55)
  const dy = (y - h * 0.45) / (h * 0.6)
  return Math.max(0, Math.min(1, 1.6 - 1.6 * Math.sqrt(dx * dx + dy * dy)))
}

function buildGrid(particles: Particle[], w: number, h: number) {
  const cols = Math.ceil(w / CELL_SIZE)
  const rows = Math.ceil(h / CELL_SIZE)
  const grid: Particle[][] = Array.from({ length: cols * rows }, () => [])
  for (const p of particles) {
    const cx = Math.floor(p.x / CELL_SIZE)
    const cy = Math.floor(p.y / CELL_SIZE)
    if (cx >= 0 && cx < cols && cy >= 0 && cy < rows) {
      grid[cy * cols + cx].push(p)
    }
  }
  return { grid, cols, rows }
}

function getNeighbors(grid: Particle[][], cols: number, rows: number, px: number, py: number) {
  const cx = Math.floor(px / CELL_SIZE)
  const cy = Math.floor(py / CELL_SIZE)
  const neighbors: Particle[] = []
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const nx = cx + dx
      const ny = cy + dy
      if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
        const cell = grid[ny * cols + nx]
        for (let i = 0; i < cell.length; i++) neighbors.push(cell[i])
      }
    }
  }
  return neighbors
}

export default function ParticleField() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animRef = useRef<number>(0)
  const visibleRef = useRef(true)
  const themeRef = useRef(isDark)
  themeRef.current = isDark

  const initParticles = useCallback((width: number, height: number) => {
    const count = Math.min(Math.floor((width * height) / 14000), width < 768 ? 40 : 90)
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.25,
    }))
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Cached geometry so the animation loop never forces a layout read
    const size = { w: 0, h: 0, pageTop: 0, pageLeft: 0 }
    let mouseClient = { x: -1000, y: -1000 }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const rect = canvas.getBoundingClientRect()
      size.w = rect.width
      size.h = rect.height
      size.pageTop = rect.top + window.scrollY
      size.pageLeft = rect.left + window.scrollX
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (particlesRef.current.length === 0) {
        initParticles(rect.width, rect.height)
      }
    }

    // Listen on window: hero content sits above the canvas and would swallow canvas events
    const handleMouse = (e: MouseEvent) => {
      mouseClient = { x: e.clientX, y: e.clientY }
    }

    const handleMouseLeave = () => {
      mouseClient = { x: -1000, y: -1000 }
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Lines and dots are batched into a few alpha buckets: one stroke/fill call per bucket
    const BUCKETS = 4

    const draw = () => {
      const { w, h } = size
      ctx.clearRect(0, 0, w, h)

      const mouse = {
        x: mouseClient.x + window.scrollX - size.pageLeft,
        y: mouseClient.y + window.scrollY - size.pageTop,
      }
      if (mouseClient.x < -999) mouse.x = mouse.y = -1000
      const particles = particlesRef.current
      const rgb = themeRef.current ? '0, 255, 136' : '0, 153, 68'
      const connectionDist = 130
      const connectionDistSq = connectionDist * connectionDist
      const maxDist = 150
      const maxDistSq = maxDist * maxDist

      const dotPaths = Array.from({ length: BUCKETS }, () => new Path2D())
      for (const p of particles) {
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const distSq = dx * dx + dy * dy

        if (distSq < maxDistSq && distSq > 0) {
          const dist = Math.sqrt(distSq)
          const force = (1 - dist / maxDist) * 0.03
          p.vx -= (dx / dist) * force
          p.vy -= (dy / dist) * force
        }

        if (!reducedMotion) {
          p.x += p.vx
          p.y += p.vy
        }
        p.vx *= 0.99
        p.vy *= 0.99
        // Keep an idle drift so the network never freezes after damping
        if (Math.abs(p.vx) + Math.abs(p.vy) < 0.12) {
          p.vx += (Math.random() - 0.5) * 0.05
          p.vy += (Math.random() - 0.5) * 0.05
        }

        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        const b = Math.floor(p.opacity * edgeFade(p.x, p.y, w, h) * (BUCKETS - 0.01))
        dotPaths[b].moveTo(p.x + p.size, p.y)
        dotPaths[b].arc(p.x, p.y, p.size, 0, Math.PI * 2)
      }
      dotPaths.forEach((path, b) => {
        ctx.fillStyle = `rgba(${rgb}, ${((b + 1) / BUCKETS) * 0.75})`
        ctx.fill(path)
      })

      // Spatial grid for O(n) neighbor lookup instead of O(n²)
      const { grid, cols, rows } = buildGrid(particles, w, h)
      const linePaths = Array.from({ length: BUCKETS }, () => new Path2D())
      for (const p of particles) {
        const neighbors = getNeighbors(grid, cols, rows, p.x, p.y)
        for (let k = 0; k < neighbors.length; k++) {
          const q = neighbors[k]
          // Visit each pair once
          if (q.x < p.x || (q.x === p.x && q.y <= p.y)) continue
          const dx = p.x - q.x
          const dy = p.y - q.y
          const distSq = dx * dx + dy * dy
          if (distSq < connectionDistSq) {
            const closeness = (1 - Math.sqrt(distSq) / connectionDist) * edgeFade(p.x, p.y, w, h)
            const b = Math.min(BUCKETS - 1, Math.floor(closeness * BUCKETS))
            linePaths[b].moveTo(p.x, p.y)
            linePaths[b].lineTo(q.x, q.y)
          }
        }
      }
      ctx.lineWidth = 0.6
      linePaths.forEach((path, b) => {
        ctx.strokeStyle = `rgba(${rgb}, ${(0.22 * (b + 0.5)) / BUCKETS})`
        ctx.stroke(path)
      })

      animRef.current = visibleRef.current ? requestAnimationFrame(draw) : 0
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('mousemove', handleMouse, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true })

    // Stop the loop entirely while the hero is off screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
        if (entry.isIntersecting && !animRef.current) animRef.current = requestAnimationFrame(draw)
      },
      { threshold: 0 }
    )
    observer.observe(canvas)

    animRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouse)
      document.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animRef.current)
      observer.disconnect()
    }
  }, [initParticles])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        opacity: isDark ? 0.85 : 0.6,
      }}
      aria-hidden="true"
    />
  )
}
