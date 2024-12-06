import type { FoodModel, FoodFilterParams, SortParams } from '@/models';

export type ListFoodStoreState = {
    filter: FoodFilterParams;
    sort: SortParams;
    foods: FoodModel[];
    pagination:{
        totalCount: number;
        totalPage: number;
        pageNumber: number;
        pageSize: number;
    }
}
