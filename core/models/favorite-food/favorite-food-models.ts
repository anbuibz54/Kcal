import {z} from 'zod';
export const FavoriteFoodSchema = z.object({
    id:z.number().nullable().optional(),
    userId:z.number().nullable().optional(),
    foodId:z.number().nullable().optional(),
    description:z.string().nullable().optional(),
    thumbnail:z.string().nullable().optional(),
    address:z.string().nullable().optional(),
});
export type FavoriteFoodModel = z.infer<typeof FavoriteFoodSchema>;
export type UpsertFavoriteFoodRequest = FavoriteFoodModel;
