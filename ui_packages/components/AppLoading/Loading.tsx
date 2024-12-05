/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {View} from 'react-native';
import {Text, ActivityIndicator} from 'react-native-paper';

export default function Loading() {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#00000010',
      }}>
      <ActivityIndicator size={'large'} />
    </View>
  );
}
