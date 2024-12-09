import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


import Routes from './routes';
import { type RootBottomTabsParamList } from './BottomTabStack';
import BottomTabStack from './BottomTabStack';
import LoginForm from '../screens/Authentication/LoginForm';
import Intro from '../screens/Intro/Intro';
import Splash from '../screens/Splash/Splash';
import CreateNewAccount from '../screens/Authentication/CreateAccount';
import ForgetPass from '../screens/Authentication/ForgetPass';
import CreateNewPassword from '../screens/Authentication/CreateNewPassword';
import Profile from '../screens/Profile/Profile';
import OTPVerify from '../screens/Authentication/OTPVerify';
import RecipeDetail from '../screens/Recipes/RecipeDetail';
import NewRecipe from '../screens/Recipes/NewRecipe';
import ShopProfile from '../screens/Ecommerce/ShopProfile/ShopProfile';
import ShopManage from '../screens/Ecommerce/ShopRegister/ShopManage';
import ProductManage from '../screens/Ecommerce/ShopRegister/ProductManage';
import ProductDetail from '../screens/Product/ProductDetail/ProductDetail';
import Cart from '../screens/Cart/Cart';
import Checkout from '../screens/Checkout/Checkout';
import ProductList from '../screens/Product/ProductList/ProductList';
import TdeeForm from '../screens/TdeeInfor/TdeeForm';

export type RootStackParamList ={
  [Routes.DASHBOARD_TABS_SCREEN]: RootBottomTabsParamList,
  [Routes.SPLASH_SCREEN]:undefined,
  [Routes.INTRO_SCREEN]:undefined,
  [Routes.LOGIN_FORM_SCREEN]:undefined,
  [Routes.NEW_PASS_SCREEN]:undefined,
  [Routes.VERIFY_NUMBER_OTP_SCREEN]:undefined,
  [Routes.SIGNUP_FORM_SCREEN]:undefined,
  [Routes.FORGOT_PASSWORD_FORM_SCREEN]:undefined,
  [Routes.PROFILE]:undefined,
  [Routes.SHOP_PROFILE]:{shop:any} | undefined,
  [Routes.SHOP_MANAGE]:undefined,
  [Routes.PRODUCT_MANAGE]:undefined,
  [Routes.PRODUCT_DETAIL]:{product:any},
  [Routes.PRODUCT_LIST]:undefined,
  [Routes.TDEE_FORM]:undefined,
  [Routes.CART]:undefined,
  [Routes.CHECKOUT]:undefined,
  [Routes.RECIPE_DETAIL]:undefined,
  [Routes.NEW_RECIPE]:undefined
}
export function RootStack() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator
      initialRouteName={Routes.SPLASH_SCREEN}
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
      <Stack.Screen name={Routes.TDEE_FORM} component={TdeeForm} />
      <Stack.Screen name={Routes.CART} component={Cart} />
      <Stack.Screen name={Routes.CHECKOUT} component={Checkout} />

      <Stack.Screen
        name={Routes.DASHBOARD_TABS_SCREEN}
        component={BottomTabStack}
      />

      <Stack.Screen name={Routes.RECIPE_DETAIL} component={RecipeDetail} />
      <Stack.Screen name={Routes.NEW_RECIPE} component={NewRecipe} />
    </Stack.Navigator>
  );
}
