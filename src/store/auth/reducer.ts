import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserRoleEnum } from 'enums/auth';
import {
  revokeUser,
  setAccessToken,
  setRefreshToken,
  setUserInfo,
} from 'utils/cookie';
import { setPermissions } from 'utils/store';
import { Authenticate, initialState } from './type';

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate: (
      state: Authenticate,
      action: PayloadAction<Auth.AuthResponse>,
    ) => {
      const { token, refreshToken, userInfo, permissions } = action.payload;
      if (token) {
        const { role } = userInfo;
        const isAdmin = role == UserRoleEnum.Administrator;
        state.isAuthenticated = true;
        state.token = token;
        state.isAdmin = isAdmin;
        state.role = role;
        state.permissions = permissions;
        setPermissions(permissions);
        setAccessToken(token);
        setRefreshToken(refreshToken);
        setUserInfo(userInfo, null);
      }
    },
    signIn: (state: Authenticate) => {
      state.isAuthenticated = true;
    },
    signOut: (state: Authenticate) => {
      revokeUser();
      state.isAuthenticated = false;
    },
  },
});

export const { actions } = authSlice;

export default authSlice.reducer;
