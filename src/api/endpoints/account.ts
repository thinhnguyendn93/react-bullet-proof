import { AppEndpointBuilder } from './type';

export function accountEndPoints(builder: AppEndpointBuilder) {
  return {
    getAccounts: builder.query<App.ListResponse<Accounts.Entity>, string>({
      query: () => ({
        url: `path_to_api`,
        method: 'get',
      }),
      providesTags: ['Account'],
    }),
    createAccount: builder.mutation<Accounts.Entity, Accounts.Entity>({
      query: (account: Accounts.Entity) => ({
        url: 'path_to_api',
        method: 'post',
        data: account,
      }),
      invalidatesTags: ['Account'],
    }),
    updateAccount: builder.mutation<Accounts.Entity, Accounts.Entity>({
      query: (account: Accounts.Entity) => ({
        url: `path_to_api/${account.id}`,
        method: 'put',
        data: account,
      }),
      invalidatesTags: ['Account'],
    }),
  };
}
