import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { createAppSlice } from '../../createAppSlice';
import type { ListFoodStoreState, FoodFilterParams, SortParams, PaginationRequest, ListFoodRequest,PaginationResponse, FoodModel } from '@/models';
import { foodServices } from '@/services';


const initialState: ListFoodStoreState = {
    filter: {
        name: '',
    },
    foods:[],
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

const listFoodSlice = createAppSlice({
    name:'listFoodSlice',
    initialState,
    reducers : create => ({
        setOptions: create.reducer((state, action:PayloadAction<{filter:FoodFilterParams;pagination:PaginationRequest,sort:SortParams}>)=>{
            state.filter = action.payload.filter;
            state.sort = action.payload.sort;
            state.pagination = {...state.pagination,...action.payload.pagination};
        }),
        setData: create.reducer((state, action:PayloadAction<PaginationResponse<FoodModel>>)=>{
            state.foods = action.payload.data;
                state.pagination = {
                    pageNumber: action.payload.pageNumber,
                    pageSize: action.payload.pageSize,
                    totalCount: action.payload.totalCount,
                    totalPage: action.payload.totalPage,
                };
        }),
        getFoods: create.asyncThunk(async (_,thunkApi)=>{
            const state = thunkApi.getState() as RootState;
            const params: ListFoodRequest = {
                sortParams: state.listFood.sort,
                foodFilterParams: state.listFood.filter,
                paginationParams: state.listFood.pagination,
            };
            const response = await foodServices.GetFoodsByPage(params);
            if(response.isSuccess)
            {
                return response.data;
            }
        },{
            fulfilled:(state,action) =>{
                if(action.payload?.data)
                {
                    state.foods = action.payload.data;
                    state.pagination = {
                        pageNumber: action.payload.pageNumber,
                        pageSize: action.payload.pageSize,
                        totalCount: action.payload.totalCount,
                        totalPage: action.payload.totalPage,
                    };
                }
            }
        }),
    }),
});
export const {getFoods,setData,setOptions} = listFoodSlice.actions;
export const selectListFood = (state:RootState) => state.listFood;
export default listFoodSlice.reducer;

