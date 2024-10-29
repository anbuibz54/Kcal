import { ErrorModel } from "../../../models/error/error-model";
import type { RootState } from "../../store";
import { createAppSlice } from "../../createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState : ErrorModel ={
    messages:[]
}
export const errorSlice = createAppSlice({
    name:'error',
    initialState,
    reducers: create =>{
        return ({
            pushError: create.reducer((state,action:PayloadAction<string>)=>{
                state.messages.push(action.payload);
            }),
            clearAll: create.reducer((state,action:PayloadAction<void>)=>{
                state.messages=[];
            })
        })
    }
}) 
export const {clearAll,pushError} = errorSlice.actions
export const selectError = (state:RootState) => state.error;
export default errorSlice.reducer;