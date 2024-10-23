import {z} from "zod";

export const authRequestBodySchema = z.object({
    email:z.string(),
    password:z.string()
});
export const USER_KEY = 'user';
export type authRequestBodyModel = z.infer<typeof authRequestBodySchema>;

