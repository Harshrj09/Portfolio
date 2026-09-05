export default function NoiseOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        opacity: 0.02,
        mixBlendMode: 'overlay',
      }}
    >
      <svg width="100%" height="100%">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  )
}
