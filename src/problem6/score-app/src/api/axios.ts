import axios from 'axios';
import { getTokens, setTokens, clearTokens } from '@utils/localStorage';
import { appConfig } from '@config/config';

const BASE_URL = appConfig.REACT_APP_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const tokens = getTokens();
  if (tokens?.accessToken) config.headers.Authorization = `Bearer ${tokens.accessToken}`;
  return config;
});

api.interceptors.response.use(
  res => res.data,
  async err => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const tokens = getTokens();
        const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
          refreshToken: tokens?.refreshToken
        });
        setTokens(data.accessToken, tokens?.refreshToken || '');
        original.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(original);
      } catch (e) {
        clearTokens();
        window.location.href = '/login';
      }
    }
    return Promise.reject(err);
  }
);

export default api;