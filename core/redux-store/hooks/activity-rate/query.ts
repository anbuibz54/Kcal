import {services} from './services';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

export const activityRateApi= createApi({
    baseQuery:fetchBaseQuery(),
    tagTypes:['ActivityRates'],
    endpoints:(build)=>({
        getAll:build.query<any,void>({
            queryFn:async(arg, api, extraOptions, baseQuery) => {
                const res = await services.getActivityRates();
                return {
                    data:res
                }
            },
        })
    })
})