/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {View} from 'react-native';
import {Icon, Searchbar, SearchbarProps} from 'react-native-paper';

export default function AppSearchBar(props: SearchbarProps) {
  return (
    <Searchbar
      {...props}
      right={props => {
        return (
          <View style={{marginRight:16}}>
            <Icon size={24} source={'close-box'} />
          </View>
        );
      }}
    />
  );
}
