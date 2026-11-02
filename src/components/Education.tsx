import { motion } from 'framer-motion'
import SectionHeading, { gradients } from './SectionHeading'
import {
  education,
  achievements,
  positionsOfResponsibility,
  extraCurriculars,
} from '../data/content'
import { useTheme } from '../context/ThemeContext'

export default function Education() {
  const { theme } = useTheme()

  return (
    <section id="education" className="py-6 px-6 max-w-6xl mx-auto">
      <SectionHeading subtitle="Academic background and beyond" gradient={gradients[7]}>Education & More</SectionHeading>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Education */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bento-card"
        >
          <h3 className="font-heading font-bold text-lg mb-4">Education</h3>
          <div className="space-y-4">
            {education.map((edu, i) => (
              <div
                key={i}
                className="pb-3"
                style={{
                  borderBottom: i < education.length - 1
                    ? `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`
                    : 'none',
                }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-heading font-semibold text-sm">{edu.degree}</h4>
                    <p className="text-xs mt-0.5" style={{ color: theme === 'dark' ? '#888' : '#777' }}>
                      {edu.school}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-medium text-blue">{edu.year}</span>
                    {edu.detail && (
                      <p className="text-xs mt-0.5" style={{ color: theme === 'dark' ? '#8a8a8a' : '#777' }}>
                        {edu.detail}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Achievements + POR + Extra */}
        <div className="space-y-6">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bento-card"
          >
            <h3 className="font-heading font-bold text-lg mb-3">Achievements</h3>
            <ul className="space-y-2">
              {achievements.map((a, i) => (
                <li key={i} className="text-sm flex gap-2" style={{ color: theme === 'dark' ? '#bbb' : '#555' }}>
                  <span className="text-blue mt-1 shrink-0">▸</span>
                  {a}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bento-card"
          >
            <h3 className="font-heading font-bold text-lg mb-3">Positions of Responsibility</h3>
            <ul className="space-y-2">
              {positionsOfResponsibility.map((p, i) => (
                <li key={i} className="text-sm flex gap-2" style={{ color: theme === 'dark' ? '#bbb' : '#555' }}>
                  <span className="text-coral mt-1 shrink-0">▸</span>
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bento-card"
          >
            <h3 className="font-heading font-bold text-lg mb-3">Extra-Curriculars</h3>
            <ul className="space-y-2">
              {extraCurriculars.map((e, i) => (
                <li key={i} className="text-sm flex gap-2" style={{ color: theme === 'dark' ? '#bbb' : '#555' }}>
                  <span className="text-blue mt-1 shrink-0">▸</span>
                  {e}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
