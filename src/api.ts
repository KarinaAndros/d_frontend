import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // Ваш адрес
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Важно: Отключаем куки, чтобы не было конфликтов
api.defaults.withCredentials = false;
api.defaults.withXSRFToken = false;

// Автоматическая подстановка токена
api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
