import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { authServices } from "./services";
import { authRequestBodyModel } from "../../../models/auth/auth-model";
import { logIn,logOut } from "../../slices/auth/authSlice";
const authApi = createApi({
    baseQuery:fetchBaseQuery({}),
    tagTypes:["auth"],
    endpoints:(build)=>({
        register: build.mutation<boolean,authRequestBodyModel>({
            queryFn:async (arg, api, extraOptions, baseQuery)=>{
                try{
                    const response = await authServices.register(arg);
                    if(response.isSuccess){
                        api.dispatch(logIn(response.data))
                        return {
                            data:true
                        }
                    }
                    return {
                        data:false
                    };
                }
                catch(error){
                    return {
                        error:error as FetchBaseQueryError
                    }
                }

            }
        }),
        login: build.mutation<boolean,authRequestBodyModel>({
            queryFn:async (arg, api, extraOptions, baseQuery)=>{
                try{
                    const response = await authServices.login(arg);
                    if(response.isSuccess){
                        api.dispatch(logIn(response.data))
                        return {
                            data:true
                        }
                    }
                    return {
                        data:false
                    };
                }
                catch(error){
                    return {
                        error:error as FetchBaseQueryError
                    }
                }

            }
        })
    })
})

export const {useLoginMutation,useRegisterMutation} = authApi