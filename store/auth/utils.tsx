/* eslint-disable prettier/prettier */

import AsyncStorage from '@react-native-async-storage/async-storage';

export const USER_KEY = 'user';
export type TokenType = {
  access: string;
  refresh: string;
};
export type UserType = {
  id: number | null;
  phone: string | null;
  email: string | null;
  password: string | null;
};
export const getToken = async () => {
  const res = await AsyncStorage.getItem(USER_KEY);
  if (!!res) {
    return JSON.parse(res);
  } else return null;
};
export const removeToken = async () => {
  await AsyncStorage.removeItem(USER_KEY);
};
export const setToken = async (value: UserType) => {
  console.log({value});
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(value));
};
