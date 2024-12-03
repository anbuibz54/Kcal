import * as React from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import AppHeader from '../../../ui_packages/components/AppHeader/AppHeader';
import ProductCard from '../../../ui_packages/components/ProductCard/ProductCard';
import Loading from '../../ScanningFood/Loading';
import {productServices} from '@/services';
import ROUTES from '../../../navigations/routes';
import type { RootStackParamList } from '../../../navigations/RootStack';
import { StackScreenProps } from '@react-navigation/stack';

type Props= StackScreenProps<RootStackParamList,'product_list'>;
export default function ProductList(props: Props) {
  const [products, setProducts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  async function getProducts() {
    const response = await productServices.getProducts();
    if (response) {
      setProducts(response);
      setLoading(false);
    }
  }
  React.useEffect(() => {
    getProducts();
  }, []);
  return (
    <View style={{width: '100%', height: '100%'}}>
      <AppHeader title="Product List" onBack={() => {}} />
      {products.length > 0 && (
        <FlatList
          style={{padding: 16}}
          keyExtractor={(item, idx) => String(idx)}
          data={products}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{width: '100%', height: 300}}
              onPress={() => {
                props.navigation.navigate(ROUTES.PRODUCT_DETAIL, {
                  product: item,
                });
              }}>
              <ProductCard
                image={item.images[0]}
                name={item.name}
                price={item.price}
              />
            </TouchableOpacity>
          )}
        />
      )}
      {loading && <Loading />}
    </View>
  );
}
