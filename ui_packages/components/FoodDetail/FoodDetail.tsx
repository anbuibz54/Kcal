/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
import AppMessage from '../Message/AppMessage';
import { type FoodModel } from '../../../core/models/food/food-model';
interface FoodDetailProps {
  food: FoodModel;
  thumbnail?: string;
  onClose: () => void;
  setAdded:any;
}
export default function FoodDetail(props: FoodDetailProps) {
  // ref
  const {food, thumbnail, onClose} = props;
  const [showForm, setShowForm] = React.useState(false);
  return (
    <View style={StyleSheet.absoluteFill}>
      <View
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
              height: '90%',
              position: 'relative',
            }}>
            <TouchableOpacity
              style={{marginVertical: 16, marginLeft: 16}}
              onPress={() => {
                onClose();
              }}>
              <Icon source={'close'} size={40}></Icon>
            </TouchableOpacity>
            {!!thumbnail && (
              <Image
                src={thumbnail}
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
              <View style={{width: '100%', paddingHorizontal: 20}}>
                <AppButton
                  onPress={() => {
                    setShowForm(true);
                  }}>
                  Add to Favorites
                </AppButton>
              </View>
            </View>
          </ScrollView>
        )}
        {showForm && (
          <FavoriteForm
            onBack={() => {
              setShowForm(false);
            }}
            setAdded={props.setAdded}
            food={food}
            thumbnail={thumbnail}
          />
        )}
      </View>
      <AppMessage />
    </View>
  );
}
