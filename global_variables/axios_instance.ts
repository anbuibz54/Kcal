import { getToken } from "../core/redux-store/slices/auth/utils";
import axios from "axios";
import type { AxiosResponse, InternalAxiosRequestConfig, AxiosError, AxiosInstance } from "axios";
import { BASE_URL } from "./api";
import { createNavigationContainerRef,CommonActions } from "@react-navigation/native";
import ROUTES from "../navigations/routes"; 
export const navigationRef = createNavigationContainerRef();

export function navigate(params:any) {
  if (navigationRef.isReady()) {
  navigationRef.dispatch(params);
  }
}
export type AxiosInstanceOptions = {
    url?: string;
    requestInterceptor?: (config: InternalAxiosRequestConfig) => Promise<InternalAxiosRequestConfig>,
    errorInterceptor?: (error: AxiosError) => Promise<never>,
    responseInterceptor?: (response: AxiosResponse) => AxiosResponse,

}
export function getApiInstance(options?: AxiosInstanceOptions): AxiosInstance {
    const baseUrl = options?.url ? options.url : BASE_URL;
    const requestInterceptor = options?.requestInterceptor ? options.requestInterceptor : baseRequestInterceptor;
    const responseInterceptor = options?.responseInterceptor ? options.responseInterceptor : baseResponseInterceptor;
    const errorInterceptor = options?.errorInterceptor ? options.errorInterceptor : baseErrorInterceptor;
    const axiosInstance = axios.create({ baseURL: baseUrl });
    axiosInstance.interceptors.request.use(requestInterceptor);
    axiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor);
    return axiosInstance;
}
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
    if(error?.response && error.response.status==401)
    {
        navigate(CommonActions.reset({
            index: 1,
            routes: [{ name: ROUTES.INTRO_SCREEN }],
        }),);
    }
    return Promise.reject(error);
}
function baseResponseInterceptor(response: AxiosResponse): AxiosResponse {
    return response;
}