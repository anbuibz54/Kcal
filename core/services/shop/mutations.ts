import { supabase } from '@global-vars/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_KEY } from '../../store/auth/utils';

export async function createShop(input: any) {
    console.log({ input });
    const json = await AsyncStorage.getItem(USER_KEY);
    if (json) {
        const user = JSON.parse(json);
        input.user_id = user.id;
        delete input.id;
        const response = await supabase.from('Shops').insert({ ...input }).select('id,name,description,avatar').single();
        console.log({ response });
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
export async function updateShop(input: any) {
    console.log({ input });
    const json = await AsyncStorage.getItem(USER_KEY);
    if (json) {
        const user = JSON.parse(json);
        const shopId = input.id;
        delete input.id;
        const response = await supabase.from('Shops').update({ ...input }).eq('id', shopId).select('id,name,description,avatar').single();
        console.log({ response });
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
