/* eslint-disable prettier/prettier */
import * as React from 'react';
import {View, Image} from 'react-native';
import {Text} from 'react-native-paper';
export default function MiniAppCard() {
  return (
    <View
      style={{
        backgroundColor: '#FFC0B830',
        borderRadius: 40,
        paddingVertical: 32,
        paddingHorizontal: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '70%',
        width: 'auto',
        aspectRatio: 1,
      }}>
      <Image
        style={{
          width: 100,
          aspectRatio: 1,
          marginBottom: 8,
          borderRadius: 4,
        }}
        src={
          'https://eliai-server.eliai.vn/dataset/232e738e-37b8-440a-a7de-7d3a5845c87a/a4010ccb-ae85-41d6-9efe-62e0d24b58c6.jpeg'
        }
      />
      <Text style={{fontSize: 18, fontWeight: '800'}}>Meal Plan</Text>
    </View>
  );
}
