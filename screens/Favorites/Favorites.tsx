/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';
import {Text, Divider} from 'react-native-paper';
import AppHeader from 'ui_packages/components/AppHeader/AppHeader';
import AppSearchBar from 'ui_packages/components/SearchBar/SearchBar';
import SearchResult from 'ui_packages/components/SearchResult/SearchResult';
import FoodDetail from 'ui_packages/components/FoodDetail/FoodDetail';
import ROUTES from '../../navigations/routes';
import { useAppDispatch, useAppSelector, listFavoriteFoodStore } from '@/redux-store';
import type { FavoriteFoodModel } from '@/models';
import { RootBottomTabsParamList } from 'navigations/BottomTabStack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

type Props = BottomTabScreenProps<RootBottomTabsParamList,'favorites'>;
export default function FavoriteFoods(props:Props) {
  const dispatch = useAppDispatch();
  const listFavoriteFoods = useAppSelector(listFavoriteFoodStore.selectListFavoriteFood);
  const [selectedFood, setSelectedFood] = React.useState<FavoriteFoodModel | null>(null);
  const [foods, setFoods] = React.useState<FavoriteFoodModel[]>([]);
  const [searchText, setSearchText] = React.useState<string>('');
  const [page, setPage] = React.useState<number>(1);
  async function loadMore() {
    setPage(pre => pre + 1);
  }
  function updateParams(){
    dispatch(listFavoriteFoodStore.setOptions({filter:{...listFavoriteFoods.filter,name:searchText},sort:listFavoriteFoods.sort,pagination:{...listFavoriteFoods.pagination,pageNumber:page + 1}}));
  }
  function handleCloseDetail(){
    setSelectedFood(null);
  }
  async function loadItems(){
    dispatch(listFavoriteFoodStore.getFavoriteFoods());
  }
  async function handleSearch(text: string) {
    setPage(0);
    setFoods([]);
  }
  React.useEffect(()=>{
    loadItems();
  },[]);
  React.useEffect(() => {
    updateParams();
  }, [page]);
  React.useEffect(() =>{
    setFoods([...foods,...listFavoriteFoods.favoriteFoods]);
  },[listFavoriteFoods.favoriteFoods]);
  React.useEffect(() =>{
    loadItems();
  },[listFavoriteFoods.filter,listFavoriteFoods.pagination.pageNumber,listFavoriteFoods.sort]);
  return (
    <View style={{width: '100%',height:'100%'}}>
      <AppHeader title="Favorites" onBack={() => {}} />
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
            const food = item.item.food;

            if(food)
            {
              return (
                <TouchableOpacity
                  style={{marginBottom: 16}}
                  onPress={() => {
                    // props.navigation.navigate(ROUTES.RECIPE_DETAIL);
                    setSelectedFood(item.item);
                  }}>
                  <SearchResult food={food} />
                </TouchableOpacity>
              );
            }
            else{
              return null;
            }
          }}
          onEndReached={async () => {
            await loadMore();
          }}
          onEndReachedThreshold={0.8}
        />
      </View>
      {
          selectedFood?.food && (
            <FoodDetail food={selectedFood.food} onClose={handleCloseDetail} thumbnail={selectedFood.thumbnail as string} />
          )
        }
    </View>
  );
}

