import { getApiInstance } from '@global-vars/index';
import { authRequestBodyModel,authResponseModel, ApiResultModel } from '@/models';
const oapi = getApiInstance();

export async function register(input: authRequestBodyModel){
    const response = await oapi.post<ApiResultModel<authResponseModel>>('User/register',input);
    return response.data;
}

export async function login(input:authRequestBodyModel){
    const response = await oapi.post<ApiResultModel<authResponseModel>>('User/login',input);
    return response.data;
}
