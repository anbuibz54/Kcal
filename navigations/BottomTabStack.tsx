/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon, useTheme} from 'react-native-paper';
import Home from '../screens/Home/Home';
import SearchingFood from '../screens/SearchingFood/SearchingFood';
import ScanningFood from '../screens/ScanningFood/ScanningFood';
import Favorites from '../screens/Favorites/Favorites';
import Account from '../screens/Account/Account';
import BottomTabs from '../ui_packages/components/BottomTab';
import Routes from './routes';

export type RootBottomTabsParamList = {
    [Routes.HOME_VARIANT]: undefined;
    [Routes.SEARCHING_FOOD]: undefined;
    [Routes.SCANNING_FOOD]: undefined;
    [Routes.FAVORITES]: undefined;
    [Routes.ACCOUNT]: undefined;
  };
export default function BottomTabsVariant() {
    const Tab = createBottomTabNavigator<RootBottomTabsParamList>();
    const theme = useTheme();
    return (
      <Tab.Navigator
        sceneContainerStyle={{
          backgroundColor: theme.colors.background,
        }}
        screenOptions={{headerShown: false}}
        tabBar={(props: any) => <BottomTabs {...props} />}>
        <Tab.Screen
          name={Routes.HOME_VARIANT}
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size, focused}) => {
              return (
                <Icon
                  source={focused ? 'home' : 'home-outline'}
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name={Routes.SEARCHING_FOOD}
          component={SearchingFood}
          options={{
            tabBarLabel: 'Seach',
            tabBarIcon: ({color, size, focused}) => {
              return (
                <Icon
                  source={focused ? 'text-box-search' : 'text-box-search-outline'}
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name={Routes.SCANNING_FOOD}
          component={ScanningFood}
          options={{
            tabBarLabel: 'Scan',
            tabBarIcon: ({color, size, focused}) => {
              return (
                <Icon
                  source={focused ? 'camera' : 'camera-outline'}
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name={Routes.FAVORITES}
          component={Favorites}
          options={{
            tabBarLabel: 'Favorites',
            tabBarIcon: ({color, size, focused}) => {
              return (
                <Icon
                  source={focused ? 'heart' : 'heart-outline'}
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name={Routes.ACCOUNT}
          component={Account}
          options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({color, size, focused}) => {
              return (
                <Icon
                  source={focused ? 'account' : 'account-outline'}
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    );
  }
