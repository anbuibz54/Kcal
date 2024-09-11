/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Text, useTheme, Divider} from 'react-native-paper';

export default function AppCounter() {
  const {colors} = useTheme();
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 8,
      }}>
      <TouchableOpacity
        style={{
          height: '100%',
          width: '30%',
          borderRightWidth: 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>-</Text>
      </TouchableOpacity>
      <View
        style={{
          height: '100%',
          width: '30%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>1</Text>
      </View>
      <TouchableOpacity
        style={{
          height: '100%',
          width: '30%',
          borderLeftWidth: 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>+</Text>
      </TouchableOpacity>
    </View>
  );
}
