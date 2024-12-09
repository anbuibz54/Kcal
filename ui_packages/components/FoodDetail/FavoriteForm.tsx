/* eslint-disable react-native/no-inline-styles */

import * as React from 'react';
import {Image, View, ScrollView, TouchableOpacity} from 'react-native';
import {Text, Icon} from 'react-native-paper';
import AppButton from '../Button/AppButton';
import AppTextInput from '../TextInput/TextInput';
import {foodServices, favoriteFoodServices, storageServices} from '@/services';
import { useAppDispatch, showAlert } from '@/redux-store';
import {z as zod} from 'zod';
import {fromError} from 'zod-validation-error';
import { launchImageLibrary } from 'react-native-image-picker';
import { type FoodModel } from '@/models';
import uuid from 'react-native-uuid';
import { R2_PUBLIC_DOMAIN } from '@global-vars/s3-instances';
import Loading from '../AppLoading/Loading';
interface IFavoriteFormProps {
  food?: FoodModel;
  thumbnail?: string;
  onBack: () => void;
}
export default function FavoriteForm(props: IFavoriteFormProps) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState<boolean>(false);
  const {food, thumbnail, onBack} = props;
  const [description, setDescription] = React.useState<string>('');
  const [image, setImage] = React.useState<string>('');
  const formSchema = zod.object({
    description: zod.string().min(1),
    thumbnail: zod.string().min(1),
  });
  async function handleUpload() {
    const res = await launchImageLibrary({
      mediaType: 'photo',
    });
    if (!res.didCancel && !!res.assets) {
      const imageUri = res.assets[0].uri as string;
      setImage(imageUri);
    }
  }
  async function hanldeS3Upload(){
    const path = image ? image : props.thumbnail;
    if(path && !path.includes(R2_PUBLIC_DOMAIN)){
    const file = await fetch(path);
    const data = await file.blob();
    const imageUrl = await storageServices.S3Upload({
      bucket: 'kcal',
      key: `${uuid.v4()}.jpeg`,
      data: data,
      type: data.type,
    });
    return imageUrl;
    }
    else{
      return image;
    }
  }
  async function createFavorite(id: number, imageUrl: string){
    const createdFavorite = await favoriteFoodServices.createFood({
      foodId: id,
      description: description,
      thumbnail: imageUrl,
    });
    if(createdFavorite?.isSuccess){
     dispatch( showAlert({message:'Add to favorites successfully',type:'success'}));
     onBack();
    }
  }
  async function addToFavorite() {
    setLoading(true);
    try{
      const validate = formSchema.safeParse({
        description: description,
        thumbnail: thumbnail ? thumbnail : image,
      });
      if (validate.success) {
        const imageUrl = await hanldeS3Upload();
        if(!food?.id){
          const createdFood = await foodServices.createFood({
            ...food,
            servingWeight: 100,
            servingUnit: 'g',
          });
          if (createdFood) {
            await createFavorite(createdFood.data.id as number,imageUrl as string);
          }
        }
        else{
          await createFavorite(food.id as number,imageUrl as string);
        }
      } else {
        if (validate.error) {
          const validationError = fromError(validate.error);
          dispatch(showAlert({message: validationError.toString(), type: 'error'}));
        }
      }
    }
    catch{
      dispatch(showAlert({message: 'Add to Favorites failed', type: 'error'}));
    }
    setLoading(false);
  }
  return (
    <ScrollView
      style={{width: '100%', height: '90%', position: 'relative', padding: 16}}>
      <TouchableOpacity
        style={{marginVertical: 16, marginLeft: 16}}
        onPress={() => {
          onBack();
        }}>
        <Icon source={'arrow-left'} size={40} />
      </TouchableOpacity>
      <View style={{width: '100%', marginBottom: 16}}>
        <Text style={{fontSize: 20, fontWeight: '700', marginBottom: 16}}>
          Thumbnail
        </Text>
        {(thumbnail || image) && (
          <Image
            style={{
              height: 150,
              width: '100%',
              borderRadius: 40,
              marginBottom: 16,
            }}
            source={{
              uri:thumbnail
              ? thumbnail
              : image
              ? image
              : 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            }}
          />
        )}
        {!thumbnail && (
          <View style={{width: '40%'}}>
            <AppButton onPress={handleUpload}>Upload Thumbnail</AppButton>
          </View>
        )}
      </View>
      <View style={{width: '100%', marginBottom: 16}}>
        <Text style={{fontSize: 20, fontWeight: '700', marginBottom: 16}}>
          Description
        </Text>
        <AppTextInput
          value={description}
          onChangeText={text => {
            setDescription(text);
          }}
        />
      </View>
      <View style={{width: '100%', marginBottom: 40}}>
        <AppButton
          onPress={async () => {
            await addToFavorite();
          }}>
          Add to Favorites
        </AppButton>
      </View>
      {loading && <Loading />}
    </ScrollView>
  );
}
