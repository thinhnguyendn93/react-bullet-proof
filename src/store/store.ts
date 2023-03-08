import { configureStore } from '@reduxjs/toolkit';
import { appAPI } from 'api/app-api';
import authReducer from './auth/reducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    [appAPI.reducerPath]: appAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(appAPI.middleware),
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
