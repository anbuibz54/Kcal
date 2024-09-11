/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import {View, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import {Text, Divider} from 'react-native-paper';
import AppHeader from '../../ui_packages/components/AppHeader/AppHeader';
import AppSearchBar from '../../ui_packages/components/SearchBar/SearchBar';
import SearchResult from '../../ui_packages/components/SearchResult/SearchResult';
import {foodQueries} from '../../services/food/queries';
import ROUTES from '../../navigations/routes';
import {ITEM_PER_PAGE} from '../../global_variables/paging';
export default function SearchingFood(props: {
  navigation: {goBack: () => void; navigate: (arg0: string) => void};
}) {
  const [foods, setFoods] = React.useState<any[]>([]);
  const [searchText, setSearchText] = React.useState<string>('');
  const [offset, setOffset] = React.useState<number>(0);
  async function initialFood() {
    const data = await foodQueries.searchFoods({
      textSearch: searchText,
      from: 0,
      to: ITEM_PER_PAGE,
    });
    if (!!data) {
      setFoods(data);
    }
  }
  async function loadMore() {
    const data = await foodQueries.searchFoods({
      textSearch: searchText,
      from: offset,
      to: offset + ITEM_PER_PAGE+1,
    });
    if (!!data) {
      setFoods([...foods, ...data]);
      setOffset(offset + ITEM_PER_PAGE+1);
    }
  }
  async function handleSearch(text: string) {
    setOffset(0);
    setFoods([]);
    await initialFood();
  }
  React.useEffect(() => {
    initialFood();
  }, []);

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
            console.log("press")
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
            return `${now.getTime()} ${index}`
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
                <SearchResult food={{...food}} />
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
