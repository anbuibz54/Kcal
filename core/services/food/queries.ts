import { supabase } from '@global-vars/index';
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
