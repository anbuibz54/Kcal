import { userGetResponseModel } from '../../../models/user/user-models';
import { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { createAppSlice } from '../../createAppSlice';
import { removeToken } from './utils';
import type { authStatusModel } from '../../../models/auth/auth-model';

const initialState: { status: authStatusModel, value: userGetResponseModel } = {
    status: 'idle',
    value: {
        id: 0,
        email: '',
        phone: '',
        height: 0,
        weight: 0,
        age: 0,
        activity_rate_id: 0,
        accessToken: '',
    },
};

export const authSilce = createAppSlice({
    name: 'auth',
    initialState,
    reducers: create => {
        return ({
            logIn: create.reducer((state, action: PayloadAction<userGetResponseModel>) => {
                state.value = action.payload;
                state.status = 'signIn';
            }),
            logOut: create.asyncThunk(async () => { 
                await removeToken();
            },{
                fulfilled:(state) =>{
                    state.status = 'logOut';
                    state.value = initialState.value;
                },
            }),
        });
    },
});

export const { logIn,logOut } = authSilce.actions;

export const selectUser = (state: RootState) => state.auth;

export default authSilce.reducer;
