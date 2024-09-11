/* eslint-disable prettier/prettier */
import * as React from 'react';
import {Button, ButtonProps} from 'react-native-paper';

function AppButton(props: ButtonProps) {
  return (
    <Button
      style={{
        height:60,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      {...props}
      mode={!!props.mode ? props.mode : 'contained'}
      icon={!!props.icon ? props.icon : undefined}
      onPress={e => {
        if (props.onPress) {
          props.onPress(e);
        }
      }}>
      {props.children}
    </Button>
  );
}

export default AppButton;
