/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {View, ScrollView, Image, TouchableOpacity} from 'react-native';
import {Text, Icon} from 'react-native-paper';
import AppButton from '../../ui_packages/components/Button/AppButton';
import AppHeader from '../../ui_packages/components/AppHeader/AppHeader';
import IngredientCart from '../../ui_packages/components/IngredientCard/IngredientCard';
import AppTextInput from '../../ui_packages/components/TextInput/TextInput';
export default function NewRecipe() {
  return (
    <View>
      <AppHeader title=" " onBack={() => {}} />
      <ScrollView style={{width: '100%', height: '100%', padding: 16}}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: '800',
            width: '70%',
            marginBottom: 16,
          }}>
          Create Recipe
        </Text>
        <Image
          src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          style={{
            height: 250,
            width: '100%',
            borderRadius: 16,
            marginBottom: 16,
          }}
        />
        <View
          style={{
            width: '100%',
            borderColor: '#E23E3E',
            borderWidth: 2,
            borderRadius: 16,
            height: 'auto',
            padding: 16,
            marginBottom: 16,
          }}>
          <Text style={{fontSize:18,fontWeight:'500',color:'#000000'}}>Bento lunch box ideas for work</Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}>
          <Text style={{fontSize: 24, fontWeight: '800'}}>Ingredient</Text>
          <Text style={{fontWeight: '200'}}>5 items</Text>
        </View>
        <View style={{width: '100%', marginBottom: 16}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
            }}>
            <View style={{width: '50%',marginRight:16}}>
              <AppTextInput />
            </View>
            <View style={{width: '30%',marginRight:16}}>
              <AppTextInput />
            </View>
            <TouchableOpacity>
              <Icon source="minus-box-outline" size={24} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center',width:'100%'}}>
            <Icon size={32} source={'plus'} />
            <Text style={{marginLeft:16,fontSize:20,fontWeight:'800'}}>Add Ingredient</Text>
        </View>
      </ScrollView>
    </View>
  );
}
