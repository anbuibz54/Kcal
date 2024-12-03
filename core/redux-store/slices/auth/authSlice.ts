import type { authResponseModel, authStatusModel } from '@/models';
import { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { createAppSlice } from '../../createAppSlice';
import { removeToken, setToken, getToken } from './utils';

const initialState: { status: authStatusModel, value: authResponseModel } = {
    status: 'idle',
    value: {
        id: 0,
        accessToken: '',
    },
};

export const authSilce = createAppSlice({
    name: 'auth',
    initialState,
    reducers: create => {
        return ({
            sample: create.reducer((state, action: PayloadAction<authResponseModel>) => {
                state.value = action.payload;
                state.status = 'signIn';
            }),
            logIn: create.asyncThunk(async (input: authResponseModel) => {
                await setToken(input);
                return input;
            }, {
                fulfilled: (state, action) => {
                    state.status = 'signIn',
                        state.value = action.payload
                }
            }),
            logOut: create.asyncThunk(async () => {
                await removeToken();
            }, {
                fulfilled: (state) => {
                    state.status = 'logOut';
                    state.value = initialState.value;
                },
            }),
            hydrate: create.asyncThunk(async () => {
                try {
                    const userToken = await getToken();
                    console.log({userToken})
                    if (userToken !== null) {
                        return userToken;
                    } else {
                        return null
                    }
                } catch (e) {
                    return null
                }
            }, {
                fulfilled: (state, action) => {
                    if (action.payload?.id) {
                        state.status = 'signIn',
                        state.value = action.payload
                    }
                    else {
                        state.status = 'logOut';
                        state.value = initialState.value;
                    }
                },

            }),
            updateToken: create.asyncThunk(async (input: authResponseModel) => {
                await setToken(input);
            }),
        });
    },
});

export const { logIn, logOut,hydrate,updateToken } = authSilce.actions;

export const selectUser = (state: RootState) => state.auth;

export default authSilce.reducer;
