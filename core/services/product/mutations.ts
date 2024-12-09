import { supabase } from '@global-vars/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_KEY } from '../../store/auth/utils';

export async function createProduct(input: any) {
    const json = await AsyncStorage.getItem(USER_KEY);
    if (json) {
        const user = JSON.parse(json);
        input.shop_id = user.shops.id;
        delete input.id;
        const response = await supabase.from('Products').insert({ ...input }).select().single();
        if (response.data) {
            return response.data;
        }
        else {
            return null;
        }

    }
    else {return null;}

}
export async function updateProduct(input: any) {
    const json = await AsyncStorage.getItem(USER_KEY);
    if (json) {
        const user = JSON.parse(json);
        const productId = input.id;
        delete input.id;
        const response = await supabase.from('Products').update({ ...input }).eq('id', productId).select().single();
        if (response.data) {
            user.shops = response.data;
            await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
            return response.data;
        }
        else {
            return null;
        }

    }
    else {return null;}

}
