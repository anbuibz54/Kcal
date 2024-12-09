/* eslint-disable react-native/no-inline-styles */

import * as React from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Text, Icon} from 'react-native-paper';
import AppButton from '../Button/AppButton';
import FavoriteForm from './FavoriteForm';
import { type FoodModel } from '@/models';
interface FoodDetailProps {
  food: FoodModel;
  thumbnail?: string;
  onClose: () => void;
}
export default function FoodDetail(props: FoodDetailProps) {
  // ref
  const {food, thumbnail, onClose} = props;
  const [showForm, setShowForm] = React.useState(false);
  return (
    <View style={StyleSheet.absoluteFill}>
      <ScrollView
        style={{
          width: '100%',
          height: '70%',
          position: 'absolute',
          bottom: 0,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          backgroundColor: '#F4F4F4',
        }}>
        {!showForm && (
          <ScrollView
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
            }}>
            <TouchableOpacity
              style={{marginVertical: 16, marginLeft: 16}}
              onPress={() => {
                onClose();
              }}>
              <Icon source={'close'} size={40} />
            </TouchableOpacity>
            {!!thumbnail && (
              <Image
                source={{
                  uri:thumbnail,
                }}
                style={{
                  height: 250,
                  width: '100%',
                  borderTopLeftRadius: 40,
                  borderTopRightRadius: 40,
                }}
              />
            )}
            <View
              style={{
                height: 150,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                backgroundColor: '#FF847325',
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{fontSize: 18, fontWeight: '700', color: '#FF8473'}}>
                  Protein
                </Text>
                <Text
                  style={{fontSize: 18, fontWeight: '700', color: '#FF8473'}}>
                  {food.protein}g
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{fontSize: 18, fontWeight: '700', color: '#FF8473'}}>
                  Fat
                </Text>
                <Text
                  style={{fontSize: 18, fontWeight: '700', color: '#FF8473'}}>
                  {food.fat}g
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{fontSize: 18, fontWeight: '700', color: '#FF8473'}}>
                  Carb
                </Text>
                <Text
                  style={{fontSize: 18, fontWeight: '700', color: '#FF8473'}}>
                  {food.carbohydrate}g
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{fontSize: 18, fontWeight: '700', color: '#FF8473'}}>
                  caloreies
                </Text>
                <Text
                  style={{fontSize: 18, fontWeight: '700', color: '#FF8473'}}>
                  {food.calories} kcal
                </Text>
              </View>
            </View>
            <View style={{padding: 32}}>
              <Text style={{fontSize: 24, fontWeight: '700', marginBottom: 32}}>
                Details
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '200',
                  width: '100%',
                }}>
                {food.description}
              </Text>
              <View style={{width: '100%', marginBottom: 32}}>
                <AppButton mode="text">Read More...</AppButton>
              </View>
              {
                !thumbnail && (
                  <View style={{width: '100%', paddingHorizontal: 20}}>
                <AppButton
                  onPress={() => {
                    setShowForm(true);
                  }}>
                  Add to Favorites
                </AppButton>
              </View>
                )
              }
            </View>
          </ScrollView>
        )}
        {showForm && (
          <FavoriteForm
            onBack={() => {
              setShowForm(false);
            }}
            food={food}
            thumbnail={thumbnail}
          />
        )}
      </ScrollView>
    </View>
  );
}
