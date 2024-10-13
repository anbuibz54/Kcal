/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { supabase } from "../../../global_variables/supabase";

async function getUser(input: any) {
    const response = await supabase.from("Users").select('*').match({ ...input }).single();
    if (!!response.data) {
        return response.data
    }
    else {
        return null;

    }
}

export const authQueries = { getUser }