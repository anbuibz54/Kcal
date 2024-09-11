/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { supabase } from "../../global_variables/supabase";
async function getProductById(id: number) {
    const response = await supabase.from("Products").select("*,shops:Shops(*)").eq('id', id).single();
    if (!!response.data) {
        return response.data
    }
    else {
        return null;
    }
}
async function getProductsByShopId(shopId: number) {
    const response = await supabase.from("Products").select("*,shops:Shops(*)").eq("shop_id", shopId);
    if (!!response.data) {
        return response.data
    }
    else {
        return null;
    }
}
async function getProducts() {
    const response = await supabase.from("Products").select("*,shops:Shops(*)");
    if (!!response.data) {
        return response.data
    }
    else {
        return null;
    }
}
export const productQueries = { getProductsByShopId, getProductById,getProducts }