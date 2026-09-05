import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Props {
  children: string
  className?: string
  delay?: number
}

export default function TextReveal({ children, className = '', delay = 0 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {children.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            delay: delay + i * 0.02,
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}
