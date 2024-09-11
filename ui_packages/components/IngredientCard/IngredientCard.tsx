/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {View, Image} from 'react-native';
import {Text} from 'react-native-paper';

export default function IngredientCart() {
  return (
    <View
      style={{
        minHeight: 100,
        width: '100%',
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 32,
        backgroundColor: '#F1F1F1',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '50%',
        }}>
        <Image
          src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          style={{width: 72, aspectRatio: 1,borderRadius:16,marginRight:16}}
        />
        <Text style={{fontWeight: '800',fontSize:20}}>Bread</Text>
      </View>
      <Text style={{fontWeight:'200'}}>200g</Text>
    </View>
  );
}
