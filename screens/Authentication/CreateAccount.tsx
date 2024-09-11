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
import ROUTES from '../../navigations/routes';
export default function CreateNewAccount(props: {
  navigation: {goBack: () => void; navigate: (arg0: string) => void};
}) {
  const theme = useTheme();
  const [showPass, setShowPass] = React.useState<boolean>(false);
  const [usePhone, setUsePhone] = React.useState<boolean>(true);
  const [credentials, setCredential] = React.useState<{
    phone: string | undefined;
    email: string | undefined;
    password: string;
  }>({phone: '', password: '', email: ''});
  const validateInput = () => {
    if (
      (credentials.email != '' || credentials.phone != '') &&
      credentials.password != ''
    )
      return true;
    else return false;
  };
  async function handleSingup() {
    if (!!validateInput) {
      const input = {...credentials};
      if(input.email=='') delete input.email;
      if(input.phone=='') delete input.phone;
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
          <AppSwitch
            value={usePhone}
            onValueChange={(value: boolean) => setUsePhone(value)}
          />
        </View>
        <View style={{marginBottom: 16}}>
          <Text style={{marginBottom: 8}}>Phone</Text>
          <AppTextInput
            label={usePhone ? 'Phone' : 'Email'}
            placeholder={usePhone ? 'Phone' : 'Email'}
            value={usePhone ? credentials.phone : credentials.email}
            onChangeText={value => {
              if (usePhone) {
                setCredential({...credentials, phone: value});
              } else {
                setCredential({...credentials, email: value});
              }
            }}
            left={
              <TextInput.Icon
                icon={usePhone ? 'phone-outline' : 'email-outline'}
              />
            }
          />
        </View>
        <View style={{marginBottom: 16}}>
          <Text style={{marginBottom: 8}}>Phone</Text>
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
