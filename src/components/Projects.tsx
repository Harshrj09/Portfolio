import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, FileText, AlertCircle, ArrowRight } from 'lucide-react'
import SectionHeading, { gradients } from './SectionHeading'
import { projects } from '../data/content'
import { useTheme } from '../context/ThemeContext'

export default function Projects() {
  const [modal, setModal] = useState<number | null>(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <section id="projects" className="py-6 px-6 max-w-6xl mx-auto">
      <SectionHeading subtitle="Case studies and research work" gradient={gradients[4]}>
        Projects
      </SectionHeading>

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <ProjectCard
            key={i}
            project={project}
            index={i}
            isDark={isDark}
            onClick={() => setModal(i)}
          />
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal !== null && (
          <ProjectModal
            project={projects[modal]}
            isDark={isDark}
            onClose={() => setModal(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

function ProjectCard({
  project,
  index,
  isDark,
  onClick,
}: {
  project: typeof projects[0]
  index: number
  isDark: boolean
  onClick: () => void
}) {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="bento-card p-0 overflow-hidden h-full flex flex-col">
        {/* Image container */}
        <div
          className="relative h-44 overflow-hidden"
          style={{
            background: project.image
              ? 'transparent'
              : isDark
                ? 'linear-gradient(135deg, rgba(0,200,83,0.15), rgba(0,191,165,0.1))'
                : 'linear-gradient(135deg, rgba(0,200,83,0.08), rgba(0,191,165,0.05))',
          }}
        >
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #00C853, #00BFA5)',
                  boxShadow: '0 8px 24px rgba(0,200,83,0.25)',
                }}
              >
                {project.status === 'in-progress' ? (
                  <AlertCircle size={28} color="#ffffff" />
                ) : (
                  <FileText size={28} color="#ffffff" />
                )}
              </div>
            </div>
          )}

          {/* Overlay gradient */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.6) 100%)',
            }}
          />

          {/* Status badge */}
          {project.status === 'in-progress' && (
            <div className="absolute top-3 left-3">
              <span
                className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: 'rgba(101,163,13,0.9)',
                  color: '#ffffff',
                }}
              >
                <AlertCircle size={11} />
                In Progress
              </span>
            </div>
          )}

          {/* View button on hover */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: 'rgba(255,255,255,0.95)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
            >
              <ExternalLink size={14} color="#1a1a1a" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <h3
            className="font-heading font-bold text-base mb-1 group-hover:text-blue transition-colors"
            style={{ color: isDark ? '#e5e5e5' : '#1a1a1a' }}
          >
            {project.title}
          </h3>
          <p
            className="text-xs mb-3"
            style={{ color: isDark ? '#666' : '#999' }}
          >
            {project.subtitle}
          </p>
          <p
            className="text-sm line-clamp-2 flex-1"
            style={{ color: isDark ? '#aaa' : '#666' }}
          >
            {project.description}
          </p>

          {/* Action */}
          <div className="mt-4 pt-3 border-t flex items-center justify-between" style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}>
            <span className="text-xs font-medium" style={{ color: isDark ? '#666' : '#999' }}>
              {project.status === 'completed' ? 'View details' : 'Ongoing'}
            </span>
            <ArrowRight
              size={14}
              className="text-blue transition-transform duration-300 group-hover:translate-x-1"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ProjectModal({
  project,
  isDark,
  onClose,
}: {
  project: typeof projects[0]
  isDark: boolean
  onClose: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="w-full max-w-2xl bento-card p-0 overflow-hidden relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal image */}
        {project.image && (
          <div className="relative h-52 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.7) 100%)',
              }}
            />
            <div className="absolute bottom-4 left-6 right-16">
              <h3 className="font-heading font-bold text-2xl text-white">
                {project.title}
              </h3>
              <p className="text-sm text-white/70 mt-1">{project.subtitle}</p>
            </div>
          </div>
        )}

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center z-10"
          style={{
            backgroundColor: project.image ? 'rgba(255,255,255,0.2)' : isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
            backdropFilter: project.image ? 'blur(8px)' : 'none',
          }}
        >
          <X size={16} color={project.image ? '#ffffff' : undefined} />
        </button>

        <div className="p-6">
          {/* Title for non-image modals */}
          {!project.image && (
            <>
              {project.status === 'in-progress' && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-coral mb-3 px-2 py-1 rounded-full bg-coral/10">
                  <AlertCircle size={12} />
                  In Progress
                </span>
              )}
              <h3 className="font-heading font-bold text-2xl mb-1 pr-8">
                {project.title}
              </h3>
              <p className="text-xs mb-4" style={{ color: isDark ? '#666' : '#999' }}>
                {project.subtitle}
              </p>
            </>
          )}

          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider mb-2 text-blue">Problem</h4>
              <p className="text-sm" style={{ color: isDark ? '#bbb' : '#555' }}>
                {project.description}
              </p>
            </div>

            {project.result && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider mb-2 text-blue">Result</h4>
                <p className="text-sm" style={{ color: isDark ? '#bbb' : '#555' }}>
                  {project.result}
                </p>
              </div>
            )}

            {project.file && project.status === 'completed' && (
              <a
                href={project.file}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #00C853, #00BFA5)',
                  boxShadow: '0 4px 12px rgba(0,200,83,0.3)',
                }}
              >
                <FileText size={16} />
                View File
              </a>
            )}

            {project.status === 'in-progress' && (
              <div
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: isDark ? 'rgba(101,163,13,0.1)' : 'rgba(101,163,13,0.08)',
                  color: '#65A30D',
                }}
              >
                <AlertCircle size={16} />
                Research in progress
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
