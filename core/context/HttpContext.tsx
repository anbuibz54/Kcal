import { createContext } from "react";
import { getToken } from "../store/auth/utils";
import ROUTES from "../../navigations/routes";
import axios from "axios";
import type { AxiosInstance,AxiosError } from "axios";
import { useNavigation, CommonActions } from "@react-navigation/native";
const axiosInstance = axios.create();
export const HttpContext = createContext<AxiosInstance>(axiosInstance);
export const HttpContextProvider = ({ children }: any) => {
    const navigate = useNavigation();
    axiosInstance.interceptors.request.use(async function (config) {
        const user = await getToken();
        const token = user?.accessToken;
        const bearer = `Bearer ${token}`;
        config.headers["Content-Type"] = "application/json";
        config.headers.Accept = "*/*";
        config.headers.Authorization = bearer;
        return config;
    });
    axiosInstance.interceptors.response.use(function (response) {
        response.data
        return response;
    }, function (error:AxiosError) {
        if (error?.response && error.response.status == 401) {
            navigate.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [{ name: ROUTES.INTRO_SCREEN }],
                }),
            );
        }
        return Promise.reject(error);
    });
    return (
        <HttpContext.Provider value={axiosInstance}>
            {children}
        </HttpContext.Provider>
    )

}
