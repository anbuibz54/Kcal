/* eslint-disable prettier/prettier */
import * as React from 'react';
import {View, Text} from 'react-native';
import AppHeader from '../../ui_packages/components/AppHeader/AppHeader';
import AppSwitch from '../../ui_packages/components/Switch/Switch';
import AppTextInput from '../../ui_packages/components/TextInput/TextInput';
import AppButton from '../../ui_packages/components/Button/AppButton';
import {useTheme, TextInput} from 'react-native-paper';
export default function CreateNewPassword(props: {
  navigation: {goBack: () => void};
}) {
  const theme = useTheme();
  return (
    <View>
      <AppHeader
        onBack={() => {
          props.navigation.goBack();
        }}
        key={''}
        title="Create new Password"></AppHeader>
      <View style={{width: '100%', height: '100%', padding: 16}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Text style={{color: theme.colors.secondary, marginRight: 8}}>
            By phone{' '}
          </Text>
          <AppSwitch />
        </View>
        <View style={{marginBottom: 16}}>
          <Text style={{marginBottom: 8}}>
            Your new password must be different from previous used passwords
          </Text>
        </View>
        <View style={{marginBottom: 16}}>
          <Text style={{marginBottom: 8}}>Phone</Text>
          <AppTextInput
            label={'Phone'}
            placeholder="Phone"
            left={<TextInput.Icon icon="email-outline" />}
            right={<TextInput.Icon icon="eye-outline" />}
          />
        </View>
        <Text style={{marginBottom: 8, color: theme.colors.elevation.level2}}>
          Must be at least 8 characters
        </Text>
        <View style={{marginBottom: 16}}>
          <Text style={{marginBottom: 8}}>Phone</Text>
          <AppTextInput
            label={'Phone'}
            placeholder="Phone"
            left={<TextInput.Icon icon="lock-outline" />}
            right={<TextInput.Icon icon="eye-outline" />}
          />
        </View>
        <View
          style={{
            marginTop: 16,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{height: 60, width: '90%', marginBottom: 8}}>
            <AppButton>Login</AppButton>
          </View>
        </View>
      </View>
    </View>
  );
}
