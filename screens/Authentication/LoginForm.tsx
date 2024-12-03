/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { View, Text } from 'react-native';
import AppHeader from '../../ui_packages/components/AppHeader/AppHeader';
import AppTextInput from '../../ui_packages/components/TextInput/TextInput';
import AppButton from '../../ui_packages/components/Button/AppButton';
// import Loading from '../Loading/Loading';
import { TextInput } from 'react-native-paper';
import ROUTES from '../../navigations/routes';
import { authRequestBodySchema } from '../../core/models';
import { useSigninMutation, useAppSelector } from '@/redux-store/hooks';
import { selectUser } from '@/redux-store/slices';
export default function LoginForm(props: {
  navigation: { goBack: () => void; navigate: (arg0: string) => void };
}) {
  const authState = useAppSelector(selectUser);
  const [showPass, setShowPass] = React.useState<boolean>(false);
  const [signIn, result] = useSigninMutation();
  const [credentials, setCredential] = React.useState<{
    email: string | undefined;
    password: string;
  }>({ password: '', email: '' });
  async function handleLogin() {
    try {
      const input = authRequestBodySchema.parse({ ...credentials });
      signIn(input);
    }
    catch {

    }
  }
  React.useEffect(() => {
    if (authState.status == 'signIn') {
      props.navigation.navigate(ROUTES.DASHBOARD_TABS_SCREEN);
    }
  }, [authState]);
  return (
    <View>
      <AppHeader
        onBack={() => {
          props.navigation.goBack();
        }}
        key={''}
        title="Login" />
      <View style={{ width: '100%', height: '100%', padding: 16 }}>
        <View style={{ marginBottom: 16 }}>
          <Text style={{ marginBottom: 8 }}>Email</Text>
          <AppTextInput
            label={'Email'}
            placeholder={'Email'}
            value={credentials.email}
            onChangeText={value => {
              setCredential({ ...credentials, email: value });
            }}
            left={
              <TextInput.Icon
                icon={'email-outline'}
              />
            }
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <Text style={{ marginBottom: 8 }}>Password</Text>
          <AppTextInput
            label={'Password'}
            secureTextEntry={showPass}
            placeholder="Password"
            value={credentials.password}
            onChangeText={value => {
              setCredential({ ...credentials, password: value });
            }}
            left={<TextInput.Icon icon="lock-outline" />}
            right={
              <TextInput.Icon
                icon="eye-outline"
                onPress={() => {
                  setShowPass(!showPass);
                }}
              />
            }
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
          <View style={{ height: 60, width: '90%', marginBottom: 8 }}>
            <AppButton
              onPress={() => {
                handleLogin();
              }}>
              Login
            </AppButton>
          </View>
          <View style={{ height: 60, width: '90%' }}>
            <AppButton
              onPress={() => {
                props.navigation.navigate(ROUTES.SIGNUP_FORM_SCREEN);
              }}
              mode="text">
              Have not signed up? Here ?
            </AppButton>
          </View>
          <View style={{ height: 60, width: '90%' }}>
            <AppButton
              onPress={() => {
                props.navigation.navigate(ROUTES.FORGOT_PASSWORD_FORM_SCREEN);
              }}
              mode="text">
              Forgot Password ?
            </AppButton>
          </View>
        </View>
      </View>
    </View>
  );
}
