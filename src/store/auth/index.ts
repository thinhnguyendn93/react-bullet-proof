import authReducer, { actions } from './reducer';
// export * from './epics';

export const { authenticate, signOut, signIn } = actions;
export { authReducer };
export { checkPermission } from './selectors';
