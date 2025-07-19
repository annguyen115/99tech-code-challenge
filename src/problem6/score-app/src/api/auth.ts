import api from '@api/axios';
import { API_PATH } from '@constants/api';
import { LoginResponseDto } from '@api/dtos/auth.dto';
import { AxiosResponse } from 'axios';

export const login = ({ username, password }: { username: string, password: string }): Promise<AxiosResponse<LoginResponseDto>> => {
  return api.post<LoginResponseDto>(API_PATH.AUTH.LOGIN, { username, password });
};

export const logout = (): Promise<void> => {
  return api.post(API_PATH.AUTH.LOGOUT);
};