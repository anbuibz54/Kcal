import { getApiInstance } from '@global-vars/index';
import { userGetResponseModel,userUpdateRequestModel, ApiResultModel } from '@/models';
const oapi = getApiInstance();

export async function updateUserInfor(input:userUpdateRequestModel){
    const response = await oapi.post<ApiResultModel<userGetResponseModel>>('User/update-user-infor',input);
    return response.data;
}
