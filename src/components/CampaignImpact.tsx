import { motion } from 'framer-motion'
import SectionHeading, { gradients } from './SectionHeading'
import { campaignImpact } from '../data/content'
import { useTheme } from '../context/ThemeContext'
import { useInView } from '../hooks/useInView'

export default function CampaignImpact() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <section id="campaign-impact" className="py-6 px-6 max-w-6xl mx-auto">
      <SectionHeading subtitle="Measurable results from campaign optimization" gradient={gradients[2]}>
        Campaign Impact
      </SectionHeading>

      <p
        className="text-sm mb-8 max-w-lg"
        style={{ color: isDark ? '#777' : '#888' }}
      >
        Key performance improvements from my campaign work at Convertcart.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {campaignImpact.map((item, i) => (
          <CampaignCard key={item.label} item={item} index={i} isDark={isDark} />
        ))}
      </div>
    </section>
  )
}

function CampaignCard({ item, index, isDark }: { item: typeof campaignImpact[0]; index: number; isDark: boolean }) {
  const { ref } = useInView(0.3)

  // Parse numeric values for visual comparison
  const beforeNum = parseFloat(item.before.replace('%', '').replace('/month', ''))
  const afterNum = parseFloat(item.after.replace('%', '').replace('/month', ''))
  const maxVal = Math.max(beforeNum, afterNum)

  return (
    <motion.div
      ref={ref}
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="bento-card p-6 relative overflow-hidden"
    >
      {/* Uplift badge - top right */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.15 + 0.4, duration: 0.4, type: 'spring', stiffness: 200 }}
        className="absolute top-4 right-4 px-3 py-1.5 rounded-lg font-heading font-bold text-lg"
        style={{
          background: 'linear-gradient(135deg, #00C853, #00BFA5)',
          color: '#ffffff',
          boxShadow: '0 4px 12px rgba(0,200,83,0.3)',
        }}
      >
        {item.uplift}
      </motion.div>

      {/* Title */}
      <h3 className="font-heading font-bold text-lg mb-1 pr-16" style={{ color: isDark ? '#e5e5e5' : '#1a1a1a' }}>
        {item.label}
      </h3>
      <p
        className="text-xs mb-6"
        style={{ color: isDark ? '#666' : '#999' }}
      >
        {item.description}
      </p>

      {/* Before → After Comparison */}
      <div className="flex items-center gap-4">
        {/* Before */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium uppercase tracking-wider" style={{ color: isDark ? '#666' : '#999' }}>
              Before
            </span>
            <span className="text-sm font-heading font-semibold" style={{ color: isDark ? '#888' : '#666' }}>
              {item.before}
            </span>
          </div>
          {/* Progress bar */}
          <div className="h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${(beforeNum / maxVal) * 100}%` }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 + 0.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="h-full rounded-full"
              style={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
              }}
            />
          </div>
        </div>

        {/* Arrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.3, duration: 0.3, type: 'spring' }}
          className="flex flex-col items-center shrink-0"
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #00C853, #00BFA5)',
              boxShadow: '0 4px 12px rgba(0,200,83,0.25)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </motion.div>

        {/* After */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium uppercase tracking-wider" style={{ color: '#00C853' }}>
              After
            </span>
            <span className="text-sm font-heading font-semibold" style={{ color: '#00C853' }}>
              {item.after}
            </span>
          </div>
          {/* Progress bar */}
          <div className="h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: isDark ? 'rgba(0,200,83,0.08)' : 'rgba(0,200,83,0.06)' }}>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${(afterNum / maxVal) * 100}%` }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 + 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #00C853, #00BFA5)',
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
