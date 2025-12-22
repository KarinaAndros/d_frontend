import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Перехватчик для CSRF токена
api.interceptors.request.use(
  (config) => {
    // Получаем CSRF токен из cookies
    const token = getCookie('XSRF-TOKEN');
    if (token) {
      config.headers['X-XSRF-TOKEN'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// get Cookie
function getCookie(name: string) {
  const parts = ref<string[]>([])
  const value = `; ${document.cookie}`;
  parts.value  = value.split(`; ${name}=`);
  if (parts.value && parts.value.length === 2) 
    return parts.value.pop().split(';').shift();
}
export default api;
