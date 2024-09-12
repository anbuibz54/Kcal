/* eslint-disable prettier/prettier */
import * as React from 'react';
import {View, Text} from 'react-native';
import AppHeader from '../../ui_packages/components/AppHeader/AppHeader';
import AppSwitch from '../../ui_packages/components/Switch/Switch';
import AppTextInput from '../../ui_packages/components/TextInput/TextInput';
import AppButton from '../../ui_packages/components/Button/AppButton';
import {useTheme, TextInput} from 'react-native-paper';
import {signIn} from '../../store/auth/authSlice';
import {authMutaions} from '../../services/auth/mutations';
import inputRules from '../../utils/form-validation';
import ROUTES from '../../navigations/routes';
export default function CreateNewAccount(props: {
  navigation: {goBack: () => void; navigate: (arg0: string) => void};
}) {
  const theme = useTheme();
  const [showPass, setShowPass] = React.useState<boolean>(false);
  const [credentials, setCredential] = React.useState<{
    email: string | undefined;
    password: string;
  }>({ password: '', email: ''});
  const validateInput = () => {
    if (
       inputRules.isValidEmail(credentials.email as string)  &&
      inputRules.isValidPassword(credentials.password as string)
    )
      return true;
    else return false;
  };
  async function handleSingup() {
    if (validateInput()) {
      const input = {...credentials};
      if(input.email=='') delete input.email;
      const signUpRes = await authMutaions.createUser({...input});
      if (!!signUpRes) {
        signIn(signUpRes);
        props.navigation.navigate(ROUTES.DASHBOARD_TABS_SCREEN);
      }
    }
  }
  return (
    <View>
      <AppHeader
        onBack={() => {
          props.navigation.goBack();
        }}
        key={''}
        title="Create new account"></AppHeader>
      <View style={{width: '100%', height: '100%', padding: 16}}>
        <View style={{marginBottom: 16}}>
          <Text style={{marginBottom: 8}}>Email</Text>
          <AppTextInput
            label={'Email'}
            placeholder={'Email'}
            value={credentials.email}
            onChangeText={value => {
                setCredential({...credentials, email: value});
            }}
            left={
              <TextInput.Icon
                icon={'email-outline'}
              />
            }
          />
        </View>
        <View style={{marginBottom: 16}}>
          <Text style={{marginBottom: 8}}>Password</Text>
          <AppTextInput
            label={'Password'}
            secureTextEntry={showPass}
            placeholder="Password"
            value={credentials.password}
            onChangeText={value => {
              setCredential({...credentials, password: value});
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
          <View style={{height: 60, width: '90%', marginBottom: 8}}>
            <AppButton
              onPress={() => {
                handleSingup();
              }}>
              Sign Up
            </AppButton>
          </View>
        </View>
      </View>
    </View>
  );
}
