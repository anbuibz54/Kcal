/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { supabase } from "../../global_variables/supabase";

async function createUser(input: any) {
    const response = await supabase.from("Users").insert({ ...input }).select().single();
    if (!!response.data) {
        return response.data
    }
    else {
        return null;
    }
}

export const authMutaions ={createUser}