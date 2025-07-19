import axios, { AxiosResponse } from 'axios';
import { getTokens, setTokens, clearTokens } from '@utils/localStorage';
import { appConfig } from '@config/config';
import { API_PATH } from '@constants/api';
import toast from 'react-hot-toast';
import { ErrorCode } from '@constants/error';
import { ROUTE } from '@constants/route';

const BASE_URL = appConfig.REACT_APP_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

const isLoginPage = () => window.location.pathname === ROUTE.LOGIN;

const redirectToLogin = () => {
  if (!isLoginPage()) {
    window.location.href = API_PATH.AUTH.LOGIN;
  }
  
};

const handleTokenRefresh = async (originalConfig: any) => {
  try {
    const tokens = getTokens();
    const { data: response } = await axios.post(`${BASE_URL}${API_PATH.AUTH.REFRESH}`, {
      refreshToken: tokens?.refreshToken,
    });
    
    setTokens(response.data.accessToken, tokens?.refreshToken ?? '');
    originalConfig.headers.Authorization = `Bearer ${response.data.accessToken}`;
    return api(originalConfig);
  } catch (error) {
    clearTokens();
    redirectToLogin();
    return Promise.reject(error);
  }
};

api.interceptors.request.use((config) => {
  const tokens = getTokens();
  if (tokens?.accessToken) {
    config.headers.Authorization = `Bearer ${tokens.accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (res: AxiosResponse) => (res.data?.message ? res : res.data),
  async (err) => {
    const originalConfig = err.config;
    const statusCode = err.response?.data?.statusCode;
    const shouldShowToast =
      originalConfig?.showToastOnError === true &&
      originalConfig?.url !== API_PATH.AUTH.REFRESH &&
      statusCode !== ErrorCode.TOKEN_EXPIRED;
    
    if (shouldShowToast) {
      const message = err.response?.data?.errorMessage ?? 'Something went wrong';
      toast.error(message);
    }
    
    const isUnauthorized = err.response?.status === 401;
    const isTokenExpired = statusCode === ErrorCode.TOKEN_EXPIRED;
    
    if (isUnauthorized && !originalConfig._retry) {
      originalConfig._retry = true;
      
      if (isTokenExpired) {
        return handleTokenRefresh(originalConfig);
      }
      
      redirectToLogin();
    }
    
    return Promise.reject(err);
  }
);

export default api;