/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import {View, Text} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import ROUTES from '../../navigations/routes';
import { useAppSelector, useAppDispatch,selectUser,hydrate } from '@/redux-store';
export default function Splash(props: {
  navigation: {dispatch: (arg0: CommonActions.Action) => void};
}) {
  const authState = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  function decideRedirection() {
    if (authState.status == 'signIn') {
      props.navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: ROUTES.DASHBOARD_TABS_SCREEN}],
        }),
      );
    } else if (authState.status == 'logOut') {
      props.navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: ROUTES.INTRO_SCREEN}],
        }),
      );
    }
  }
  React.useEffect(() => {
    dispatch(hydrate());
  }, []);
  React.useEffect(() => {
    decideRedirection();
  }, [authState]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#70b9be',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{color: '#FFFFFF', fontSize: 50, fontWeight: '600'}}>
        kcal
      </Text>
    </View>
  );
}
