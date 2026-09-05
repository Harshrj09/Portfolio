import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import emailjs from '@emailjs/browser'
import { ThemeProvider } from './context/ThemeContext'
import './index.css'
import App from './App'

emailjs.init('EnJDzmBEpTr9DJ2AS')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
