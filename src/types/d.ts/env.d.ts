/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Стандартные переменные Laravel + Vite
  readonly VITE_APP_NAME: string
  readonly VITE_APP_URL: string

  // Настройки Broadcasting (общие)
  readonly VITE_BROADCAST_CONNECTION: 'reverb' | 'pusher' | 'redis' | 'log' | 'null'

  // Если вы используете Reverb (Laravel 11+)
  readonly VITE_REVERB_APP_KEY: string
  readonly VITE_REVERB_HOST: string
  readonly VITE_REVERB_PORT: string
  readonly VITE_REVERB_SCHEME: 'http' | 'https'

  // Если вы используете Socket.io (Laravel Echo Server)
  readonly VITE_ECHO_HOST?: string
  readonly VITE_ECHO_PORT?: string

  // Любые другие ваши переменные
  readonly VITE_API_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
