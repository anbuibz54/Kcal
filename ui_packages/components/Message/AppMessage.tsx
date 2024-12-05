/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useAppDispatch, useAppSelector, selectAlert, closeAlert } from '@/redux-store';
export default function AppMessage() {
  const dispatch = useAppDispatch();
  const alertState = useAppSelector(selectAlert);
  const onDismissSnackBar = () => {
    dispatch(closeAlert());
  };
  const alertColor = () => {
    return alertState.alert?.type === 'error' ? '#E23E3E' : alertState.alert?.type === 'info' ? '#FF9C00' : alertState.alert?.type === 'success' ? '#31B057' : '';
  };
  const alertIcon = () => {
    return alertState.alert?.type === 'error' ? 'alert-circle-outline' : alertState.alert?.type === 'success' ? 'check' : 'alpha-i-circle-outline';
  };
  return (
    <>
      {alertState.show && (
        <View
          style={{
            width: '100%',
            position: 'absolute',
            bottom: 20,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Snackbar
            visible={alertState.show}
            duration={2000}
            onDismiss={onDismissSnackBar}
            icon={alertIcon()}
            onIconPress={() => { }}
            style={{ backgroundColor: alertColor() }}>
            {alertState.alert?.message}
          </Snackbar>
        </View>
      )}
    </>
  );
}
