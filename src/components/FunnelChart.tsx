import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SectionHeading, { gradients } from './SectionHeading'
import { funnelData } from '../data/content'
import { useTheme } from '../context/ThemeContext'

export default function FunnelChart() {
  const [animated, setAnimated] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    const el = document.getElementById('funnel')
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const maxValue = funnelData[0].value

  return (
    <section id="funnel" className="py-10 px-6 max-w-6xl mx-auto">
      <SectionHeading subtitle="From research to conversion — my Convertcart workflow" gradient={gradients[3]}>Demand Generation Funnel</SectionHeading>

      <p
        className="text-sm mb-8 max-w-lg"
        style={{ color: theme === 'dark' ? '#777' : '#888' }}
      >
        Illustrative funnel from my Convertcart role — 300+ brands researched monthly flowing through to qualified conversions.
      </p>

      <div className="bento-card">
        <div className="space-y-5">
          {funnelData.map((item, i) => {
            const rawPercent = (item.value / maxValue) * 100
            const widthPercent = Math.max(rawPercent, 22)
            return (
              <div key={item.stage}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium">{item.stage}</span>
                  <span className="text-sm font-heading font-bold text-blue">
                    {item.value}+
                  </span>
                </div>
                <div
                  className="h-10 rounded-xl overflow-hidden relative"
                  style={{
                    backgroundColor: theme === 'dark' ? 'rgba(46,107,255,0.08)' : 'rgba(46,107,255,0.06)',
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: animated ? `${widthPercent}%` : 0 }}
            transition={{ delay: i * 0.15, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="h-full rounded-xl flex items-center px-4 group relative"
                    style={{ backgroundColor: item.color }}
                  >
                    <span className="text-xs font-bold text-white whitespace-nowrap">
                      {item.value}+
                    </span>
                    {/* Tooltip */}
                    <div
                      className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      style={{
                        backgroundColor: theme === 'dark' ? '#1A1A22' : '#fff',
                        color: theme === 'dark' ? '#e5e5e5' : '#333',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      }}
                    >
                      {item.stage}: {item.value}+
                    </div>
                  </motion.div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 pt-4 border-t" style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}>
          <div className="flex flex-wrap gap-3 text-sm font-heading font-bold">
            <span className="px-3 py-1.5 rounded-lg" style={{ backgroundColor: 'rgba(46,107,255,0.12)', color: '#2E6BFF' }}>7–8 demos/month</span>
            <span className="px-3 py-1.5 rounded-lg" style={{ backgroundColor: 'rgba(46,107,255,0.12)', color: '#2E6BFF' }}>30–35% conversion rate</span>
            <span className="px-3 py-1.5 rounded-lg" style={{ backgroundColor: 'rgba(46,107,255,0.12)', color: '#2E6BFF' }}>90%+ KPI attainment</span>
          </div>
        </div>
      </div>
    </section>
  )
}
