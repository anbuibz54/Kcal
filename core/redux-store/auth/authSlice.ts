import { createSlice } from '@reduxjs/toolkit';
import { userGetResponseModel } from '../../models/user/user-models';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
const initialState: userGetResponseModel = {
    id:0,
    email:'',
    phone:'',
    height:0,
    weight:0,
    age:0,
    activity_rate_id:0,
};

export const authSilce = createSlice({
    name:'auth',
    initialState,
    reducers:{
        update:(state,action: PayloadAction<userGetResponseModel>) =>{
            state = action.payload;
        },
    },
});

export const {update} = authSilce.actions;

export const selectUser = (state: RootState) => state.auth;

export default authSilce.reducer;
