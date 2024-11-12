import * as React from 'react';
import { View, Image, ImageSourcePropType } from 'react-native';
import { Text } from 'react-native-paper';

interface MiniAppCardProps {
  source?: ImageSourcePropType;
  label?: string;
}

export default function MiniAppCard({
  source = require('../../../assets/images/Group9.png'),
  label = 'Meal Plan',
}: MiniAppCardProps) {
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
      }}
    >
      <Image
        style={{
          width: 100,
          aspectRatio: 1,
          marginBottom: 20,
          borderRadius: 4,
        }}
        source={source}
        resizeMode="contain" // Thêm thuộc tính resizeMode để tránh cắt ảnh
      />
      <Text style={{ fontSize: 18, fontWeight: '800' }}>{label}</Text>
    </View>
  );
}