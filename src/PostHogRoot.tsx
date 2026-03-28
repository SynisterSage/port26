import type { ReactNode } from 'react'
import { PostHogProvider } from '@posthog/react'

const POSTHOG_KEY = import.meta.env.VITE_PUBLIC_POSTHOG_KEY
const POSTHOG_HOST = import.meta.env.VITE_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com'

const options = {
  api_host: POSTHOG_HOST,
  defaults: '2026-01-30',
} as const

export const PostHogRoot = ({ children }: { children: ReactNode }) => {
  if (!POSTHOG_KEY) return <>{children}</>

  return (
    <PostHogProvider apiKey={POSTHOG_KEY} options={options}>
      {children}
    </PostHogProvider>
  )
}
