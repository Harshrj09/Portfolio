import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, FileText, AlertCircle } from 'lucide-react'
import SectionHeading, { gradients } from './SectionHeading'
import { projects } from '../data/content'
import { useTheme } from '../context/ThemeContext'

export default function Projects() {
  const [modal, setModal] = useState<number | null>(null)
  const { theme } = useTheme()

  return (
    <section id="projects" className="py-10 px-6 max-w-6xl mx-auto">
      <SectionHeading subtitle="Case studies and research work" gradient={gradients[4]}>Projects</SectionHeading>

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bento-card cursor-pointer group"
            onClick={() => setModal(i)}
          >
            {project.status === 'in-progress' && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-coral mb-3 px-2 py-1 rounded-full bg-coral/10">
                <AlertCircle size={12} />
                In Progress
              </span>
            )}



            <h3 className="font-heading font-bold text-lg group-hover:text-blue transition-colors">
              {project.title}
            </h3>
            <p
              className="text-xs mt-1 mb-3"
              style={{ color: theme === 'dark' ? '#666' : '#999' }}
            >
              {project.subtitle}
            </p>
            <p
              className="text-sm line-clamp-3"
              style={{ color: theme === 'dark' ? '#aaa' : '#666' }}
            >
              {project.description}
            </p>

            <div className="mt-4 text-xs font-medium text-blue flex items-center gap-1 group-hover:gap-2 transition-all">
              View details <ExternalLink size={12} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
            onClick={() => setModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="w-full max-w-lg bento-card relative"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setModal(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
              >
                <X size={16} />
              </button>

              {projects[modal].status === 'in-progress' && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-coral mb-3 px-2 py-1 rounded-full bg-coral/10">
                  <AlertCircle size={12} />
                  In Progress
                </span>
              )}

              <h3 className="font-heading font-bold text-2xl mb-1 pr-8">
                {projects[modal].title}
              </h3>
              <p className="text-xs mb-4" style={{ color: theme === 'dark' ? '#666' : '#999' }}>
                {projects[modal].subtitle}
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider mb-2 text-blue">Problem</h4>
                  <p className="text-sm" style={{ color: theme === 'dark' ? '#bbb' : '#555' }}>
                    {projects[modal].description}
                  </p>
                </div>

                {projects[modal].result && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider mb-2 text-blue">Result</h4>
                    <p className="text-sm" style={{ color: theme === 'dark' ? '#bbb' : '#555' }}>
                      {projects[modal].result}
                    </p>
                  </div>
                )}

                {projects[modal].file && projects[modal].status === 'completed' && (
                  <a
                    href={projects[modal].file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white transition-all hover:scale-105"
                    style={{ backgroundColor: '#2E6BFF' }}
                  >
                    <FileText size={16} />
                    View File
                  </a>
                )}

                {projects[modal].status === 'in-progress' && (
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: theme === 'dark' ? 'rgba(255,107,74,0.1)' : 'rgba(255,107,74,0.08)',
                      color: '#FF6B4A',
                    }}
                  >
                    <AlertCircle size={16} />
                    Research in progress
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
