import axios, { AxiosResponse } from 'axios';
import { getTokens, setTokens, clearTokens } from '@utils/localStorage';
import { appConfig } from '@config/config';
import { API_PATH } from '@constants/api';
import toast from 'react-hot-toast';
import { ErrorCode } from '@constants/error';

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
  res => res.data.message ? res : res.data,
  async err => {
    const original = err.config;

    const showToast =
      original?.showToastOnError === true &&
      original?.url !== API_PATH.AUTH.REFRESH  &&
      err.response?.data?.statusCode !== ErrorCode.TOKEN_EXPIRED;
    
    if (showToast) {
      const message = err.response?.data?.errorMessage || 'Something went wrong';
      console.log(err.response.data)
      toast.error(message);
    }
    
    if (err.response?.status === 401  && !original._retry) {
      if (err.response?.data?.statusCode === ErrorCode.TOKEN_EXPIRED) {
        original._retry = true;
        try {
          const tokens = getTokens();
          const { data: response } = await axios.post(`${BASE_URL}${API_PATH.AUTH.REFRESH}`, {
            refreshToken: tokens?.refreshToken
          });
          
          
          setTokens(response.data.accessToken, tokens?.refreshToken || '');
          original.headers.Authorization = `Bearer ${response.data.accessToken}`;
          return api(original);
        } catch (e) {
          clearTokens();
          window.location.href = '/login';
        }
      } else {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(err);
  }
);

export default api;