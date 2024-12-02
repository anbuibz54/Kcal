import { getApiInstance } from '../../../global_variables/axios_instance';
import type { ActivityRateModel, ApiResultModel } from '../../models';
const oapi = getApiInstance();
export async function getActivityRates(){
    const response = await oapi.get<ApiResultModel<Array<ActivityRateModel>>>('ActivityRate/all');
    console.log({response});
    return response.data;
}

