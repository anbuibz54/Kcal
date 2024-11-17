/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
import S3Upload from '../../../core/services/storage/upload';
import S3Delete from '../../../core/services/storage/delete';
import {setMessage} from '../../../core/store/message/messageSlice';
import AppMessage from '../../../ui_packages/components/Message/AppMessage';
import Loading from '../../ScanningFood/Loading';
import ROUTES from '../../../navigations/routes';
import {productMutations} from '../../../core/services/product/mutations';
import type { RootStackParamList } from '../../../navigations/RootStack';
import { StackScreenProps } from '@react-navigation/stack';

type Props= StackScreenProps<RootStackParamList,'product_manage'>;
interface IProductManage {
  id: number;
  name: string;
  description: string;
  shop_id?: number;
  price: number;
  images: string[];
}
export default function ProductManage(props: Props) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [toUpImages, setToUpImages] = React.useState<string[]>([]);
  const [toDeleteImages, setToDeleteImages] = React.useState<string[]>([]);
  const [product, setProduct] = React.useState<IProductManage>({
    name: '',
    id: 0,
    description: '',
    price: 0,
    images: [],
  });
  async function handleS3Upload(path: string) {
    const file = await fetch(path);
    const data = await file.blob();
    const uploadUrl = await S3Upload({
      bucket: 'kcal',
      key: `${uuid.v4()}.jpeg`,
      data: data,
      type: data.type,
    });
    return uploadUrl;
  }
  async function handleS3Delete(url: string) {
    const key = url.replace('https://bilesoft.org/', '');
    await S3Delete({bucket: 'kcal', key: key});
  }
  async function handleLocalUpload() {
    const res = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
    });
    if (!res.didCancel && !!res.assets) {
      const images = [...product.images];
      images.push(res.assets[0].uri as string);
      const toUps = [...toUpImages];
      toUps.push(res.assets[0].uri as string);
      setToUpImages([...toUps]);
      setProduct({...product, images: [...images]});
    }
  }
  function handleRemoveImage(image: string) {
    const images = [...product.images];
    const toUps = [...toUpImages];
    const index = images.findIndex(i => i == image);
    const upIndex = toUps.findIndex(i => i == image);
    const removes = images.splice(index, 1);
    if (removes[0].includes('https://bilesoft.org/')) {
      const toDeletes = [...toDeleteImages];
      toDeletes.push(removes[0]);
      setToDeleteImages([...toDeletes]);
    }
    toUps.splice(upIndex, 1);
    setToUpImages([...toUps]);
    setProduct({...product, images: [...images]});
  }
  async function handleCreateProduct() {
    const uploadImages = new Array<string>();
    for (var i = 0; i < toUpImages.length; i++) {
      const url = await handleS3Upload(toUpImages[i]);
      if (!!url) {
        uploadImages.push(url);
      }
    }
    console.log({toUpImages, uploadImages});
    const input = {...product, images: uploadImages};
    const response = await productMutations.createProduct(input);
    if (!!response) {
      setMessage({message: 'Create product successfully', type: 'success'});
    } else {
      setMessage({message: 'Create product failed', type: 'error'});
    }
  }
  async function handleUpdateProduct() {
    const uploadImages = new Array<string>();
    for (var i = 0; i < toUpImages.length; i++) {
      const url = await handleS3Upload(toUpImages[i]);
      if (!!url) {
        uploadImages.push(url);
      }
    }
    for (var i = 0; i < toDeleteImages.length; i++) {
      await handleS3Delete(toDeleteImages[i]);
    }
    const oldImages = product.images.filter(i =>
      i.includes('https://bilesoft.org/'),
    );
    const input = {...product, images: [...oldImages, ...uploadImages]};
    const response = await productMutations.updateProduct(input);
    if (!!response) {
      setMessage({message: 'Update product successfully', type: 'success'});
    } else {
      setMessage({message: 'Update product failed', type: 'error'});
    }
  }
  async function handleManageProduct() {
    setLoading(true);
    const productSchema = zod.object({
      name: zod.string().min(1, 'Name is required'),
      description: zod.string().min(10, 'Description is required'),
      images: zod.string().array().min(1, 'Avatar is required'),
      price: zod.number().min(1, 'price must be greater than 0'),
    });
    const validate = productSchema.safeParse(product);
    if (validate.success) {
      if (!!product?.id) {
        await handleUpdateProduct();
      } else {
        await handleCreateProduct();
      }
      setProduct({
        name: '',
        id: 0,
        description: '',
        price: 0,
        images: [],
      });
      props.navigation.push(ROUTES.SHOP_PROFILE);
    } else {
      if (!!validate.error) {
        const validationError = fromError(validate.error);
        setMessage({message: validationError.toString(), type: 'error'});
      }
    }
    setLoading(false);
  }
  return (
    <View style={{width: '100%', height: '100%'}}>
      <AppHeader title={'Product Manage'} onBack={() => {}} />
      <ScrollView style={{width: '100%', height: '100%', padding: 16}}>
        <View style={{width: '100%', marginBottom: 16}}>
          <Text style={{fontSize: 18, fontWeight: '700', marginBottom: 16}}>
            Product name
          </Text>
          <AppTextInput
            value={product.name}
            onChangeText={text => {
              setProduct({...product, name: text});
            }}
          />
        </View>
        <View style={{width: '100%', marginBottom: 16}}>
          <Text style={{fontSize: 18, fontWeight: '700', marginBottom: 16}}>
            Product Description
          </Text>
          <AppTextInput
            value={product.description}
            onChangeText={text => {
              setProduct({...product, description: text});
            }}
            multiline
            numberOfLines={6}
          />
        </View>
        <View style={{width: '100%', marginBottom: 32}}>
          <Text style={{fontSize: 18, fontWeight: '700', marginBottom: 16}}>
            Shop Image
          </Text>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              flexWrap: 'wrap',
              marginBottom: 16,
            }}>
            {product.images.length > 0 &&
              product.images.map((image: string, index: number) => {
                return (
                  <View style={{position: 'relative'}} key={index}>
                    <Image
                      src={image}
                      style={{height: 100, aspectRatio: 1, marginBottom: 16}}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        handleRemoveImage(image);
                      }}
                      style={{position: 'absolute', top: 0, right: 0}}>
                      <Icon
                        source="close-circle-outline"
                        size={40}
                        color="#FFFFFF"
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
            {product.images.length == 0 && <Text>No images</Text>}
          </View>
          <View style={{width: '40%'}}>
            <AppButton
              onPress={() => {
                handleLocalUpload();
              }}>
              Upload Image
            </AppButton>
          </View>
        </View>
        <View style={{width: '100%', marginBottom: 32}}>
          <Text style={{fontSize: 18, fontWeight: '700', marginBottom: 16}}>
            Product Price
          </Text>
          <AppTextInput
            value={String(product.price)}
            onChangeText={text => {
              setProduct({...product, price: Number(text)});
            }}
          />
        </View>
        <View
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}>
          <AppButton
            onPress={async () => {
              await handleManageProduct();
            }}>
            {!!product.id ? 'Update' : 'Create'} Shop
          </AppButton>
        </View>
      </ScrollView>
      <AppMessage />
      {loading && <Loading />}
    </View>
  );
}
