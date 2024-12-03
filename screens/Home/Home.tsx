/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Image, ScrollView, TouchableOpacity} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import AppButton from '../../ui_packages/components/Button/AppButton';
import MiniAppCard from '../../ui_packages/components/MiniAppCard/MiniAppCard';
import {APPS} from '@global-vars/index';
import ROUTES from '../../navigations/routes';
import WaterTracker from '../../ui_packages/components/WaterTracker/WaterTracker';
// import {launchImageLibrary} from 'react-native-image-picker';
// import { s3Utils } from '../../core/utils/s3-utils';
export default function Home(props: {navigation: any}) {
  const theme = useTheme();
  // async function exampleForUploadingImage(){
  //   const res = await launchImageLibrary({
  //     mediaType: 'photo',
  //     includeBase64: true,
  //   });
  //   if(res.assets && res.assets[0].uri){
  //     const imageUrl = await s3Utils.handleUploadToS3(res.assets[0].uri);
  //     console.log({imageUrl});
  //   }
  // }
  return (
    <ScrollView style={{width: '100%', height: '100%', padding: 24}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
        }}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: '900',
            color: theme.colors.secondary,
          }}>
          Hello Anbui
        </Text>
        <Text style={{fontSize: 18, fontWeight: '500', color: '#7B7B7B'}}>
          Find, track and eat healthier
        </Text>
      </View>
      <View
        style={{
          backgroundColor: '#FFF2F0',
          borderRadius: 16,
          maxHeight: '40%',
          minHeight: 220,
          width: '100%',
          marginBottom: 16,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginRight: 16,
            flexShrink: 1,
          }}>
            <Text
            style={{
              fontSize: 15,
              fontWeight: '700',
              color: '#e75643',
              marginBottom: 16,
            }}>
            A R T I C L E
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: '#330600',
              marginBottom: 16,
            }}>
            The pros and cos of fast food{' '}
          </Text>
          <View style={{width: '80%'}}>
            <AppButton buttonColor="#FF8473" icon={"play"}>Read now</AppButton>
          </View>
        </View>
        <Image
          style={{width: 150, height: '100%', borderRadius: 4}}
          resizeMode="contain"
          source={require('../../assets/images/Group1.png')}
        />
      </View>
      <WaterTracker />
      <View
        style={{
          backgroundColor: '#C6C4DE',
          borderRadius: 16,
          width: '100%',
          paddingHorizontal: 16,
          paddingVertical: 16,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginBottom: 16,
          flexGrow: 1,
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
            color: '#FFFFFF',
            width: '50%',
          }}>
          Track your weekly process
        </Text>
        <View style={{width: '40%'}}>
          <AppButton buttonColor="#FFFFFF" onPress={()=>{
            props.navigation.navigate(ROUTES.TDEE_FORM);
          }} textColor={theme.colors.secondary}>
            View now
          </AppButton>
        </View>
      </View>
      <View style={{height: 300}}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: '900',
            color: '#330600',
          }}>
          Apps
        </Text>
        <ScrollView
          horizontal
          contentContainerStyle={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {APPS.map(app => {
            return (
              <TouchableOpacity
              key={app.label}
                onPress={() => {
                  app.onClick(props.navigation);
                }}
                style={{marginRight: 16}}>
              <MiniAppCard source={app.imageSource} label={app.label} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <View
        style={{
          backgroundColor: '#2E9EA3',
          borderRadius: 16,
          width: '100%',
          paddingHorizontal: 16,
          paddingVertical: 16,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginBottom: 60,
          flexGrow: 1,
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
            color: '#FFFFFF',
            width: '50%',
          }}>
          Track your water rate
        </Text>
        <View style={{width: '40%'}}>
          <AppButton buttonColor="#FFFFFF" textColor={theme.colors.secondary}>
            View now
          </AppButton>
        </View>
      </View>
    </ScrollView>
  );
}
