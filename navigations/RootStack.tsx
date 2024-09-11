/* eslint-disable prettier/prettier */
import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon, useTheme} from 'react-native-paper';
import Routes from './routes';
import LoginForm from '../screens/Authentication/LoginForm';
import Home from '../screens/Home/Home';
import Intro from '../screens/Intro/Intro';
import BottomTabs from '../ui_packages/components/BottomTab';
import Splash from '../screens/Splash/Splash';
import CreateNewAccount from '../screens/Authentication/CreateAccount';
import ForgetPass from '../screens/Authentication/ForgetPass';
import CreateNewPassword from '../screens/Authentication/CreateNewPassword';
import SearchingFood from '../screens/SearchingFood/SearchingFood';
import ScanningFood from '../screens/ScanningFood/ScanningFood';
import Profile from '../screens/Profile/Profile';
import Favorites from '../screens/Favorites/Favorites';
import OTPVerify from '../screens/Authentication/OTPVerify';
import RecipeDetail from '../screens/Recipes/RecipeDetail';
import NewRecipe from '../screens/Recipes/NewRecipe';
import Account from '../screens/Account/Account';
import ShopProfile from '../screens/Ecommerce/ShopProfile/ShopProfile';
import ShopManage from '../screens/Ecommerce/ShopRegister/ShopManage';
import ProductManage from '../screens/Ecommerce/ShopRegister/ProductManage';
import ProductDetail from '../screens/Product/ProductDetail/ProductDetail';
import Cart from '../screens/Cart/Cart';
import Checkout from '../screens/Checkout/Checkout';
import ProductList from '../screens/Product/ProductList/ProductList';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function BottomTabsVariant() {
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
export function RootStack() {
  return (
    <Stack.Navigator
      // initialRouteName={Config.SELECTED_VARIANT}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Routes.SPLASH_SCREEN} component={Splash} />

      {/*Variant1*/}
      <Stack.Screen name={Routes.INTRO_SCREEN} component={Intro} />
      <Stack.Screen name={Routes.LOGIN_FORM_SCREEN} component={LoginForm} />
      <Stack.Screen
        name={Routes.FORGOT_PASSWORD_FORM_SCREEN}
        component={ForgetPass}
      />
      <Stack.Screen
        name={Routes.NEW_PASS_SCREEN}
        component={CreateNewPassword}
      />
      <Stack.Screen
        name={Routes.SIGNUP_FORM_SCREEN}
        component={CreateNewAccount}
      />
      <Stack.Screen
        name={Routes.VERIFY_NUMBER_OTP_SCREEN}
        component={OTPVerify}
      />
      <Stack.Screen name={Routes.PROFILE} component={Profile} />
      <Stack.Screen name={Routes.SHOP_PROFILE} component={ShopProfile} />
      <Stack.Screen name={Routes.SHOP_MANAGE} component={ShopManage} />
      <Stack.Screen name={Routes.PRODUCT_MANAGE} component={ProductManage} />
      <Stack.Screen name={Routes.PRODUCT_DETAIL} component={ProductDetail} />
      <Stack.Screen name={Routes.PRODUCT_LIST} component={ProductList} />

      <Stack.Screen name={Routes.CART} component={Cart} />
      <Stack.Screen name={Routes.CHECKOUT} component={Checkout} />

      <Stack.Screen
        name={Routes.DASHBOARD_TABS_SCREEN}
        component={BottomTabsVariant}
      />

      <Stack.Screen name={Routes.RECIPE_DETAIL} component={RecipeDetail} />
      <Stack.Screen name={Routes.NEW_RECIPE} component={NewRecipe} />
    </Stack.Navigator>
  );
}
