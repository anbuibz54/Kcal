import {z} from 'zod';
export const FoodSchema = z.object({
    id:z.number().nullable().optional(),
    name:z.string().nullable().optional(),
    description:z.string().nullable().optional(),
    calories:z.number().nullable().optional(),
    carbohydrate:z.number().nullable().optional(),
    protein:z.number().nullable().optional(),
    fat:z.number().nullable().optional(),
    servingWeight:z.number().nullable().optional(),
    servingUnit:z.string().nullable().optional(),
});
export type AnalyzeFoodRequest ={
    image: string,
    mimeType: string
}
export type FoodModel = z.infer<typeof FoodSchema>;
export type UpsertFoodRequest = FoodModel;
