import { getApiInstance } from '@global-vars/index';
import type { ActivityRateModel, ApiResultModel } from '@/models';
const oapi = getApiInstance();
export async function getActivityRates(){
    const response = await oapi.get<ApiResultModel<Array<ActivityRateModel>>>('ActivityRate/all');
    return response.data;
}

