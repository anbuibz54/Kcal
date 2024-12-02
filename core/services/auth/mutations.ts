import { getApiInstance } from '../../../global_variables/axios_instance';
import { authRequestBodyModel,authResponseModel, ApiResultModel } from '../../models';
const oapi = getApiInstance();

export async function register(input: authRequestBodyModel){
    const response = await oapi.post<ApiResultModel<authResponseModel>>('User/register',input);
    console.log({resAtSer:response});
    return response.data;
}

export async function login(input:authRequestBodyModel){
    const response = await oapi.post<ApiResultModel<authResponseModel>>('User/login',input);
    return response.data;
}