/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { supabase } from "../../../global_variables/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_KEY } from "../../store/auth/utils";
async function createFood(input: any) {
    const response = await supabase.from("Foods").insert({ ...input }).select().single();
    console.log({response});
    if (!!response.data) {
        return response.data
    }
    else {
        return null;
    }
}
async function createFavoriteFood(input: any) {
    const json = await AsyncStorage.getItem(USER_KEY);
    if (!!json) {
        const user = JSON.parse(json);
        input.user_id = user.id;
        const response = await supabase.from("Favorite_Foods").insert({ ...input }).select().single();
        if (!!response.data) {
            return response.data
        }
        else {
            return null;
        }
    }
    else return null;
}

export const foodMutaions = { createFood,createFavoriteFood }