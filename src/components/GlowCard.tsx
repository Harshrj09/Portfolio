import { useRef, type ReactNode } from 'react'
import { useTheme } from '../context/ThemeContext'

interface Props {
  children: ReactNode
  className?: string
}

export default function GlowCard({ children, className = '' }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--glow-x', `${x}px`)
    card.style.setProperty('--glow-y', `${y}px`)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`bento-card relative overflow-hidden group ${className}`}
      style={{
        background: theme === 'dark'
          ? 'radial-gradient(circle 200px at var(--glow-x, 50%) var(--glow-y, 50%), rgba(46,107,255,0.08), transparent), #1A1A22'
          : 'radial-gradient(circle 200px at var(--glow-x, 50%) var(--glow-y, 50%), rgba(46,107,255,0.05), transparent), #ffffff',
      }}
    >
      {children}
    </div>
  )
}
