import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

declare global {
  interface Window {
    Pusher: any
    Echo: any
  }
}

window.Pusher = Pusher

const echo = new Echo({
  broadcaster: 'reverb',
  key: import.meta.env.VITE_REVERB_APP_KEY,
  wsHost: import.meta.env.VITE_REVERB_HOST,

  // ИСПРАВЛЕНИЕ 1: Преобразуем строку в число через parseInt
  wsPort: import.meta.env.VITE_REVERB_PORT ? Number.parseInt(import.meta.env.VITE_REVERB_PORT) : 80,
  wssPort: import.meta.env.VITE_REVERB_PORT ? Number.parseInt(import.meta.env.VITE_REVERB_PORT) : 443,

  // ИСПРАВЛЕНИЕ 2: Проверяем схему. Если 'https', то true. Иначе (http) false.
  forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'http') === 'https',

  // ИСПРАВЛЕНИЕ 3: Отключаем отправку статистики на сервера Pusher
  disableStats: true,

  // Разрешенные транспорты
  enabledTransports: ['ws', 'wss'],
})

export default echo
