import { useRef, useEffect } from 'react'

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)
  const ticking = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY
          const docHeight = document.documentElement.scrollHeight - window.innerHeight
          const progress = docHeight > 0 ? scrollTop / docHeight : 0
          if (barRef.current) {
            barRef.current.style.transform = `scaleX(${progress})`
          }
          ticking.current = false
        })
        ticking.current = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left"
      style={{
        transform: 'scaleX(0)',
        background: 'linear-gradient(90deg, #00C853, #00FF88, #B6FF3B)',
        willChange: 'transform',
      }}
    />
  )
}
