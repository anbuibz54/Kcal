/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {View, TouchableOpacity} from 'react-native';
import AppButton from '../../ui_packages/components/Button/AppButton';
import {Icon, Text} from 'react-native-paper';
interface IAccountItemProps {
  label: string;
  icon: string;
  onClick: () => any;
}
export default function AccountItem(props: IAccountItemProps) {
  const {onClick,label,icon} = props;
  return (
    <TouchableOpacity
      style={{
        width: '100%',
        aspectRatio: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        borderRadius: 16,
        borderWidth: 2,
      }}
      onPress={() => {
        onClick();
      }}>
      <Icon size={40} source={icon} />
      <Text>{label}</Text>
    </TouchableOpacity>
  );
}
