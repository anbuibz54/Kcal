import { getApiInstance } from '@global-vars/index';
import type { ApiResultModel, PaginationResponse, ListFoodRequest, FoodModel } from '@/models';

const oapi = getApiInstance();

export async function GetFoodsByPage(input: ListFoodRequest){
    const url = 'Food/all-by-page';
    const response = await oapi.post<ApiResultModel<PaginationResponse<FoodModel>>>(url,input);
    return response.data;
}
