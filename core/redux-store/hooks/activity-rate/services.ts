import { getApiInstance } from "../../../../global_variables/axios_instance";
import type { ActivityRateModel } from "../../../models/activity-rate/activity-rate-model";
import type { ApiResultModel } from "../../../models/api-result-model";
const oapi = getApiInstance();
async function getActivityRates(){
    const response = await oapi.get<ApiResultModel<Array<ActivityRateModel>>>('ActivityRate/all');
    console.log({response});
    return response.data;
}
async function addActivityRate(){
    const input ={
        name:"Fuck",
        description:"Fuck to failure",
        value:2.0
    }
    const response = await oapi.post('ActivityRate/add',input);
    return response.data;

}
export const activityRateServices = { getActivityRates,addActivityRate}