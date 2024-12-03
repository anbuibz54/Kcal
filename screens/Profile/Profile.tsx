/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Text, ScrollView} from 'react-native';
import AppHeader from '../../ui_packages/components/AppHeader/AppHeader';
import AppButton from '../../ui_packages/components/Button/AppButton';
import {CommonActions} from '@react-navigation/native';
import ROUTES from '../../navigations/routes';
import AppAvatar from '../../ui_packages/components/Avatar/Avatar';
import RecipeCard from '../../ui_packages/components/RecipeCard/RecipeCard';
import { useAppDispatch } from '@/redux-store/';
import { logOut } from '@/redux-store/slices/auth/';
export default function Profile(props: {
  navigation: {dispatch: (arg0: CommonActions.Action) => void};
}) {
  const dispatch= useAppDispatch();
  return (
    <View style={{width: '100%', height: '100%'}}>
      <AppHeader title="My Profile" onBack={() => {}} />
      <View style={{width: '100%', height: '30%', padding: 16}}>
        <View
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <AppAvatar size={80} name="An" />
          <Text style={{fontSize: 20, fontWeight: '700'}}>Anbuibz54</Text>
        </View>
        <View
          style={{
            width: '100%',
            padding: 16,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop:32,
          }}>
          <View style={{display: 'flex', flexDirection: 'column'}}>
            <Text>Recipe</Text>
            <Text style={{fontWeight: '600',fontSize:18}}>14</Text>
          </View>
          <View style={{width:'40%'}}>
            <AppButton>Add Recipe</AppButton>
          </View>
        </View>
      </View>
      <ScrollView
        style={{
          width: '100%',
          height: '100%',
          padding: 16,
          backgroundColor: '#D9D9D9',
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginBottom: 40,
          }}>
          <View style={{width: '45%', height: 300, marginBottom: 16}}>
            <RecipeCard />
          </View>
          <View style={{width: '45%', height: 300, marginBottom: 16}}>
            <RecipeCard />
          </View>
          <View style={{width: '45%', height: 300, marginBottom: 16}}>
            <RecipeCard />
          </View>
          <View style={{width: '45%', height: 300, marginBottom: 16}}>
            <RecipeCard />
          </View>
        </View>
      </ScrollView>
      <AppButton onPress={()=>{
        dispatch(logOut());
      }}>Logout</AppButton>
    </View>
  );
}
