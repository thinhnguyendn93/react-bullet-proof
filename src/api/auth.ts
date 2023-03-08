import { AxiosResponse } from 'axios';
import { getRefreshToken } from 'utils/cookie';
import { axiosInstance } from './axios/axios-instance';

export const signIn = async (
  data: Auth.SignInRequest,
): Promise<AxiosResponse<Auth.AuthResponse>> =>
  axiosInstance.post<Auth.AuthResponse>('authentication/login', data);

export const refreshToken = async (): Promise<
  AxiosResponse<Auth.AuthResponse>
> =>
  axiosInstance.post<Auth.AuthResponse>('authentication/refreshToken', {
    refreshToken: getRefreshToken(),
  });
