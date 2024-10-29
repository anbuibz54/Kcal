import { useState,useEffect } from "react";
import { useAppDispatch} from "../redux-store/hooks/base";
import axios from "axios";
import type { AxiosResponse, InternalAxiosRequestConfig, AxiosError, AxiosInstance } from "axios";
import { getToken } from "../redux-store/slices/auth/utils";
import { pushError } from "../redux-store/slices/error/errorSlice";
import { BASE_URL } from "../../global_variables/api";
export type AxiosInstanceOptions = {
    url?: string;
    requestInterceptor?: (config: InternalAxiosRequestConfig) => Promise<InternalAxiosRequestConfig>,
    errorInterceptor?: (error: AxiosError) => Promise<never>,
    responseInterceptor?: (response: AxiosResponse) => AxiosResponse,

}
const useAxios = (options: AxiosInstanceOptions)=>{
    const dispatch = useAppDispatch();
    const baseUrl = options?.url ? options.url : BASE_URL;
    const requestInterceptor = options?.requestInterceptor ? options.requestInterceptor : baseRequestInterceptor;
    const responseInterceptor = options?.responseInterceptor ? options.responseInterceptor : baseResponseInterceptor;
    const errorInterceptor = options?.errorInterceptor ? options.errorInterceptor : baseErrorInterceptor;
    const axiosInstance = axios.create({ baseURL: baseUrl });
    axiosInstance.interceptors.request.use(requestInterceptor);
    axiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor);
    async function baseRequestInterceptor(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {
        const user = await getToken();
        const token = user?.accessToken;
        const bearer = `Bearer ${token}`;
        config.headers["Content-Type"] = "application/json";
        config.headers.Accept = "*/*";
        config.headers.Authorization = bearer;
        return config;
    }
    function baseErrorInterceptor(error: AxiosError): Promise<never> {
        if(error?.response && error.response.status == 401){
            dispatch(pushError(error.message));
        }
        return Promise.reject(error);
    }
    function baseResponseInterceptor(response: AxiosResponse): AxiosResponse {
        return response;
    }
    return axiosInstance;
}
export default useAxios;