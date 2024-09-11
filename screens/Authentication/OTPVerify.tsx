/* eslint-disable prettier/prettier */
import * as React from 'react';
import {View, Text} from 'react-native';
import AppHeader from '../../ui_packages/components/AppHeader/AppHeader';
// import AppSwitch from '../../ui_packages/components/Switch/Switch';
import AppButton from '../../ui_packages/components/Button/AppButton';
// import {useTheme} from 'react-native-paper';
import OTPTextView from 'react-native-otp-textinput';
import ROUTES from '../../navigations/routes';
export default function OTPVerify(props: {navigation: { goBack: () => void; navigate: (arg0: string) => void; }}) {
  //   const theme = useTheme();
  const [otp, setOtp] = React.useState<string>('');

  return (
    <View>
      <AppHeader
        onBack={() => {
          props.navigation.goBack();
        }}
        key={''}
        title="Verify OTP"></AppHeader>
      <View style={{width: '100%', height: '100%', padding: 16}}>
        {/* <View
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
        </View> */}
        <View style={{marginBottom: 16}}>
          <Text style={{marginBottom: 8}}>
            We have already sent you OTP code, please check and submi tit here!
          </Text>
        </View>
        <View>
          <OTPTextView
            inputCount={6}
            defaultValue={otp}
            handleTextChange={value => {
              setOtp(value);
            }}
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
            <AppButton onPress={() => {
                props.navigation.navigate(ROUTES.DASHBOARD_TABS_SCREEN);
              }}>Verify</AppButton>
          </View>
        </View>
      </View>
    </View>
  );
}
