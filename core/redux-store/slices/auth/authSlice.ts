import type { authResponseModel } from '../../../models/auth/auth-model';
import { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { createAppSlice } from '../../createAppSlice';
import { removeToken, setToken } from './utils';
import type { authStatusModel } from '../../../models/auth/auth-model';

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
            logIn: create.asyncThunk(async(input:authResponseModel)=>{
                await setToken(input);
                return input;
            },{
                fulfilled:(state,action)=>{
                    state.status='signIn',
                    state.value =action.payload
                }
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
