import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

export default function GridBackground() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const darkOrbs = [
    { color: 'rgba(46,107,255,0.25)', x: '10%', y: '15%', size: '500px', delay: 0, duration: 25 },
    { color: 'rgba(139,92,246,0.22)', x: '85%', y: '20%', size: '600px', delay: -5, duration: 30 },
    { color: 'rgba(6,182,212,0.2)', x: '50%', y: '80%', size: '450px', delay: -12, duration: 22 },
    { color: 'rgba(255,107,74,0.15)', x: '20%', y: '60%', size: '400px', delay: -8, duration: 28 },
  ]

  const lightOrbs = [
    { color: 'rgba(46,107,255,0.18)', x: '10%', y: '15%', size: '500px', delay: 0, duration: 25 },
    { color: 'rgba(6,182,212,0.16)', x: '85%', y: '20%', size: '600px', delay: -5, duration: 30 },
    { color: 'rgba(139,92,246,0.14)', x: '50%', y: '80%', size: '450px', delay: -12, duration: 22 },
    { color: 'rgba(255,107,74,0.12)', x: '20%', y: '60%', size: '400px', delay: -8, duration: 28 },
  ]

  const orbs = isDark ? darkOrbs : lightOrbs

  const gridColor = isDark ? 'rgba(6,182,212,0.08)' : 'rgba(46,107,255,0.06)'
  const dotColor = isDark ? 'rgba(6,182,212,0.12)' : 'rgba(46,107,255,0.1)'

  return (
    <>
      {/* Animated gradient orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {orbs.map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-[200px] opacity-60"
            style={{
              left: orb.x,
              top: orb.y,
              width: orb.size,
              height: orb.size,
              backgroundColor: orb.color,
              transformOrigin: 'center',
            }}
            animate={{
              x: [0, 80, -60, 0],
              y: [0, -100, 50, 0],
              scale: [1, 1.15, 0.9, 1],
              opacity: [0.5, 0.7, 0.4, 0.5],
            }}
            transition={{
              duration: orb.duration,
              delay: orb.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Subtle animated dot grid */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            radial-gradient(${dotColor} 1.5px, transparent 1.5px),
            radial-gradient(${dotColor} 1.5px, transparent 1.5px)
          `,
          backgroundSize: '50px 50px',
          backgroundPosition: '0 0, 25px 25px',
        }}
        animate={{
          backgroundPosition: ['0 0, 25px 25px', '50px 50px, 75px 75px', '0 0, 25px 25px'],
        }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />

      {/* Fine line grid - more visible */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(${gridColor} 0.5px, transparent 0.5px),
            linear-gradient(90deg, ${gridColor} 0.5px, transparent 0.5px)
          `,
          backgroundSize: '80px 80px',
        }}
        animate={{
          backgroundPosition: ['0 0', '80px 80px', '0 0'],
        }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />

      {/* Subtle diagonal wave pattern */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30" style={{ maskImage: isDark ? 'none' : 'none' }}>
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <defs>
            <pattern id="wave" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path
                d="M0,10 Q5,5 10,10 T20,10"
                stroke={isDark ? 'rgba(6,182,212,0.15)' : 'rgba(46,107,255,0.1)'}
                strokeWidth="0.5"
                fill="none"
              />
              <path
                d="M0,15 Q5,20 10,15 T20,15"
                stroke={isDark ? 'rgba(139,92,246,0.1)' : 'rgba(139,92,246,0.08)'}
                strokeWidth="0.5"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wave)" />
        </svg>
      </div>

      {/* Center glow that follows scroll */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(46,107,255,0.08), transparent 70%)'
            : 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(46,107,255,0.06), transparent 70%)',
        }}
      />
    </>
  )
}