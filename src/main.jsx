import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Track PWA install events
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault()
  window.deferredPrompt = e

  if (typeof gtag !== 'undefined') {
    gtag('event', 'pwa_install_prompt_shown', {
      event_category: 'PWA',
      event_label: 'Install Prompt Shown'
    })
  }
})

window.addEventListener('appinstalled', () => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'pwa_installed', {
      event_category: 'PWA',
      event_label: 'App Installed'
    })
  }
  window.deferredPrompt = null
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)