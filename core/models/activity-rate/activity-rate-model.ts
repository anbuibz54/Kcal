import {z} from "zod";
export const ActivityRateSchema = z.object({
    id:z.number().optional(),
    name:z.string().nullable().optional(),
    description:z.string().nullable().optional(),
    value:z.number().nullable().optional()
})
export type ActivityRateModel = z.infer<typeof ActivityRateSchema>