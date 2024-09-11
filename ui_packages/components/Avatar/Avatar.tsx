/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {View, Text, Image} from 'react-native';
import {useTheme, Icon} from 'react-native-paper';
//@ts-ignore
import {Avatar} from 'react-native-paper';
interface IAvatarProps {
  size?: number;
  name?: string;
  avatar?: string;
}
export default function AppAvatar(props: IAvatarProps) {
  const {size, name, avatar} = props;
  return (
    <Avatar.Image
      size={!!size ? size : 40}
      source={() => (
        <Image
          style={{width: '100%', height: '100%', borderRadius: 100}}
          src={
            !!avatar
              ? avatar
              : 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          }
        />
      )}
    />
  );
}
