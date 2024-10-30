import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { profileServices } from "./services";
import type { userGetResponseModel,userUpdateRequestModel } from "../../../models/user/user-models";


export const profileApi = createApi({
    baseQuery:fetchBaseQuery({}),
    reducerPath:'profileApi',
    tagTypes:["profile"],
    endpoints: build =>({
        getUserById:build.query<userGetResponseModel,number>({
            queryFn:async (arg)=>{
                try{
                    const response = await profileServices.getUserProfile(arg);
                    return{
                        data:response.data
                    }
                }
                catch(err){
                    return {
                        error:err as FetchBaseQueryError
                    }
                }
            }
        }),
        updateUserInfor:build.mutation<userGetResponseModel,userUpdateRequestModel>({
            queryFn:async(arg)=>{
                try{
                    const response = await profileServices.updateUserInfor(arg);
                    return {
                        data:response.data
                    }
                }
                catch(err){
                    return{
                        error: err as FetchBaseQueryError
                    }
                }
            }
        })
    })
})

export const {useGetUserByIdQuery,useUpdateUserInforMutation} = profileApi