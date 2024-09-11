/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {View, ScrollView, Image} from 'react-native';
import {Text, Icon} from 'react-native-paper';
import AppButton from '../../ui_packages/components/Button/AppButton';
import AppHeader from '../../ui_packages/components/AppHeader/AppHeader';
import IngredientCart from '../../ui_packages/components/IngredientCard/IngredientCard';
export default function RecipeDetail() {
  return (
    <View>
      <AppHeader title=" " onBack={() => {}} />
      <ScrollView style={{width: '100%', height: '100%', padding: 16}}>
        <Text style={{fontSize:28,fontWeight:'800',width:'70%',marginBottom:16}}>How to make french toast</Text>
        <Image
          src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          style={{height: 250, width: '100%',borderRadius:16,marginBottom:16}}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '50%',
            justifyContent: 'space-evenly',
            marginBottom:16
          }}>
          <Icon size={16} color="#FFB661" source="star" />
          <Text style={{fontSize: 16, fontWeight: '700'}}>4.5</Text>
          <Text style={{fontSize: 16, fontWeight: '400', color: '#A9A9A9'}}>
            300 (reviews)
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
            marginBottom:16
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '40%',
            }}>
            <Image
              src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              style={{height: 51, aspectRatio: 1, borderRadius: 100,marginRight:16}}
            />
            <Text style={{fontWeight: '800',fontSize:20}}>Anbui</Text>
          </View>
          <View style={{width:'35%'}}>
            <AppButton buttonColor="#E23E3E" textColor="#FFFFFF">
              Follow
            </AppButton>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
            marginBottom:16
          }}>
          <Text style={{fontSize: 24, fontWeight: '800'}}>Ingredient</Text>
          <Text style={{fontWeight: '200'}}>5 items</Text>
        </View>
        <View style={{width: '100%', marginBottom: 16}}>
          <IngredientCart />
        </View>
        <View style={{width: '100%', marginBottom: 16}}>
          <IngredientCart />
        </View>
        <View style={{width: '100%', marginBottom: 16}}>
          <IngredientCart />
        </View>
        <View style={{width: '100%', marginBottom: 16}}>
          <IngredientCart />
        </View>
        <View style={{width: '100%', marginBottom: 100}}>
          <IngredientCart />
        </View>
      </ScrollView>
    </View>
  );
}
