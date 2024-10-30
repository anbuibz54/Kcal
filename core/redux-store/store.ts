import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice';
import errorReducer from './slices/error/errorSlice';
import { activityRateApi } from './hooks/activity-rate/api';
import { profileApi } from './hooks/profile/api';
import { authApi } from './hooks/auth/api';
export const store = configureStore(
    {
        reducer: {
            auth: authReducer,
            error: errorReducer,
            [activityRateApi.reducerPath]: activityRateApi.reducer,
            [authApi.reducerPath]: authApi.reducer,
            [profileApi.reducerPath]:profileApi.reducer

        },
        middleware:(getDefaultMiddleware)=>{
            const res = getDefaultMiddleware()
            .concat(activityRateApi.middleware)
            .concat(authApi.middleware)
            .concat(profileApi.middleware);
            return res;
        }
    });

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
