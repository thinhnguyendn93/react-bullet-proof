declare namespace Accounts {
  export type Entity = {
    id?: string;
    email?: string;
    number?: string;
    username?: string;
    password?: string;
    recoveryEmail?: string;
    cookie?: string;
  };
}
