/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useCameraPermission, useCameraDevice} from 'react-native-vision-camera';
import {Camera} from 'react-native-vision-camera';
import Loading from './Loading';
import {GoogleGenerativeAI} from '@google/generative-ai';
import AppButton from '../../ui_packages/components/Button/AppButton';
import FoodDetail from '../../ui_packages/components/FoodDetail/FoodDetail';
import S3Upload from '../../core/services/storage/upload';
import S3Delete from '../../core/services/storage/delete';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import 'react-native-get-random-values';
import uuid from 'react-native-uuid';
export default function ScanningFood() {
  const camera = React.useRef<Camera>(null);
  const device = useCameraDevice('back', {
    physicalDevices: [
      'ultra-wide-angle-camera',
      'wide-angle-camera',
      'telephoto-camera',
    ],
  });
  const {hasPermission, requestPermission} = useCameraPermission();
  const [food, SetFood] = React.useState<any>(null);
  const [image, setImage] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [added, setAdded] = React.useState<boolean>(false);
  async function scanning(path: string) {
    const file = await fetch(path);
    const data = await file.blob();
    //@ts-ignore
    const result = await model.generateContent([prompts, imageParts]);
    const response = await result.response;
    const text = response.text();
    console.log({text});
    if (!!text && text != 'null') {
      SetFood(JSON.parse(text));
      const uploladUrl = await S3Upload({
        bucket: 'kcal',
        key: `${uuid.v4()}.jpeg`,
        data: data,
        type: data.type,
      });
      setImage(uploladUrl);
      console.log({uploladUrl});
    }
    setLoading(false);
  }
  async function handleTakePhoto() {
    if (!!camera.current) {
      const res = await camera.current.takePhoto();
      await scanning(`file://${res.path}`);
    }
  }
  async function handleUpload() {
    setLoading(true);
    const res = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
    });
    if (!res.didCancel && !!res.assets) {
      await scanning(res.assets[0].uri as string);
    }
  }
  async function handleCloseDetail() {
    if (!added) {
      setLoading(true);
      const key = image.replace('https://bilesoft.org/', '');
      await S3Delete({bucket: 'kcal', key: key});

      setLoading(false);
    }
    SetFood(null);
    setImage(null);
  }
  React.useEffect(() => {
    requestPermission();
  }, [requestPermission]);
  if (!hasPermission) return <View></View>;
  if (device == null) return <View></View>;
  return (
    <View style={StyleSheet.absoluteFill}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
        photoQualityBalance="quality"
      />
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          height: 100,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            handleTakePhoto();
          }}
          style={{
            height: 100,
            width: 100,
            borderRadius: 100,
            backgroundColor: '#FFFFFF',
            padding: 32,
          }}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          height: 100,
          width: '30%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <AppButton
          onPress={async () => {
            await handleUpload();
          }}>
          Upload
        </AppButton>
      </View>
      {!!food && !!image && (
        <FoodDetail
          setAdded={setAdded}
          food={{...food}}
          thumbnail={image}
          onClose={async () => {
            await handleCloseDetail();
          }}
        />
      )}
      {loading && <Loading />}
    </View>
  );
}
