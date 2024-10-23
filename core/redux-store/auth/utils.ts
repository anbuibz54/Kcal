
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_KEY } from '../../models/auth/auth-model';
import { userGetResponseModel, userGetResponseSchema } from '../../models/user/user-models';
export const getToken = async () => {
  const res = await AsyncStorage.getItem(USER_KEY);
  try{
        const user = userGetResponseSchema.parse(JSON.parse(res as string));
        return user;
  }
  catch{
    return null;
  }
};
export const removeToken = async () => {
  await AsyncStorage.removeItem(USER_KEY);
};
export const setToken = async (value: userGetResponseModel) => {
  console.log({value});
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(value));
};
