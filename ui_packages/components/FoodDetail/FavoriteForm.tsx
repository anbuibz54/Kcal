/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {Image, View, ScrollView, TouchableOpacity} from 'react-native';
import {Text, Icon} from 'react-native-paper';
import AppButton from '../Button/AppButton';
import AppTextInput from '../TextInput/TextInput';
import {foodServices, favoriteFoodServices, storageServices} from '@/services';
import AppMessage from '../Message/AppMessage';
import {setMessage} from '../../../core/store/message/messageSlice';
import {z as zod} from 'zod';
import {fromError} from 'zod-validation-error';
import { launchImageLibrary } from 'react-native-image-picker';
import { type FoodModel } from '@/models';
import { convertImageToBase64 } from '@/utils/imge-to-base64';
import uuid from 'react-native-uuid';
import { R2_PUBLIC_DOMAIN } from '@global-vars/s3-instances';
interface IFavoriteFormProps {
  food?: FoodModel;
  thumbnail?: string;
  onBack: () => void;
}
export default function FavoriteForm(props: IFavoriteFormProps) {
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
    const img64 = await convertImageToBase64(data);
    const imageUrl = await storageServices.S3Upload({
      bucket: 'kcal',
      key: `${uuid.v4()}.jpeg`,
      data: img64,
      type: file.type,
    });
    return imageUrl;
    }
    else{
      return image;
    }
  }
  async function addToFavorite() {
    const validate = formSchema.safeParse({
      description: description,
      thumbnail: thumbnail ? thumbnail : image,
    });
    if (validate.success) {
      const imageUrl = await hanldeS3Upload();
      const createdFood = await foodServices.createFood({
        ...food,
        servingWeight: 100,
        servingUnit: 'g',
      });
      console.log({createdFood});
      if (createdFood) {
        const createdFavorite = await favoriteFoodServices.createFood({
          foodId: createdFood.data.id,
          description: description,
          thumbnail: imageUrl,
        });
        if(createdFavorite?.isSuccess){
          console.log({createdFavorite});
          setMessage({message:'Add to favorites successfully',type:'success'});
        }
      }
    } else {
      if (validate.error) {
        const validationError = fromError(validate.error);
        setMessage({message: validationError.toString(), type: 'error'});
      }
    }
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
            onBack();
          }}>
          Add to Favorites
        </AppButton>
      </View>
      <AppMessage />
    </ScrollView>
  );
}
