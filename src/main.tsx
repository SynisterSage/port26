import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PostHogRoot } from './PostHogRoot'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PostHogRoot>
      <App />
    </PostHogRoot>
  </StrictMode>,
)

requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    document.documentElement.dataset.appReady = "true"
  })
})
