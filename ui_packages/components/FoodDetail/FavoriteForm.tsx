/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {Image, View, ScrollView, TouchableOpacity} from 'react-native';
import {Text, Icon} from 'react-native-paper';
import AppButton from '../Button/AppButton';
import AppTextInput from '../TextInput/TextInput';
import {foodMutaions} from '../../../core/services/food/mutations';
import AppMessage from '../Message/AppMessage';
import {setMessage} from '../../../core/store/message/messageSlice';
import {z as zod} from 'zod';
import {fromError} from 'zod-validation-error';
import { launchImageLibrary } from 'react-native-image-picker';
import { type FoodModel } from '../../../core/models/food/food-model';
interface IFavoriteFormProps {
  food?: FoodModel;
  thumbnail?: string;
  onBack: () => void;
  setAdded:any;
}
export default function FavoriteForm(props: IFavoriteFormProps) {
  const {food, thumbnail, onBack,setAdded} = props;
  const [description, setDescription] = React.useState<string>('');
  const [image, setImage] = React.useState<any>(null);
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
  async function addToFavorite() {
    const validate = formSchema.safeParse({
      description: description,
      thumbnail: thumbnail, // note: invalid email
    });
    if (validate.success) {
      const createdFood = await foodMutaions.createFood({
        ...food,
        servingWeight: 100,
        servingUnit: 'g',
      });
      console.log({createdFood});
      if (createdFood) {
        const createdFavorite = await foodMutaions.createFavoriteFood({
          food_id: createdFood.data.id,
          description: description,
          thumbnail: thumbnail,
        });
        setMessage({message:'Add to favorites successfully',type:'success'});
        setAdded(true);
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
            <AppButton>Upload</AppButton>
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
