import { useTheme } from '../context/ThemeContext'

interface Props {
  color?: string
  index?: number
}

const glowColors = ['0,255,65', '0,255,136', '0,229,176', '57,255,20', '0,255,65', '0,255,136', '0,229,176', '182,255,59']

// Soft spotlight that bleeds into the sections above and below the divider
export default function SectionGlow({ color, index = 0 }: Props) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const rgb = color || glowColors[index % glowColors.length]
  const side = index % 2 === 0 ? '30%' : '70%'

  return (
    <div className="relative h-6 pointer-events-none" aria-hidden="true">
      <div
        className="absolute -z-10 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[900px] max-w-[140vw] h-[520px] section-spotlight"
        style={{
          left: side,
          background: `radial-gradient(ellipse at center, rgba(${rgb},${isDark ? 0.11 : 0.09}) 0%, rgba(${rgb},${isDark ? 0.04 : 0.03}) 40%, transparent 70%)`,
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 h-px w-[min(640px,80vw)]"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(${rgb},${isDark ? 0.35 : 0.3}), transparent)`,
        }}
      />
    </div>
  )
}
