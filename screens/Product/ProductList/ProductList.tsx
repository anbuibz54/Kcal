/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import AppHeader from '../../../ui_packages/components/AppHeader/AppHeader';
import ProductCard from '../../../ui_packages/components/ProductCard/ProductCard';
import Loading from '../../ScanningFood/Loading';
import {productQueries} from '../../../services/product/queries';
import ROUTES from '../../../navigations/routes';
export default function ProductList(props: {
  navigation: {
    navigate: (arg: string, params?: any) => void;
  };
  route: {params: any};
}) {
  const [products, setProducts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  async function getProducts() {
    const response = await productQueries.getProducts();
    if (!!response) {
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
