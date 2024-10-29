import { getApiInstance } from "../../../../global_variables/axios_instance";
const oapi = getApiInstance();
async function getActivityRates(){
    const response = await oapi.get('ActivityRate/all');
    return response.data;
}
export const services = { getActivityRates}