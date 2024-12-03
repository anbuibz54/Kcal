/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Text, Dimensions, Image} from 'react-native';
import {Button} from 'react-native-paper';
import {useTheme} from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';
import {INTRO_ITEMS} from '@global-vars/index';
import ROUTES from '../../navigations/routes';
const data = INTRO_ITEMS;
const width = Dimensions.get('window').width;
export default function Intro(props: { navigation: { navigate: (arg0: string) => void; }; }) {
  const theme = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        width: '100%',
        height: '100%',
      }}>
      <Text
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
          alignSelf: 'center',
          alignItems: 'center',
          color: '#005e5e',
          fontWeight: '900',
          fontSize: 35,
          textAlign: 'center',
          marginTop: 40,
        }}>
        kcal
      </Text>
      <Carousel
        data={data}
        width={width}
        autoPlay
        renderItem={({index}) => {
          const item = data[index];
          return (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '80%',
              }}>
              <Image
                source={item.headerImg}
                style={{width: '65%', height: '65%'}} />
              <Text
                style={{
                  color: '#005e5e',
                  fontWeight: '900',
                  fontSize: 30,
                  textAlign: 'center',
                }}>
                {item.title}
              </Text>
              <Text
                style={{
                  color: '#00000045',
                  fontSize: 20,
                  textAlign: 'center',
                }}>
                {item.subtitle}
              </Text>
            </View>
          );
        }}
      />
      <View
        style={{
          flex: 0.1,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          marginBottom: 40,
        }}>
        <Button
          mode="contained"
          style={{
            backgroundColor: theme.colors.secondary,
            width: '60%',
            height: '100%',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          textColor="#FFFFFF"
          onTouchEnd={()=>{
          }}
          onPress={() => {
            props.navigation.navigate(ROUTES.LOGIN_FORM_SCREEN);
          }}>
          <Text>Skip</Text>
        </Button>
      </View>
    </View>
  );
}
