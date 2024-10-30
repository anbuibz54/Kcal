import { getApiInstance } from "../../../../global_variables/axios_instance";
import { authRequestBodyModel,authResponseModel } from "../../../models/auth/auth-model";
import { ApiResultModel } from "../../../models/api-result-model";
const oapi = getApiInstance();

async function register(input: authRequestBodyModel){
    const response= await oapi.post<ApiResultModel<authResponseModel>>('User/register',input);
    return response.data;
}

async function login(input:authRequestBodyModel){
    const response= await oapi.post<ApiResultModel<authResponseModel>>('User/login',input);
    return response.data; 
}

export const authServices = {register,login}