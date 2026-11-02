import { motion } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'

interface Props {
  children: ReactNode
  subtitle?: string
  className?: string
  delay?: number
  gradient?: string
}

const gradients = [
  'linear-gradient(135deg, #00FF41, #00FF88)',
  'linear-gradient(135deg, #00FF88, #00E5B0)',
  'linear-gradient(135deg, #39FF14, #00FF88)',
  'linear-gradient(135deg, #00E5B0, #00FF41)',
  'linear-gradient(135deg, #00FF41, #B6FF3B)',
  'linear-gradient(135deg, #00FF88, #39FF14)',
  'linear-gradient(135deg, #B6FF3B, #00FF88)',
  'linear-gradient(135deg, #00FF41, #00E5B0)',
]

export default function SectionHeading({ children, subtitle, className = '', delay = 0, gradient }: Props) {
  const gradientStyle = gradient ? ({ '--heading-gradient': gradient } as CSSProperties) : undefined

  return (
    // The wrapper watches the viewport: the h2 itself starts fully clipped by overflow-hidden,
    // so an observer on it alone may never report it as visible
    <motion.div
      className={`overflow-hidden mb-8 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.h2
        variants={{ hidden: { y: 60, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
        transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`section-title ${gradient ? 'heading-gradient' : ''} font-heading text-4xl md:text-5xl lg:text-6xl font-bold`}
        style={gradientStyle}
      >
        {children}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 0.7 } }}
          transition={{ duration: 0.6, delay: delay + 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-sm md:text-base mt-3 max-w-lg"
          style={{ color: 'var(--color-blue)' }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}

export { gradients }
