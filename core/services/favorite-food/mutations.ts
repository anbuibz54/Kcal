import { getApiInstance } from '@global-vars/index';
import type { FavoriteFoodModel, UpsertFavoriteFoodRequest, ApiResultModel } from '@/models';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_KEY } from '../../store/auth/utils';

const oapi = getApiInstance();
export async function createFood(input: UpsertFavoriteFoodRequest) {
    const url = 'FavoriteFood/add';
    const json = await AsyncStorage.getItem(USER_KEY);
    if (json) {
        const user = JSON.parse(json);
        input.userId = user.id;
        const response = await oapi.post<ApiResultModel<FavoriteFoodModel>>(url,input);
    return response.data;
    }
}
export async function updateFood(input: UpsertFavoriteFoodRequest) {
    const url = `FavoriteFood/update/${input.id}`;
    const json = await AsyncStorage.getItem(USER_KEY);
    if (json) {
        const user = JSON.parse(json);
        input.userId = user.id;
        const response = await oapi.put<ApiResultModel<FavoriteFoodModel>>(url,input);
    return response.data;
    }
}
