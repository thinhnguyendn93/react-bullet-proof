import { UserRoleEnum } from 'enums/auth';
import { getAccessToken, getRefreshToken, getUserInfo } from 'utils/cookie';

export interface Authenticate {
  isAuthenticated: boolean;
  token: string;
  refreshToken: string;
  isAdmin: boolean;
  role: UserRoleEnum;
  permissions: string[];
}

const userInfo = getUserInfo();
const token = getAccessToken();

export const initialState: Authenticate = {
  isAuthenticated: Boolean(token),
  token: token,
  refreshToken: getRefreshToken(),
  isAdmin: userInfo?.isAdmin,
  role: userInfo?.role || UserRoleEnum.Staff,
  permissions: [],
};
