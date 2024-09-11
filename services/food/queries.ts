/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { supabase } from "../../global_variables/supabase";
interface searchInput{
    textSearch:string;
    from:number;
    to:number;
}
async function searchFoods(input:searchInput){
    const {from,to,textSearch} = input
    const response = await supabase.from("Foods").select('*').textSearch('name',`${textSearch!=''?textSearch:' '}`).range(from,to);
    console.log({response,input});
    if(!!response.data){
        return response.data
    }
    else{
        return null;
    }
}
export const foodQueries ={searchFoods};