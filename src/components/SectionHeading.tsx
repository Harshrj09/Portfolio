import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  subtitle?: string
  className?: string
  delay?: number
  gradient?: string
}

const gradients = [
  'linear-gradient(135deg, #2E6BFF, #06B6D4, #8B5CF6)',
  'linear-gradient(135deg, #8B5CF6, #FF6B4A, #2E6BFF)',
  'linear-gradient(135deg, #06B6D4, #2E6BFF, #FF6B4A)',
  'linear-gradient(135deg, #FF6B4A, #8B5CF6, #06B6D4)',
  'linear-gradient(135deg, #2E6BFF, #8B5CF6, #06B6D4)',
  'linear-gradient(135deg, #8B5CF6, #06B6D4, #FF6B4A)',
  'linear-gradient(135deg, #06B6D4, #FF6B4A, #2E6BFF)',
  'linear-gradient(135deg, #FF6B4A, #2E6BFF, #8B5CF6)',
]

export default function SectionHeading({ children, subtitle, className = '', delay = 0, gradient }: Props) {
  const gradientStyle = gradient ? { background: gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' } : undefined

  return (
    <div className={`overflow-hidden mb-10 ${className}`}>
      <motion.h2
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold"
        style={gradientStyle}
      >
        {children}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: delay + 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-sm md:text-base mt-3 max-w-lg"
          style={{ color: 'var(--color-blue)', opacity: 0.7 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

export { gradients }
