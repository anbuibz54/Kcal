import { getApiInstance } from '../../../global_variables/axios_instance';
import type { FoodModel, UpsertFoodRequest, AnalyzeFoodRequest, ApiResultModel } from '../../models';
import { supabase } from '../../../global_variables/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_KEY } from '../../store/auth/utils';

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
export async function createFavoriteFood(input: any) {
    const json = await AsyncStorage.getItem(USER_KEY);
    if (json) {
        const user = JSON.parse(json);
        input.user_id = user.id;
        const response = await supabase.from('Favorite_Foods').insert({ ...input }).select().single();
        if (response.data) {
            return response.data;
        }
        else {
            return null;
        }
    }
    else {return null;}
}
