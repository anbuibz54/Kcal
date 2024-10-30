import { activityRateServices } from './services';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type{ ActivityRateModel } from '../../../models/activity-rate/activity-rate-model';
export const activityRateApi = createApi({
    baseQuery: fetchBaseQuery(),
    reducerPath:'activityRateApi',
    tagTypes: ['ActivityRates'],
    endpoints: (build) => ({
        getAll: build.query<Array<ActivityRateModel>, void>({
            providesTags: ["ActivityRates"],
            queryFn: async (arg, api, extraOptions, baseQuery) => {
                try {
                    const res = await activityRateServices.getActivityRates();
                    return {
                        data: res.data
                    }
                }
                catch {
                    return {
                        error:{}as FetchBaseQueryError
                    }
                }
            },
        }),
        add: build.mutation<any, any>({
            queryFn: async (arg, api, extraOptions, baseQuery) => {
                const res = await activityRateServices.addActivityRate();
                return {
                    data: res
                }
            }
        })
    })
})
export const { useGetAllQuery, useAddMutation } = activityRateApi;
export const activityRateApis = activityRateApi.endpoints;