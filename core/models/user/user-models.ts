import {z} from "zod";
import { ActivityRateSchema } from "../activity-rate/activity-rate-model";
export const userGetResponseSchema = z.object({
    id: z.number().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    height:z.number().optional(),
    weight:z.number().optional(),
    age:z.number().optional(),
    gender:z.number().optional(),
    activityRateId:z.number(),
    accessToken: z.string(),
    tdee:z.number().nullable().optional()
});
export const userUpdateRequestSchema = z.object({
    id: z.number(),
    height:z.number().nullable().optional().default(0),
    weight:z.number().nullable().optional().default(0),
    age:z.number().nullable().optional().default(0),
    gender:z.number().nullable().optional().default(1),
    activityRateId:z.number().nullable().optional().default(1),
    tdee:z.number().nullable().optional().default(0)
})
export type userUpdateRequestModel = z.infer<typeof userUpdateRequestSchema>;
export type userGetResponseModel = z.infer<typeof userGetResponseSchema>;