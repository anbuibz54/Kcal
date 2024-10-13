/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { supabase } from "../../../global_variables/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_KEY } from "../../store/auth/utils";

async function createProduct(input: any) {
    console.log({ input })
    const json = await AsyncStorage.getItem(USER_KEY);
    if (!!json) {
        const user = JSON.parse(json);
        input.shop_id = user.shops.id;
        delete input.id;
        const response = await supabase.from("Products").insert({ ...input }).select().single();
        console.log({ response })
        if (!!response.data) {
            return response.data;
        }
        else {
            return null;
        }

    }
    else return null

}
async function updateProduct(input: any) {
    console.log({ input })
    const json = await AsyncStorage.getItem(USER_KEY);
    if (!!json) {
        const user = JSON.parse(json);
        const productId = input.id;
        delete input.id;
        const response = await supabase.from("Products").update({ ...input }).eq('id', productId).select().single();
        console.log({ response })
        if (!!response.data) {
            user.shops = response.data
            await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
            return response.data;
        }
        else {
            return null;
        }

    }
    else return null

}
export const productMutations = { createProduct,updateProduct };