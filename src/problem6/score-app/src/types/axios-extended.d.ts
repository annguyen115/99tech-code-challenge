// types/axios-extended.d.ts
import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    showToastOnError?: boolean;
  }
}