/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Icon, Text, useTheme} from 'react-native-paper';
import AppButton from '../Button/AppButton';

export default function ShopCard() {
  const theme = useTheme();
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: theme.colors.elevation.level0,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'flex-end',
      }}>
      <View
        style={{
          height: '70%',
          width: '100%',
          backgroundColor: '#E23E3E30',
          padding: 8,
          borderRadius: 16,
        }}>
        <View
          style={{
            height: '80%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 18, fontWeight: '700', textAlign: 'center'}}>
            Chopped Shop
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity>
            <Text style={{fontSize: 12, fontWeight: '700', color: '#FFFFFF'}}>
              View shop
            </Text>
          </TouchableOpacity>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 12, fontWeight: '700',marginRight:4}}>4.5</Text>
            <Icon source={'star'} size={24} color='#FF9C00' />
          </View>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          padding: 32,
          position: 'absolute',
          top: 0,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: '70%',
            aspectRatio: 1,
            borderRadius: 100,
            backgroundColor: '#D9D9D9',
          }}>
          <Image
            src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            style={{width: '100%', aspectRatio: 1, borderRadius: 100}}
          />
        </View>
      </View>
    </View>
  );
}
