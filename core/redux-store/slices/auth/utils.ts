import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_KEY } from '../../../models/auth/auth-model';
import { authInforSchema,authResponseModel } from '../../../models/auth/auth-model';
export const getToken = async () => {
  const res = await AsyncStorage.getItem(USER_KEY);
  try{
        const user = authInforSchema.parse(JSON.parse(res as string));
        return user;
  }
  catch{
    return null;
  }
};
export const removeToken = async () => {
  await AsyncStorage.removeItem(USER_KEY);
};
export const setToken = async (value: authResponseModel) => {
  console.log({value});
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(value));
};
