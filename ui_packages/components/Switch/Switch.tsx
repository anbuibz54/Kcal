/* eslint-disable prettier/prettier */
import * as React from 'react';
import {Switch, useTheme, SwitchProps} from 'react-native-paper';

const AppSwitch = (props: SwitchProps) => {
  const theme = useTheme();

  return <Switch {...props} color={theme.colors.secondary} />;
};

export default AppSwitch;
