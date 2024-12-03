/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {useTheme, Icon} from 'react-native-paper';
import AppHeader from '../../../ui_packages/components/AppHeader/AppHeader';
import AppButton from '../../../ui_packages/components/Button/AppButton';
import ProductCard from '../../../ui_packages/components/ProductCard/ProductCard';
import AppAvatar from '../../../ui_packages/components/Avatar/Avatar';
import AppMessage from '../../../ui_packages/components/Message/AppMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_KEY} from '../../../core/store/auth/utils';
import {productServices} from '@/services';
import type { RootStackParamList } from '../../../navigations/RootStack';
import { StackScreenProps } from '@react-navigation/stack';
import ROUTES from '../../../navigations/routes';

type Props= StackScreenProps<RootStackParamList,'shop_profile'>;
export default function ShopProfile(props: Props ) {
  const theme = useTheme();
  const [shop, setShop] = React.useState<any>(null);
  const [products, setProducts] = React.useState<any[]>([]);
  async function checkOwningShop() {
    if (props.route.params?.shop) {
      setShop(props.route.params.shop);
    } else {
      const json = await AsyncStorage.getItem(USER_KEY);
      if (json) {
        const user = JSON.parse(json);
        if (user?.shops) {
          setShop(user.shops);
        } else {
          props.navigation.navigate(ROUTES.SHOP_MANAGE);
        }
      } else {
        props.navigation.navigate(ROUTES.INTRO_SCREEN);
      }
    }
  }
  async function getProducts(shopId: number) {
    const response = await productServices.getProductsByShopId(shopId);
    if (response) {
      // console.log({response});
      setProducts(response);
    }
  }
  React.useEffect(() => {
    checkOwningShop();
  }, [props.navigation]);
  React.useEffect(() => {
    if (shop?.id) {
      getProducts(shop.id);
    }
  }, [shop]);
  return (
    <View style={{width: '100%', height: '100%'}}>
      <AppHeader title="Shop Profile" onBack={() => {}} />
      {!!shop && (
        <>
          <View style={{width: '100%', minHeight: '40%', padding: 16}}>
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <AppAvatar avatar={shop.avatar} size={80} name="An" />
                <Text style={{fontSize: 20, fontWeight: '700', marginTop: 16}}>
                  {shop.name}
                </Text>
              </View>
              <View style={{width: '40%'}}>
                <AppButton
                  onPress={() => {
                    props.navigation.navigate(ROUTES.SHOP_MANAGE);
                  }}>
                  Edit Profile
                </AppButton>
              </View>
            </View>
            <View style={{width: '100%', marginTop: 16}}>
              <Text style={{fontSize: 20, fontWeight: '700'}}>Description</Text>
              <Text style={{fontWeight: '500'}}>{shop.description}</Text>
            </View>
            <View
              style={{
                width: '100%',
                padding: 16,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 32,
              }}>
              <View style={{display: 'flex', flexDirection: 'column'}}>
                <Text>Product</Text>
                <Text style={{fontWeight: '600', fontSize: 18}}>
                  {products.length}
                </Text>
              </View>
              <View style={{width: '40%'}}>
                <AppButton
                  onPress={() => {
                    props.navigation.navigate(ROUTES.PRODUCT_MANAGE);
                  }}>
                  Add Product
                </AppButton>
              </View>
            </View>
          </View>
          <ScrollView
            style={{
              width: '100%',
              height: '100%',
              padding: 16,
              backgroundColor: '#D9D9D9',
            }}>
            <View
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                marginBottom: 40,
              }}>
              {products.length > 0 &&
                products.map((product: any) => {
                  return (
                    <TouchableOpacity
                      key={product.id}
                      onPress={() => {
                        props.navigation.navigate(ROUTES.PRODUCT_DETAIL, {
                          product: product,
                        });
                      }}
                      style={{width: '45%', height: 300, marginBottom: 16}}>
                      <ProductCard
                        name={product.name}
                        price={product.price}
                        image={product.images[0]}
                      />
                    </TouchableOpacity>
                  );
                })}
            </View>
            {products.length == 0 && <Text>No products</Text>}
          </ScrollView>
        </>
      )}
      <AppMessage />
    </View>
  );
}
