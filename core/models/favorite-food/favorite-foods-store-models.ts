import { FavoriteFoodModel, FavoriteFoodFilterParams, SortParams } from '@/models';

export type ListFavoriteFoodStoreState = {
    filter: FavoriteFoodFilterParams;
    sort: SortParams;
    favoriteFoods: FavoriteFoodModel[];
    pagination:{
        totalCount: number;
        totalPage: number;
        pageNumber: number;
        pageSize: number;
    }
}
