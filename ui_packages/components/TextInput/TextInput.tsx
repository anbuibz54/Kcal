/* eslint-disable prettier/prettier */
import * as React from 'react';
import {TextInput, TextInputProps, useTheme} from 'react-native-paper';

const AppTextInput = (props: TextInputProps) => {
  const theme = useTheme();
  return (
    <TextInput
      {...props}
      textColor={theme.colors.secondary}
      mode="outlined"
      left={props.left}
      right={props.right}
      outlineStyle={{borderRadius: 16, width: '100%'}}
      outlineColor={theme.colors.secondary}
    />
  );
};

export default AppTextInput;
