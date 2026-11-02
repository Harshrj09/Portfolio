import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { Sun, Moon } from 'lucide-react'
import { navLinks } from '../data/content'
import { memo } from 'react'

const Navbar = memo(function Navbar() {
  const { theme, toggle } = useTheme()

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{
        backgroundColor: theme === 'dark' ? 'rgba(4,10,6,0.94)' : 'rgba(246,255,249,0.94)',
        borderColor: theme === 'dark' ? 'rgba(0,191,165,0.1)' : 'rgba(0,0,0,0.06)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="relative flex items-center justify-center w-10 h-10">
          <div className="absolute inset-0 animate-spin-slow rounded-full">
            <div
              className="w-full h-full rounded-full"
              style={{ background: 'conic-gradient(from 0deg, #00C853, #00BFA5, #00C853)', padding: '2px' }}
            >
              <div
                className="w-full h-full rounded-full"
                style={{ backgroundColor: theme === 'dark' ? '#050805' : '#F7F6F2' }}
              />
            </div>
          </div>
          <span className="relative z-10 font-heading font-bold text-sm gradient-text">HS</span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium hover:text-blue transition-colors relative group"
              style={{ color: theme === 'dark' ? '#a0a0a0' : '#555' }}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        <button
          onClick={toggle}
          className="relative w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          style={{
            backgroundColor: theme === 'dark' ? 'rgba(0,191,165,0.15)' : 'rgba(0,200,83,0.1)',
          }}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <motion.div
            key={theme}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {theme === 'dark' ? (
              <Sun size={18} className="text-yellow-400" />
            ) : (
              <Moon size={18} className="text-blue" />
            )}
          </motion.div>
        </button>
      </div>
    </motion.nav>
  )
})

export default Navbar
