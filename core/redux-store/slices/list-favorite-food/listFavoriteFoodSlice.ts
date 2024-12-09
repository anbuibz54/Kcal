import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { createAppSlice } from '../../createAppSlice';
import type { ListFavoriteFoodRequest, FavoriteFoodFilterParams, SortParams, PaginationRequest, ListFavoriteFoodStoreState,PaginationResponse, FavoriteFoodModel } from '@/models';
import { favoriteFoodServices } from '@/services';
import { getToken } from '@/redux-store/slices/auth';

const initialState: ListFavoriteFoodStoreState = {
    filter: {
        name: '',
    },
    favoriteFoods:[],
    pagination:{
        pageNumber:1,
        pageSize:10,
        totalCount:0,
        totalPage:0,
    },
    sort:{
        params:[],
    },
};

const listFavoriteFoodSlice = createAppSlice({
    name:'listFoodSlice',
    initialState,
    reducers : create => ({
        setOptions: create.reducer((state, action:PayloadAction<{filter:FavoriteFoodFilterParams;pagination:PaginationRequest,sort:SortParams}>)=>{
            state.filter = action.payload.filter;
            state.sort = action.payload.sort;
            state.pagination = {...state.pagination,...action.payload.pagination};
        }),
        setData: create.reducer((state, action:PayloadAction<PaginationResponse<FavoriteFoodModel>>)=>{
            state.favoriteFoods = action.payload.data;
                state.pagination = {
                    pageNumber: action.payload.pageNumber,
                    pageSize: action.payload.pageSize,
                    totalCount: action.payload.totalCount,
                    totalPage: action.payload.totalPage,
                };
        }),
        getFavoriteFoods: create.asyncThunk(async (_,thunkApi)=>{
            const state = thunkApi.getState() as RootState;
            const params: ListFavoriteFoodRequest = {
                sortParams: state.listFood.sort,
                filterParams: state.listFood.filter,
                paginationParams: state.listFood.pagination,
            };
            const user = await getToken();
            if(user?.id)
            {
                const response = await favoriteFoodServices.GetFavoriteFoodsByPage(user.id,params);
            if(response.isSuccess)
            {
                return response.data;
            }
            }
        },{
            fulfilled:(state,action) =>{
                if(action.payload?.data)
                {
                    state.favoriteFoods = action.payload.data;
                    state.pagination = {
                        ...state.pagination,
                        totalCount: action.payload.totalCount,
                        totalPage: action.payload.totalPage,
                    };
                }
            },
        }),
    }),
});
export const {getFavoriteFoods,setData,setOptions} = listFavoriteFoodSlice.actions;
export const selectListFavoriteFood = (state:RootState) => state.listFavoriteFood;
export default listFavoriteFoodSlice.reducer;

