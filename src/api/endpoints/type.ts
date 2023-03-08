import { BaseQueryFn, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { AxiosRequestConfig } from 'axios';

export type AppEndpointBuilder = EndpointBuilder<
  BaseQueryFn<AxiosRequestConfig, unknown, FetchBaseQueryError, {}, {}>,
  'Account',
  'AppAPI'
>;
