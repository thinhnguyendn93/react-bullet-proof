declare namespace Auth {
  import { UserRoleEnum } from 'enums/auth';

  export type SignInRequest = {
    email: string;
    password: string;
    rememberMe: boolean;
  };

  export type AuthRequest = {
    refreshToken: string;
  };

  export type AuthResponse = AuthRequest & {
    isRegisterUser?: boolean;
    token: string;
    refreshToken: string;
    userInfo: User.Entity;
    permissions: string[];
    rememberMe?: boolean;
  };

  export type RequestCallback = (token: string) => Promise<void>;

  export type Policy = {
    policyCode: string;
    parentId: string;
    enable: boolean;
    category?: string;
  };

  export type PermissionsByRole = {
    role: UserRoleEnum;
    permissions: string[];
  };

  export type PermissionDefault = {
    policies: Policy[];
    permissions: PermissionsByRole[];
  };
}
