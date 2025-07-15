import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// base styles from the original mockup
import './mockup.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
