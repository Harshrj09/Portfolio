import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

interface Props {
  color?: string
  index?: number
}

const darkColors = ['#2E6BFF', '#8B5CF6', '#06B6D4', '#FF6B4A', '#2E6BFF', '#8B5CF6', '#06B6D4', '#2E6BFF']
const lightColors = ['#4D8BFF', '#A78BFA', '#22D3EE', '#FF8566', '#4D8BFF', '#A78BFA', '#22D3EE', '#4D8BFF']

export default function SectionGlow({ color, index = 0 }: Props) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const colors = isDark ? darkColors : lightColors
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, isDark ? 0.5 : 0.4, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8])
  const glowColor = color || colors[index % colors.length]

  return (
    <div ref={ref} className="relative h-20 flex items-center justify-center overflow-hidden">
      <motion.div
        style={{ opacity, scale }}
        className="w-full h-12 max-w-2xl mx-auto rounded-full"
      >
        <div
          className="w-full h-full rounded-full blur-3xl"
          style={{
            background: `radial-gradient(ellipse at center, ${glowColor}${isDark ? '40' : '33'}, transparent 70%)`,
          }}
        />
      </motion.div>
    </div>
  )
}
