import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// Apply saved theme before paint
const saved = localStorage.getItem('theme') || 'system'
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
const isDark = saved === 'dark' || (saved === 'system' && prefersDark)
document.documentElement.classList.toggle('dark', isDark)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>
)
