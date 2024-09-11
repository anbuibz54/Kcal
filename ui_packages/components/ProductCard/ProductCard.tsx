/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {View, Text, Image} from 'react-native';
import {useTheme, Icon} from 'react-native-paper';
interface IProductCardProps{
  name:string;
  price:number;
  image:string;
}
export default function ProductCard(props:IProductCardProps) {
  const {name,image,price} = props
  return (
    <View
      style={{width: '100%', borderWidth: 1, borderRadius: 16}}>
      <Image
        src={
          image
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
        {name}
      </Text>
      <Text style={{fontSize: 16, fontWeight: '600',color:'#B53232'}}>{price}</Text>
      </View>
    </View>
  );
}
