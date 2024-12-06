/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import {View, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import {Text, Divider} from 'react-native-paper';
import AppHeader from '../../ui_packages/components/AppHeader/AppHeader';
import AppSearchBar from '../../ui_packages/components/SearchBar/SearchBar';
import SearchResult from '../../ui_packages/components/SearchResult/SearchResult';
import {foodServices} from '@/services';
import ROUTES from '../../navigations/routes';
import {ITEM_PER_PAGE} from '@global-vars/index';
import { useAppDispatch, useAppSelector, selectListFood, getFoods,setOptions } from '@/redux-store';
import type { PaginationRequest,FoodModel } from '@/models';


export default function SearchingFood(props: {
  navigation: {goBack: () => void; navigate: (arg0: string) => void};
}) {
  const dispatch = useAppDispatch();
  const listFoods = useAppSelector(selectListFood);
  const [foods, setFoods] = React.useState<FoodModel[]>([]);
  const [searchText, setSearchText] = React.useState<string>('');
  const [page, setPage] = React.useState<number>(0);
  async function loadMore() {
    dispatch(setOptions({filter:listFoods.filter,sort:listFoods.sort,pagination:{...listFoods.pagination,pageNumber:page + 1}}));
    setPage(pre => pre + 1);
  }
  async function updateParams(){

  }
  async function loadItems(){
    dispatch(getFoods());
  }
  async function handleSearch(text: string) {
    setPage(0);
    setFoods([]);
  }
  React.useEffect(()=>{
    loadItems();
  },[]);
  React.useEffect(() => {
    console.log({foods});
  }, [foods]);
  React.useEffect(() =>{
    setFoods([...foods,...listFoods.foods]);
  },[listFoods.foods]);
  React.useEffect(() =>{
    loadItems();
  },[listFoods.filter,listFoods.pagination,listFoods.sort]);
  return (
    <View>
      <AppHeader title="Searching" onBack={() => {}} />
      <View
        style={{
          width: '100%',
          paddingHorizontal: 16,
          marginBottom: 32,
        }}>
        <AppSearchBar
          value={searchText}
          onChangeText={value => {
            setSearchText(value);
          }}
          onIconPress={async()=>{
            console.log('press');
            handleSearch(searchText);
          }}
        />
      </View>
      <View style={{width: '100%', paddingHorizontal: 32, marginBottom: 150}}>
        <Text>5 Result</Text>
        <Divider style={{marginVertical: 16}} />
        <FlatList
          data={foods}
          keyExtractor={(item,index)=>{
            const now = new Date();
            return `${now.getTime()} ${index}`;
          }}
          renderItem={item => {
            // console.log({item: item.item});
            const food = item.item;

            return (
              <TouchableOpacity
                style={{marginBottom: 16}}
                onPress={() => {
                  props.navigation.navigate(ROUTES.RECIPE_DETAIL);
                }}>
                <SearchResult food={food} />
              </TouchableOpacity>
            );
          }}
          onEndReached={async () => {
            await loadMore();
          }}
          onEndReachedThreshold={0.8}
        />
      </View>
    </View>
  );
}
