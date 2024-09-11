/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {View, Text, Image} from 'react-native';
import {useTheme, Icon} from 'react-native-paper';

export default function RecipeCard() {
  return (
    <View
      style={{width: '100%', borderWidth: 1, borderRadius: 16}}>
      <Image
        src={
          'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        }
        style={{
          width: '100%',
          height: '50%',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
      />
      <View style={{width:'100%',padding:16}}>
      <Text style={{fontSize: 18, fontWeight: '700',color:'#FFFFFF'}}>
        Pancake with super sweat honey
      </Text>
      <Text style={{fontSize: 16, fontWeight: '600',color:'#B53232'}}>Free</Text>
      </View>
    </View>
  );
}
