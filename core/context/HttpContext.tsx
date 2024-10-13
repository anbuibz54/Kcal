import { useState, useEffect, createContext } from "react";
import { getToken } from "../store/auth/utils";
import ROUTES from "../../navigations/routes";
import axios from "axios";
import { AxiosInstance } from "axios";
import { useNavigation, CommonActions } from "@react-navigation/native";
const axiosInstance = axios.create({ baseURL: 'http://localhost:5043/api/' });
export const HttpContext = createContext<AxiosInstance>(axiosInstance);
export const HttpContextProvider = ({ children }: any) => {
    const navigate = useNavigation();

    // axiosInstance.defaults.headers.common={
    //     "Content-Type":"application/json",
    //     "Accept":'*/*',
    //     "Authorization":bearer
    // }
    axiosInstance.interceptors.request.use(async function (config) {
        const user = await getToken();
        const token = user?.accessToken;
        const bearer = `Bearer ${token}`;
        config.headers["Content-Type"] = "application/json";
        config.headers.Accept = "*/*";
        config.headers.Authorization = bearer;
        return config;
    }, function (error) {
        return Promise.reject(error);
    });
    axiosInstance.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if (error.response.status == 401) {
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
