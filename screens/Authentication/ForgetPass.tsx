/* eslint-disable prettier/prettier */
import * as React from 'react';
import {View, Text} from 'react-native';
import AppHeader from '../../ui_packages/components/AppHeader/AppHeader';
import AppSwitch from '../../ui_packages/components/Switch/Switch';
import AppTextInput from '../../ui_packages/components/TextInput/TextInput';
import AppButton from '../../ui_packages/components/Button/AppButton';
import {useTheme, TextInput} from 'react-native-paper';
import ROUTES from '../../navigations/routes';
export default function ForgetPass(props: {
  navigation: {goBack: () => void; navigate: (arg0: string) => void};
}) {
  const theme = useTheme();
  return (
    <View>
      <AppHeader
        onBack={() => {
          props.navigation.goBack();
        }}
        key={''}
        title="Forget Password"></AppHeader>
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
            Enter your email and we will send you a link to reset your password.
          </Text>
        </View>
        <View style={{marginBottom: 16}}>
          <Text style={{marginBottom: 8}}>Phone</Text>
          <AppTextInput
            label={'Phone'}
            placeholder="Phone"
            left={<TextInput.Icon icon="email-outline" />}
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
            <AppButton
              onPress={() => {
                props.navigation.navigate(ROUTES.NEW_PASS_SCREEN);
              }}>
              Continue
            </AppButton>
          </View>
        </View>
      </View>
    </View>
  );
}
