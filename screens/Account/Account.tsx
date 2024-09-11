/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {View, Text} from 'react-native';
import {useTheme, Icon} from 'react-native-paper';
import AppButton from '../../ui_packages/components/Button/AppButton';
import {signOut, useAuth} from '../../store/auth/authSlice';
import {CommonActions} from '@react-navigation/native';
import ROUTES from '../../navigations/routes';
import AccountItem from './AccountItem';
import {accountItems} from './accountItems';
import AppMessage from '../../ui_packages/components/Message/AppMessage';
export default function Account(props: {
  navigation: {
    dispatch: (arg0: CommonActions.Action) => void;
    navigate: (arg: string) => void;
  };
}) {
  const theme = useTheme();
  const authState = useAuth();
  React.useEffect(() => {
    if (authState.status == 'signOut') {
      props.navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: ROUTES.INTRO_SCREEN}],
        }),
      );
    }
  }, [authState, props.navigation]);
  return (
    <View style={{width: '100%', height: '100%'}}>
      {/* <AppButton
        onPress={() => {
          signOut();
        }}>
        Logout
      </AppButton> */}
      <View
        style={{
          height: '40%',
          width: '100%',
          backgroundColor: theme.colors.secondary,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 32,
        }}>
        <View
          style={{
            backgroundColor: theme.colors.background,
            borderRadius: 100,
            padding: 16,
            marginBottom: 16,
          }}>
          <Icon size={40} source={'account'} />
        </View>
        <Text style={{color: '#FFFFFF', fontSize: 18, fontWeight: '700'}}>
          Hi, anbuibz54
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          padding: 16,
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
        {accountItems.map((c,indx) => {
          return (
            <View
              key={c.label}
              style={{width: '28%', marginRight: (indx+1)%3==0 ?0:28, marginBottom: 32}}>
              <AccountItem
                label={c.label}
                icon={c.icon}
                onClick={() => {
                  c.onClick(props.navigation);
                }}
              />
            </View>
          );
        })}
      </View>
      <AppMessage />
    </View>
  );
}
