import { personal } from '../data/content'
import { useTheme } from '../context/ThemeContext'
import { memo } from 'react'

const Footer = memo(function Footer() {
  const { theme } = useTheme()

  return (
    <footer
      className="py-8 px-6 text-center border-t"
      style={{
        borderColor: theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
      }}
    >
      <p className="text-sm" style={{ color: theme === 'dark' ? '#555' : '#aaa' }}>
        {personal.name} · Great Lakes Institute of Management · Batch 2026-27
      </p>
    </footer>
  )
})

export default Footer
