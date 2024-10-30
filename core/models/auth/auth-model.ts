import {z} from "zod";

export const authRequestBodySchema = z.object({
    email:z.string(),
    password:z.string(),
});
export const authInforSchema = z.object({
    id:z.number(),
    accessToken:z.string()
})
export type authResponseModel = z.infer<typeof authInforSchema>
export type authStatusModel = 'logOut' | 'signIn' | 'idle';
export const USER_KEY = 'user';
export type authRequestBodyModel = z.infer<typeof authRequestBodySchema>;

