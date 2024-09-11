/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Text, useTheme, Divider, Checkbox, Icon} from 'react-native-paper';
import AppCounter from '../Counter/Coiunter';

export default function CheckoutItem() {
  return (
    <View
      style={{width: '100%', borderWidth: 1, borderRadius: 16, padding: 16}}>
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          style={{height: 50, aspectRatio: 1, borderRadius: 10, margin: 8}}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}>
          <Text style={{fontSize: 18, fontWeight: '700'}}>Product name</Text>
          <Text style={{fontSize: 16, fontWeight: '700', color: '#E23E3E'}}>
            99 $
          </Text>
          <Text>x3</Text>
        </View>
      </View>
      <Divider />
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginTop: 16,
        }}>
        <Text style={{fontSize: 16, fontWeight: '700', color: '#E23E3E'}}>
          Total: 99 $
        </Text>
      </View>
    </View>
  );
}
