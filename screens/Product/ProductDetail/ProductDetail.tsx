/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {View, TouchableOpacity, Image, ScrollView} from 'react-native';
import AppButton from '../../../ui_packages/components/Button/AppButton';
import {Icon, Text, Divider} from 'react-native-paper';
import AppHeader from '../../../ui_packages/components/AppHeader/AppHeader';
import AppTextInput from '../../../ui_packages/components/TextInput/TextInput';
import AppAvatar from '../../../ui_packages/components/Avatar/Avatar';
import Gallery from 'react-native-awesome-gallery';
import ROUTES from '../../../navigations/routes';

const images = [
  'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];
export default function ProductDetail(props: {
  navigation: {navigate: (arg: string, params?: any) => void};
  route: {params: any};
}) {
  const {product} = props.route.params;
  return (
    <View style={{width: '100%', height: '100%'}}>
      <AppHeader title={'Product Detail'} onBack={() => {}} />
      <ScrollView
        style={{width: '100%', height: '100%', padding: 16, marginBottom: 40}}>
        <Gallery
          data={product.images}
          disableVerticalSwipe={true}
          doubleTapScale={1}
          maxScale={1}
          keyExtractor={(item, idx) => idx}
          renderItem={item => (
            <Image
              src={item.item as string}
              style={{width: '100%', height: 300}}
            />
          )}
          style={{height: 300, marginBottom: 16}}
        />
        <View
          style={{
            width: '100%',
            marginBottom: 16,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              width: '20%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AppAvatar avatar={product.shops.avatar} size={40} />
            <Text style={{fontSize: 16, fontWeight: '600', marginTop: 16}}>
              {product.shops.name}
            </Text>
          </View>
          <View style={{width: '40%'}}>
            <AppButton
              onPress={() => {
                props.navigation.navigate(ROUTES.SHOP_PROFILE, {
                  shop: product.shops,
                });
              }}>
              View shop
            </AppButton>
          </View>
        </View>
        <View style={{width: '100%', marginBottom: 16}}>
          <Text style={{fontSize: 20, fontWeight: '700', marginBottom: 16}}>
            Description
          </Text>
          <Text style={{fontSize: 16, fontWeight: '600'}}>
            {product.description}
          </Text>
        </View>
        <Divider />
        <View
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginVertical: 32,
          }}>
          <Text style={{fontSize: 18, fontWeight: '700', color: '#E23E3E'}}>
            {product.price} $
          </Text>
        </View>
        <Divider />
      </ScrollView>
      <View
        style={{
          width: '100%',
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-around',
          bottom: 20,
        }}>
        <View style={{width: '40%'}}>
          <AppButton mode="outlined">Add to Cart</AppButton>
        </View>
        <View style={{width: '40%'}}>
          <AppButton
            onPress={() => {
              props.navigation.navigate(ROUTES.CART);
            }}>
            Buy now
          </AppButton>
        </View>
      </View>
    </View>
  );
}
