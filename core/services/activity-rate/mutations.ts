import { getApiInstance } from '@global-vars/index';
import type { ActivityRateModel, ApiResultModel } from '@/models';
const oapi = getApiInstance();
export async function addActivityRate(){
    const input = {
        name:'Fuck',
        description:'Fuck to failure',
        value:2.0,
    };
    const response = await oapi.post<ApiResultModel<ActivityRateModel>>('ActivityRate/add',input);
    return response.data;

}
