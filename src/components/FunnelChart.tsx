import { motion } from 'framer-motion'
import SectionHeading, { gradients } from './SectionHeading'
import { funnelData } from '../data/content'
import { useTheme } from '../context/ThemeContext'
import { useInView } from '../hooks/useInView'
import { useState } from 'react'

export default function FunnelChart() {
  const { ref } = useInView(0.3)
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  const maxValue = funnelData[0].value

  return (
    <section id="funnel" ref={ref} className="py-6 px-6 max-w-6xl mx-auto">
      <SectionHeading subtitle="From research to conversion — my Convertcart workflow" gradient={gradients[3]}>
        Demand Generation Funnel
      </SectionHeading>

      <p
        className="text-sm mb-8 max-w-lg"
        style={{ color: isDark ? '#777' : '#888' }}
      >
        Illustrative funnel from my Convertcart role — 300+ brands researched monthly flowing through to qualified conversions.
      </p>

      {/* Funnel visualization */}
      <div className="bento-card p-6 md:p-8 overflow-hidden">
        {/* Desktop: Horizontal funnel */}
        <div className="hidden md:block">
          <div className="relative flex items-center justify-between gap-0">
            {funnelData.map((item, i) => {
              const widthPercent = (item.value / maxValue) * 100
              const isHovered = hoveredStep === i
              const conversionRate = i > 0
                ? ((item.value / funnelData[i - 1].value) * 100).toFixed(0)
                : null

              return (
                <div key={item.stage} className="flex items-center flex-1 last:flex-none">
                  {/* Stage card */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="relative flex-1"
                    onMouseEnter={() => setHoveredStep(i)}
                    onMouseLeave={() => setHoveredStep(null)}
                  >
                    <div
                      className="relative rounded-xl p-4 border transition-all duration-300 cursor-default"
                      style={{
                        backgroundColor: isHovered
                          ? `${item.color}15`
                          : isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.7)',
                        borderColor: isHovered ? `${item.color}40` : isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                        boxShadow: isHovered ? `0 8px 24px ${item.color}20` : 'none',
                      }}
                    >
                      {/* Number badge */}
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white mb-3"
                        style={{ backgroundColor: item.color }}
                      >
                        {i + 1}
                      </div>

                      {/* Stage label */}
                      <div className="text-sm font-semibold mb-1" style={{ color: isDark ? '#e5e5e5' : '#1a1a1a' }}>
                        {item.stage}
                      </div>

                      {/* Value */}
                      <div className="text-2xl font-heading font-bold" style={{ color: item.color }}>
                        {item.value}+
                      </div>

                      {/* Progress bar */}
                      <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${widthPercent}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.12 + 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Connector arrow */}
                  {i < funnelData.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12 + 0.2, duration: 0.3 }}
                      className="flex flex-col items-center px-2 shrink-0"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M5 12H19M19 12L14 7M19 12L14 17"
                          stroke={isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {conversionRate && (
                        <span className="text-[10px] font-medium mt-0.5" style={{ color: isDark ? '#666' : '#999' }}>
                          {conversionRate}%
                        </span>
                      )}
                    </motion.div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Flow visualization line */}
          <div className="mt-6 relative">
            <div className="h-1 rounded-full" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${funnelData.map(d => d.color).join(', ')})`,
                }}
              />
            </div>
            {/* Stage markers */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between">
              {funnelData.map((item, i) => (
                <motion.div
                  key={item.stage}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.15, duration: 0.3, type: 'spring' }}
                  className="w-3 h-3 rounded-full border-2"
                  style={{
                    backgroundColor: item.color,
                    borderColor: isDark ? 'var(--color-card-dark)' : '#ffffff',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Vertical funnel */}
        <div className="md:hidden">
          <div className="relative flex flex-col items-center gap-0">
            {funnelData.map((item, i) => {
              const widthPercent = Math.max((item.value / maxValue) * 100, 40)
              const isHovered = hoveredStep === i
              const conversionRate = i > 0
                ? ((item.value / funnelData[i - 1].value) * 100).toFixed(0)
                : null

              return (
                <div key={item.stage} className="w-full relative">
                  {/* Stage card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="relative mx-auto"
                    style={{ width: `${widthPercent}%`, minWidth: '180px' }}
                    onMouseEnter={() => setHoveredStep(i)}
                    onMouseLeave={() => setHoveredStep(null)}
                  >
                    <div
                      className="relative rounded-xl px-4 py-3 border transition-all duration-300 cursor-default"
                      style={{
                        backgroundColor: isHovered
                          ? `${item.color}15`
                          : isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.7)',
                        borderColor: isHovered ? `${item.color}40` : isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                        boxShadow: isHovered ? `0 8px 24px ${item.color}20` : 'none',
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                            style={{ backgroundColor: item.color }}
                          >
                            {i + 1}
                          </div>
                          <div>
                            <div className="text-sm font-semibold" style={{ color: isDark ? '#e5e5e5' : '#1a1a1a' }}>
                              {item.stage}
                            </div>
                            {conversionRate && (
                              <div className="text-[10px]" style={{ color: isDark ? '#666' : '#999' }}>
                                {conversionRate}% from previous
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-lg font-heading font-bold" style={{ color: item.color }}>
                          {item.value}+
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Connector */}
                  {i < funnelData.length - 1 && (
                    <div className="flex justify-center py-1">
                      <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + 0.1, duration: 0.2 }}
                        className="flex flex-col items-center"
                      >
                        <div className="w-px h-3" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                          <path
                            d="M1 1L5 5L9 1"
                            stroke={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </motion.div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Summary stats */}
        <div
          className="mt-8 pt-5 border-t flex flex-wrap gap-4 justify-center"
          style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}
        >
          {[
            { label: '7-8 demos/month', icon: '📊', color: '#00C853' },
            { label: '30-35% conversion', icon: '🎯', color: '#65A30D' },
            { label: '90%+ KPI attainment', icon: '✅', color: '#00BFA5' },
          ].map((badge) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold"
              style={{
                backgroundColor: isDark ? `${badge.color}10` : `${badge.color}08`,
                color: isDark ? `${badge.color}` : badge.color,
                border: `1px solid ${isDark ? `${badge.color}20` : `${badge.color}15`}`,
              }}
            >
              <span>{badge.icon}</span>
              {badge.label}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
