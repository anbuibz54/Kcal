import { getApiInstance } from '../../../../global_variables/axios_instance';
import { userGetResponseModel,userUpdateRequestModel, ApiResultModel } from '../../../models';
const oapi = getApiInstance();

async function getUserProfile(userId: number){
    const response = await oapi.get<ApiResultModel<userGetResponseModel>>(`User/${userId}`);
    console.log({response:response.data});
    return response.data;
}

async function updateUserInfor(input:userUpdateRequestModel){
    const response = await oapi.post<ApiResultModel<userGetResponseModel>>('User/update-user-infor',input);
    return response.data;
}

export const profileServices = { getUserProfile, updateUserInfor};
