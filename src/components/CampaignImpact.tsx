import { motion } from 'framer-motion'
import SectionHeading, { gradients } from './SectionHeading'
import { campaignImpact } from '../data/content'
import { useTheme } from '../context/ThemeContext'

export default function CampaignImpact() {
  const { theme } = useTheme()

  return (
    <section id="campaign-impact" className="py-10 px-6 max-w-6xl mx-auto">
      <SectionHeading subtitle="Measurable results from campaign optimization" gradient={gradients[2]}>Campaign Impact</SectionHeading>

      <p
        className="text-sm mb-8 max-w-lg"
        style={{ color: theme === 'dark' ? '#777' : '#888' }}
      >
        Key performance improvements from my campaign work at Convertcart.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {campaignImpact.map((item) => (
          <motion.div
            key={item.label}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bento-card"
          >
            <h3 className="font-heading font-bold text-lg mb-1">{item.label}</h3>
            <p
              className="text-xs mb-6"
              style={{ color: theme === 'dark' ? '#666' : '#999' }}
            >
              {item.description}
            </p>

            {/* Before → After comparison */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium" style={{ color: theme === 'dark' ? '#888' : '#777' }}>Before</span>
                <span className="text-sm font-heading font-bold" style={{ color: theme === 'dark' ? '#aaa' : '#555' }}>
                  {item.before}
                </span>
              </div>
              <div className="flex items-center gap-2 text-blue font-heading font-bold text-lg">
                <span>→</span>
                <span>{item.after}</span>
              </div>
              <div
                className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-heading font-bold"
                style={{ backgroundColor: 'rgba(46,107,255,0.12)', color: '#2E6BFF' }}
              >
                {item.uplift}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
