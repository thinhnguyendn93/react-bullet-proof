import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axios/base-query';
import { accountEndPoints } from './endpoints/account';

export const appAPI = createApi({
  reducerPath: 'AppAPI',
  tagTypes: ['Account'],
  baseQuery: axiosBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    ...accountEndPoints(builder),
  }),
});

export const {
  useGetAccountsQuery,
  useCreateAccountMutation,
  useUpdateAccountMutation,
} = appAPI;
