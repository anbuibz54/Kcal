/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import {View, TouchableOpacity, Image, ScrollView} from 'react-native';
import AppButton from '../../../ui_packages/components/Button/AppButton';
import {Icon, Text} from 'react-native-paper';
import AppHeader from '../../../ui_packages/components/AppHeader/AppHeader';
import AppTextInput from '../../../ui_packages/components/TextInput/TextInput';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {z as zod} from 'zod';
import {fromError} from 'zod-validation-error';
import 'react-native-get-random-values';
import uuid from 'react-native-uuid';
import {setMessage} from '../../../core/store/message/messageSlice';
import AppMessage from '../../../ui_packages/components/Message/AppMessage';
import Loading from '../../../ui_packages/components/AppLoading/Loading';
import {shopServices, storageServices} from '../../../core/services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_KEY} from '../../../core/store/auth/utils';
import ROUTES from '../../../navigations/routes';
export default function ShopManage(props: {
  navigation: {
    goBack: () => void;
    navigate: (arg: string) => void;
    push: (arg: string) => void;
  };
}) {
  const [previousAvatar, setPreviousAvatar] = React.useState<string>('');
  const [shop, setShop] = React.useState<{
    id: number;
    name: string;
    description: string;
    avatar: string;
  }>({
    id: 0,
    name: '',
    description: '',
    avatar: '',
  });
  const [loading, setLoading] = React.useState<boolean>(false);
  async function initial() {
    const json = await AsyncStorage.getItem(USER_KEY);
    if (json) {
      const user = JSON.parse(json);
      if (user?.shops) {
        setShop(user.shops);
        setPreviousAvatar(user.shops.avatar);
      }
    } else {
      props.navigation.navigate(ROUTES.INTRO_SCREEN);
    }
  }
  async function handleS3Upload(path: string) {
    const file = await fetch(path);
    const data = await file.blob();
    const uploadUrl = await storageServices.S3Upload({
      bucket: 'kcal',
      key: `${uuid.v4()}.jpeg`,
      data: data,
      type: data.type,
    });
    return uploadUrl;
  }
  async function handleS3Delete(url: string) {
    const key = url.replace('https://bilesoft.org/', '');
    await storageServices.S3Delete({bucket: 'kcal', key: key});
  }
  async function handleLocalUpload() {
    const res = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
    });
    if (!res.didCancel && !!res.assets) {
      setShop({...shop, avatar: res.assets[0].uri as string});
    }
  }
  async function handleCreateShop() {
    const uploadedAvatar = await handleS3Upload(shop.avatar);
    const input = {...shop, avatar: uploadedAvatar};
    const response = await shopServices.createShop(input);
    if (response) {
      setMessage({message: 'Create shop successfully', type: 'success'});
    } else {
      setMessage({message: 'Create shop failed', type: 'error'});
    }
  }
  async function handleUpdateShop() {
    if (previousAvatar !== shop.avatar) {
      await handleS3Delete(previousAvatar);
    }
    const uploadedAvatar = await handleS3Upload(shop.avatar);
    const input = {...shop, avatar: uploadedAvatar};
    const response = await shopServices.updateShop(input);
    if (response) {
      setMessage({message: 'Update shop successfully', type: 'success'});
    } else {
      setMessage({message: 'Update shop failed', type: 'error'});
    }
  }
  async function handleManageShop() {
    setLoading(true);
    const shopSchema = zod.object({
      name: zod.string().min(1, 'Name is required'),
      description: zod.string().min(10, 'Description is required'),
      avatar: zod.string().min(1, 'Avatar is required'),
    });
    const validate = shopSchema.safeParse(shop);
    if (validate.success) {
      if (shop?.id) {
        await handleUpdateShop();
      } else {
        await handleCreateShop();
      }
      props.navigation.push(ROUTES.SHOP_PROFILE);
    } else {
      if (validate.error) {
        const validationError = fromError(validate.error);
        setMessage({message: validationError.toString(), type: 'error'});
      }
    }
    setLoading(false);
  }
  React.useEffect(() => {
    initial();
  }, []);
  return (
    <View style={{width: '100%', height: '100%'}}>
      <AppHeader title={'Shop Manage'} onBack={() => {}} />
      <ScrollView style={{width: '100%', height: '100%', padding: 16}}>
        <View style={{width: '100%', marginBottom: 16}}>
          <Text style={{fontSize: 18, fontWeight: '700', marginBottom: 16}}>
            Shop name
          </Text>
          <AppTextInput
            value={shop.name}
            onChangeText={(text: string) => {
              setShop(prev => ({...prev, name: text}));
            }}
          />
        </View>
        <View style={{width: '100%', marginBottom: 16}}>
          <Text style={{fontSize: 18, fontWeight: '700', marginBottom: 16}}>
            Shop Description
          </Text>
          <AppTextInput
            multiline
            numberOfLines={6}
            value={shop.description}
            onChangeText={(text: string) => {
              setShop(prev => ({...prev, description: text}));
            }}
          />
        </View>
        <View style={{width: '100%', marginBottom: 32}}>
          <Text style={{fontSize: 18, fontWeight: '700', marginBottom: 16}}>
            Shop Avatar
          </Text>
          {!!shop.avatar && (
            <Image
              src={shop.avatar}
              style={{height: 200, aspectRatio: 1, marginBottom: 16}}
            />
          )}
          {!shop.avatar && (
            <View
              style={{
                height: 200,
                aspectRatio: 1,
                marginBottom: 16,
                borderWidth: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>Import Image here</Text>
            </View>
          )}
          <View style={{width: '40%'}}>
            <AppButton
              onPress={async () => {
                await handleLocalUpload();
              }}>
              Upload Avatar
            </AppButton>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <AppButton
            onPress={async () => {
              await handleManageShop();
            }}>
            {shop.id ? 'Update' : 'Create'} Shop
          </AppButton>
        </View>
      </ScrollView>
      {loading && <Loading />}
    </View>
  );
}
