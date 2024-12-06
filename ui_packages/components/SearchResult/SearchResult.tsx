/* eslint-disable react-native/no-inline-styles */

import * as React from 'react';
import {View, Image} from 'react-native';
import {Text, Icon} from 'react-native-paper';
import type { FoodModel } from '@/models';
interface ISearchResultProps{
 food:FoodModel
}
export default function SearchResult(props:ISearchResultProps) {
  const {food} = props;
  return (
    <View
      style={{
        backgroundColor: '#EFF7EE',
        position: 'relative',
        width: '100%',
        minHeight: 200,
        padding: 24,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexGrow: 1,
        borderRadius:12,
      }}>
      <Image
        style={{width: '35%', aspectRatio: 1}}
        src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
      <View style={{width:'70%',marginLeft:24}}>
        <Text style={{color: '#6CB663', fontSize: 18, fontWeight: '800'}}>
          {food.calories} kcal
        </Text>
        <Text style={{color: '#2E2E2E', fontSize: 22, fontWeight: '800'}}>
         {food.description}
        </Text>
        <Text style={{color: '#767676', fontSize: 18, fontWeight: '500'}}>
          Free
        </Text>
      </View>
      <View style={{position: 'absolute', top: 20, right: 20}}>
        <Icon color="#6CB663" size={24} source="heart-outline" />
      </View>
    </View>
  );
}
