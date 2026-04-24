import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { LoanProvider } from './context/LoanContext'
import { UIProvider } from './context/UIContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LoanProvider>
        <UIProvider>
          <App />
        </UIProvider>
      </LoanProvider>
    </BrowserRouter>
  </StrictMode>,
)