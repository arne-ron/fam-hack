import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import SelectEventPreferences from './select-event-preferences.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SelectEventPreferences />
    {/*<App />*/}
  </StrictMode>,
)
