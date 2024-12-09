import {z} from 'zod';
import { FoodSchema } from '../food';
import type { PaginationRequest, SortParams } from '@/models';

export const FavoriteFoodSchema = z.object({
    id:z.number().nullable().optional(),
    userId:z.number().nullable().optional(),
    foodId:z.number().nullable().optional(),
    description:z.string().nullable().optional(),
    thumbnail:z.string().nullable().optional(),
    address:z.string().nullable().optional(),
    food: FoodSchema.nullable().optional(),
});
export type FavoriteFoodModel = z.infer<typeof FavoriteFoodSchema>;
export type UpsertFavoriteFoodRequest = FavoriteFoodModel;
export type FavoriteFoodFilterParams = {
    name: string;
};
export type ListFavoriteFoodRequest ={
    paginationParams: PaginationRequest;
    sortParams: SortParams;
    filterParams: FavoriteFoodFilterParams;
};
