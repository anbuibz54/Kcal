import {z} from "zod";

export const userGetResponseSchema = z.object({
    id: z.number(),
    email: z.string(),
    phone: z.string(),
    height:z.number(),
    weight:z.number(),
    age:z.number(),
    activity_rate_id:z.number(),
});

export type userGetResponseModel = z.infer<typeof userGetResponseSchema>;