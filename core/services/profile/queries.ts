import { getApiInstance } from '@global-vars/index';
import { userGetResponseModel, ApiResultModel } from '@/models';
const oapi = getApiInstance();

export async function getUserProfile(userId: number){
    const response = await oapi.get<ApiResultModel<userGetResponseModel>>(`User/${userId}`);
    console.log({response:response.data});
    return response.data;
}
