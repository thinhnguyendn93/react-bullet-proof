import { UserRoleEnum } from 'enums/auth';
import { RootState } from 'store/store';

export const checkPermission = (state: RootState, container: string) => {
  const { permissions, role } = state.auth;
  if (container.includes('script')) {
    return role === UserRoleEnum.Administrator;
  }
  if (permissions) {
    const lower = container.toLowerCase();
    return (
      permissions.findIndex((x: string) => x.toLowerCase().includes(lower)) > -1
    );
  }
  return false;
};

export const isSuperAdminstrator = (state: RootState) =>
  state.auth.role === UserRoleEnum.SuperAdministrator;
export const isAdminstrator = (state: RootState) =>
  state.auth.role === UserRoleEnum.Administrator;
export const isManager = (state: RootState) =>
  state.auth.role === UserRoleEnum.Manager;
export const isStaff = (state: RootState) =>
  state.auth.role === UserRoleEnum.Staff;
