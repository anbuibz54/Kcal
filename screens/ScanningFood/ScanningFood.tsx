/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useCameraPermission, useCameraDevice } from 'react-native-vision-camera';
import { Camera } from 'react-native-vision-camera';
import Loading from '../../ui_packages/components/AppLoading/Loading';
import AppButton from '../../ui_packages/components/Button/AppButton';
import FoodDetail from '../../ui_packages/components/FoodDetail/FoodDetail';
import { type FoodModel } from '@/models';
import { launchImageLibrary } from 'react-native-image-picker';
import { convertImageToBase64 } from '../../core/utils/imge-to-base64';
import 'react-native-get-random-values';
import { foodServices } from '@/services';
export default function ScanningFood() {
  const camera = React.useRef<Camera>(null);
  const device = useCameraDevice('back', {
    physicalDevices: [
      'ultra-wide-angle-camera',
      'wide-angle-camera',
      'telephoto-camera',
    ],
  });
  const { hasPermission, requestPermission } = useCameraPermission();
  const [food, setFood] = React.useState<FoodModel | null>(null);
  const [image, setImage] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  async function scanning(path: string) {
    setLoading(true);
    try {
      const file = await fetch(path);
      const data = await file.blob();
      const img64 = await convertImageToBase64(data);
      const scanRes = await foodServices.analyzeFood({ image: img64, mimeType: data.type });
      if (scanRes.data
      ) {
        setFood(scanRes.data);
      }
      setLoading(false);
    }
    catch {
      setLoading(false);
    }
  }
  async function handleTakePhoto() {
    if (camera.current) {
      const res = await camera.current.takePhoto();
      const imageUri = `file://${res.path}`;
      await scanning(imageUri);
      setImage(imageUri);
    }
  }
  async function handleUpload() {
    setLoading(true);
    const res = await launchImageLibrary({
      mediaType: 'photo',
    });
    if (!res.didCancel && !!res.assets) {
      const imageUri = res.assets[0].uri as string;
      await scanning(imageUri);
      setImage(imageUri);
    }
  }
  async function handleCloseDetail() {
    setFood(null);
    setImage(null);
  }
  React.useEffect(() => {
    requestPermission();
  }, [requestPermission]);
  React.useEffect(()=>{
    return ()=>{
      setFood(null);
      setImage(null);
      setLoading(false);
    };
  },[]);
  if (!hasPermission) { return <View />; }
  if (device == null) { return <View />; }
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
          disabled={loading}
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
          disabled={loading}
          onPress={async () => {
            await handleUpload();
          }}>
          Upload
        </AppButton>
      </View>
      {!!food && !!image && (
        <FoodDetail
          food={{ ...food }}
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
