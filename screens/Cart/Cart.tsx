/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {View, Image, ScrollView} from 'react-native';
import {Text, useTheme, Divider, Checkbox} from 'react-native-paper';
import AppHeader from '../../ui_packages/components/AppHeader/AppHeader';
import AppButton from '../../ui_packages/components/Button/AppButton';
import CartItem from '../../ui_packages/components/CartItem/CartItem';
import ROUTES from '../../navigations/routes';
export default function Cart(props:{navigation:{navigate:(arg:string)=>void}}) {
  return (
    <View style={{width: '100%', height: '100%', position: 'relative'}}>
      <AppHeader title={'My Cart'} onBack={() => {}} />
      <Divider />
      <ScrollView style={{width: '100%', height: '100%', padding: 16,marginBottom:100}}>
        <View style={{width: '100%', minHeight: 200, marginBottom: 16}}>
          <CartItem />
        </View>
        <View style={{width: '100%', minHeight: 200, marginBottom: 16}}>
          <CartItem />
        </View>
        <View style={{width: '100%', minHeight: 200, marginBottom: 16}}>
          <CartItem />
        </View>
        <View style={{width: '100%', minHeight: 200, marginBottom: 16}}>
          <CartItem />
        </View>
        <View style={{width: '100%', minHeight: 200, marginBottom: 16}}>
          <CartItem />
        </View>
        <View style={{width: '100%', minHeight: 200, marginBottom: 16}}>
          <CartItem />
        </View>
      </ScrollView>
      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor:'#FFFFFF',
          borderTopWidth:1,
          padding:8
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Checkbox status="checked" />
          <Text style={{fontSize:18,fontWeight:'600'}}>All</Text>
        </View>
        <View
          style={{
            width: '80%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent:'flex-end'
          }}>
          <View
            style={{
              width: '20%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginRight:24
            }}>
            <Text style={{fontSize:16,fontWeight:'600'}}>Total:</Text>
            <Text style={{fontSize: 16, fontWeight: '700', color: '#E23E3E',marginLeft:8}}>
              99 $
            </Text>
          </View>
          <View style={{width: '40%'}}>
            <AppButton onPress={()=>{props.navigation.navigate(ROUTES.CHECKOUT)}}>Buy</AppButton>
          </View>
        </View>
      </View>
    </View>
  );
}
