import { supabase } from '@global-vars/index';
export async function getProductById(id: number) {
    const response = await supabase.from('Products').select('*,shops:Shops(*)').eq('id', id).single();
    if (response.data) {
        return response.data;
    }
    else {
        return null;
    }
}
export async function getProductsByShopId(shopId: number) {
    const response = await supabase.from('Products').select('*,shops:Shops(*)').eq('shop_id', shopId);
    if (response.data) {
        return response.data;
    }
    else {
        return null;
    }
}
export async function getProducts() {
    const response = await supabase.from('Products').select('*,shops:Shops(*)');
    if (response.data) {
        return response.data;
    }
    else {
        return null;
    }
}
