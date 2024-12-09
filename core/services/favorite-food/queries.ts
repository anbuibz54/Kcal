import { getApiInstance } from '@global-vars/index';
import type { ApiResultModel, PaginationResponse, FavoriteFoodModel,ListFavoriteFoodRequest } from '@/models';

const oapi = getApiInstance();

export async function GetFavoriteFoodsByPage(userId:number,input: ListFavoriteFoodRequest){
    const url = `FavoriteFood/all/${userId}`;
    const response = await oapi.post<ApiResultModel<PaginationResponse<FavoriteFoodModel>>>(url,input);
    return response.data;
}
