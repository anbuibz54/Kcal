/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {View, Image, ScrollView} from 'react-native';
import {Text, useTheme, Divider, Checkbox} from 'react-native-paper';
import AppHeader from '../../ui_packages/components/AppHeader/AppHeader';
import AppButton from '../../ui_packages/components/Button/AppButton';
import AppTextInput from '../../ui_packages/components/TextInput/TextInput';
import CheckoutItem from '../../ui_packages/components/CheckoutItem/CheckoutItem';
export default function Checkout() {
  return (
    <View style={{width: '100%', height: '100%', position: 'relative'}}>
      <AppHeader title={'My Cart'} onBack={() => {}} />
      <Divider />
      <ScrollView
        style={{width: '100%', height: '100%', padding: 16, marginBottom: 100}}>
        <Text style={{fontSize:18,fontWeight:'700',marginBottom:16}}>Shipping Address:</Text>
        <View style={{width:'100%',marginBottom:16}}>
        <AppTextInput />
        </View>
        <Text style={{fontSize:18,fontWeight:'700',marginBottom:16}}>Chosen Products:</Text>
        <View style={{width: '100%', minHeight: 100, marginBottom: 16}}>
          <CheckoutItem />
        </View>
        <View style={{width: '100%', minHeight: 100, marginBottom: 16}}>
          <CheckoutItem />
        </View>
        <View style={{width: '100%', minHeight: 100, marginBottom: 16}}>
          <CheckoutItem />
        </View>
        <View style={{width: '100%', minHeight: 100, marginBottom: 16}}>
          <CheckoutItem />
        </View>
        <View style={{width: '100%', minHeight: 100, marginBottom: 16}}>
          <CheckoutItem />
        </View>
        <View style={{width: '100%', minHeight: 100, marginBottom: 16}}>
          <CheckoutItem />
        </View>
        <Text style={{fontSize:18,fontWeight:'700',marginBottom:16}}>Order infomation:</Text>
        <View style={{width:'100%',borderWidth:1,padding:8,marginBottom:60}}>
            <View style={{width:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <Text>Total product price: </Text>
                <Text> 99$</Text>
            </View>
            <View style={{width:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <Text>Shipping fee: </Text>
                <Text> 99$</Text>
            </View>
            <View style={{width:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <Text style={{fontSize:16,fontWeight:'700'}}>Total: </Text>
                <Text style={{fontSize:16,fontWeight:'700',color:'#E23E3E'}}> 99$</Text>
            </View>
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
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          padding: 8,
        }}>
        <View
          style={{
            width: '20%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 24,
          }}>
          <Text style={{fontSize: 16, fontWeight: '600'}}>Total:</Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: '#E23E3E',
              marginLeft: 8,
            }}>
            99 $
          </Text>
        </View>
        <View style={{width: '40%'}}>
          <AppButton>Buy</AppButton>
        </View>
      </View>
    </View>
  );
}
