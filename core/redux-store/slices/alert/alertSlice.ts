import type { AlertModel } from '@/models/alert';
import { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { createAppSlice } from '../../createAppSlice';

const initialState :{ show: boolean, alert: AlertModel | null} = {
    alert:null,
    show:false,
};

const alertSlice = createAppSlice({
    name:'alert',
    initialState,
    reducers: create =>{
        return ({
            showAlert: create.reducer((state, action:PayloadAction<AlertModel>)=>{
                state.show = true;
                state.alert = action.payload;
            }),
            closeAlert: create.reducer((state)=>{
                state.show = false;
                state.alert = null;
            }),
        });
    },
});

export const {showAlert, closeAlert} = alertSlice.actions;
export const selectAlert = (state: RootState) => state.alert;
export default alertSlice.reducer;
