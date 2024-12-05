import { supabase } from '@global-vars/index';
import { getApiInstance } from '@global-vars/index';
import type { ApiResultModel, PaginationResponse, ListFoodRequest, FoodModel } from '@/models';

const oapi = getApiInstance();
interface searchInput{
    textSearch:string;
    from:number;
    to:number;
}
export async function searchFoods(input:searchInput){
    const {from,to,textSearch} = input;
    const response = await supabase.from('Foods').select('*').textSearch('name',`${textSearch != '' ? textSearch : ' '}`).range(from,to);
    console.log({response,input});
    if(response.data){
        return response.data;
    }
    else{
        return null;
    }
}
export async function GetFoodsByPage(input: ListFoodRequest){
    const url = 'Food/all-page';
    const response = await oapi.post<ApiResultModel<PaginationResponse<FoodModel>>>(url,input);
    return response.data;
}
