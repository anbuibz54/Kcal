import { getApiInstance} from '@global-vars/index';
import type { FoodModel, UpsertFoodRequest, AnalyzeFoodRequest, ApiResultModel } from '@/models';

const oapi = getApiInstance();
export async function createFood(input: UpsertFoodRequest) {
    const url = 'Food/add';
    const response = await oapi.post<ApiResultModel<FoodModel>>(url,input);
    return response.data;
}
export async function updateFood(input: UpsertFoodRequest) {
    const url = `Food/update/${input.id}`;
    const response = await oapi.put<ApiResultModel<FoodModel>>(url,input);
    return response.data;
}
export async function analyzeFood(input: AnalyzeFoodRequest) {
    const url = 'Food/analyze';
    const response = await oapi.post<ApiResultModel<FoodModel>>(url,input);
    return response.data;
}
