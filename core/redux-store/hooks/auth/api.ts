/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { authServices } from '../../../services';
import { authRequestBodyModel } from '../../../models';
import { logIn,logOut } from '../../slices/auth/authSlice';
export const authApi = createApi({
    baseQuery:fetchBaseQuery({}),
    tagTypes:['authApi'],
    reducerPath:'authApi',
    endpoints:(build)=>({
        register: build.mutation<boolean,authRequestBodyModel>({
            queryFn:async (arg, api, extraOptions, baseQuery)=>{
                try{
                    const response = await authServices.register(arg);
                    console.log({resAtApi:response});
                    if(response.isSuccess){
                        api.dispatch(logIn(response.data));
                        return {
                            data:true,
                        };
                    }
                    return {
                        data:false,
                    };
                }
                catch(error){
                    return {
                        error:error as FetchBaseQueryError,
                    };
                }

            },
        }),
        signin: build.mutation<boolean,authRequestBodyModel>({
            queryFn:async (arg, api, extraOptions, baseQuery)=>{
                try{
                    const response = await authServices.login(arg);
                    if(response.isSuccess){
                        api.dispatch(logIn(response.data));
                        return {
                            data:true,
                        };
                    }
                    return {
                        data:false,
                    };
                }
                catch(error){
                    return {
                        error:error as FetchBaseQueryError,
                    };
                }

            },
        }),
    }),
});

export const {useSigninMutation,useRegisterMutation} = authApi;
