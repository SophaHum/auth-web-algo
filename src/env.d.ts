/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_AUTH_ENABLED: string
  readonly VITE_MOCK_API: string
  readonly VITE_API_TIMEOUT: string
  readonly VITE_HASH_WORKER_URL: string
  readonly VITE_MAX_PASSWORD_LENGTH: string
  readonly VITE_DEFAULT_ALGORITHM: string
  readonly VITE_ENABLE_ANALYTICS: string
  readonly VITE_SENTRY_DSN: string
  // Auth-specific environment variables
  readonly VITE_AUTH_STORAGE_KEY: string
  readonly VITE_SESSION_TIMEOUT: string
  // API endpoints
  readonly VITE_AUTH_ENDPOINT: string
  readonly VITE_HASH_ENDPOINT: string
  // Feature flags
  readonly VITE_ENABLE_REGISTRATION: string
  readonly VITE_ENABLE_PASSWORD_STRENGTH: string
  readonly VITE_ENABLE_DARK_MODE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}