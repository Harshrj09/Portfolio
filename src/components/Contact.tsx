import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, Mail, MapPin, ExternalLink, AlertCircle, Loader2 } from 'lucide-react'
import emailjs from '@emailjs/browser'
import SectionHeading, { gradients } from './SectionHeading'
import { personal } from '../data/content'
import { useTheme } from '../context/ThemeContext'

const EMAILJS_CONFIG = {
  serviceId: 'service_z7mreyr',
  templateId: 'template_ehs7ecv',
  publicKey: 'EnJDzmBEpTr9DJ2AS',
}

export default function Contact() {
  const { theme } = useTheme()
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          from_name: formState.name,
          from_email: formState.email,
          message: formState.message,
          to_email: personal.email,
        },
        EMAILJS_CONFIG.publicKey
      )
      setStatus('success')
      setFormState({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const contactLinks = [
    { icon: Mail, label: personal.email, href: `mailto:${personal.email}` },
    { icon: ExternalLink, label: 'LinkedIn', href: personal.linkedin },
    { icon: MapPin, label: personal.city, href: '#' },
  ]

  return (
    <section id="contact" className="py-6 px-6 max-w-6xl mx-auto">
      <SectionHeading subtitle="Drop me a message anytime" gradient={gradients[6]}>Let's connect.</SectionHeading>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact info */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="space-y-6"
        >
          {contactLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex items-center gap-4 group"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{
                  backgroundColor: theme === 'dark' ? 'rgba(0,200,83,0.1)' : 'rgba(0,200,83,0.08)',
                }}
              >
                <link.icon size={18} className="text-blue" />
              </div>
              <span
                className="text-sm font-medium group-hover:text-blue transition-colors"
                style={{ color: theme === 'dark' ? '#bbb' : '#555' }}
              >
                {link.label}
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* Contact form */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {status === 'success' ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bento-card h-full flex flex-col items-center justify-center text-center"
            >
              <CheckCircle size={48} className="text-blue mb-4" />
              <h3 className="font-heading font-bold text-xl mb-2">Message sent!</h3>
              <p className="text-sm" style={{ color: theme === 'dark' ? '#888' : '#777' }}>
                Thanks for reaching out. I'll get back to you soon.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider mb-1 block" style={{ color: theme === 'dark' ? '#666' : '#999' }}>
                  Name
                </label>
                <input
                  type="text"
                  required
                  disabled={status === 'sending'}
                  value={formState.name}
                  onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors focus:ring-2 focus:ring-blue disabled:opacity-50"
                  style={{
                    backgroundColor: theme === 'dark' ? '#1A1A22' : '#fff',
                    border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'}`,
                    color: theme === 'dark' ? '#e5e5e5' : '#1a1a1a',
                  }}
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider mb-1 block" style={{ color: theme === 'dark' ? '#666' : '#999' }}>
                  Email
                </label>
                <input
                  type="email"
                  required
                  disabled={status === 'sending'}
                  value={formState.email}
                  onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors focus:ring-2 focus:ring-blue disabled:opacity-50"
                  style={{
                    backgroundColor: theme === 'dark' ? '#1A1A22' : '#fff',
                    border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'}`,
                    color: theme === 'dark' ? '#e5e5e5' : '#1a1a1a',
                  }}
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider mb-1 block" style={{ color: theme === 'dark' ? '#666' : '#999' }}>
                  Message
                </label>
                <textarea
                  required
                  disabled={status === 'sending'}
                  rows={4}
                  value={formState.message}
                  onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-colors focus:ring-2 focus:ring-blue disabled:opacity-50"
                  style={{
                    backgroundColor: theme === 'dark' ? '#1A1A22' : '#fff',
                    border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'}`,
                    color: theme === 'dark' ? '#e5e5e5' : '#1a1a1a',
                  }}
                />
              </div>
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
                  style={{ backgroundColor: 'rgba(255,92,92,0.1)', color: '#FF5C5C' }}
                >
                  <AlertCircle size={16} />
                  Failed to send. Please try again or email directly.
                </motion.div>
              )}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white transition-all hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg, #00A844, #00C853)' }}
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
