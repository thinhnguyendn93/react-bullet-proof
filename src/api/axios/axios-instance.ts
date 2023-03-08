import { forEach, get } from 'lodash';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { refreshToken } from 'api/auth';
import { DEFAULT_LANGUAGE } from 'config/constant';
import { GuestRouterPath } from 'routers/router-path';
import {
  getAccessToken,
  getLanguage,
  setAccessToken,
  setRefreshToken,
} from 'utils/cookie';
import { windowRedirect } from 'utils/helper';
import store from 'store/store';
import { authenticate, signOut } from 'store/auth';
import { notifyError } from 'utils/toast';
import i18n from 'config/i18n';
import { ApiStatus } from 'enums/app';

export const axiosInstance = axios.create();

let refreshSubscribers: Auth.RequestCallback[] = [];
let isRefreshing = false;

function handleRefreshToken(callback?: App.Callback): void {
  isRefreshing = true;
  refreshToken()
    .then((response) => {
      const { token, refreshToken } = response.data;
      const onSuccess = get(callback, 'onSuccess');
      if (onSuccess) {
        onSuccess(token);
      }
      setAccessToken(token);
      setRefreshToken(refreshToken);
      store.dispatch(authenticate(response.data));
    })
    .catch(() => {
      store.dispatch(signOut());
      windowRedirect(GuestRouterPath.signIn);
    })
    .finally(() => {
      isRefreshing = false;
    });
}

function handleAccessTokenError(
  originalRequest: AxiosRequestConfig,
): Promise<AxiosInstance> {
  if (!isRefreshing) {
    handleRefreshToken({
      onSuccess: (newToken) => {
        onRefreshed(newToken);
        refreshSubscribers = [];
      },
    });
  }
  return new Promise((resolve, reject) => {
    subscribeTokenRefresh((token: string) => {
      originalRequest.headers.Authorization = `Bearer ${token}`;
      return axios(originalRequest)
        .then((response) => resolve(response.data))
        .catch((error) => {
          const errorData = get(error, 'response.data');
          reject(errorData);
        });
    });
  });
}

function subscribeTokenRefresh(cb: Auth.RequestCallback): void {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string): void {
  forEach(refreshSubscribers, (cb) => {
    cb(token);
  });
}

axiosInstance.interceptors.request.use((config) => {
  try {
    const token = getAccessToken();
    if (token != null) {
      config.headers.authorization = `Bearer ${token}`;
    }

    const language = getLanguage() || DEFAULT_LANGUAGE;
    config.headers.language = language;

    return config;
  } catch (error) {
    throw new Error(error as string);
  }
});

axiosInstance.interceptors.response.use(
  (value: App.Data) => {
    return value;
  },
  (error: App.Data) => {
    const status = get(error, 'response.status');
    const errorData = get(error, 'response.data');
    const { message, metadata } = errorData;
    const errorMessage = i18n.t(message, {
      data: metadata?.map((x: string) => i18n.t(x)).join(', '),
    });
    switch (status) {
      case ApiStatus.Unauthorized:
      case ApiStatus.TokenExpired:
        return handleAccessTokenError(error.config);
      case ApiStatus.BadRequest: {
        notifyError(errorMessage);
        return Promise.reject({ ...errorData, status });
      }
      case ApiStatus.InternalServerError: {
        notifyError(errorMessage);
        break;
      }
    }
    return Promise.reject(error);
  },
);
