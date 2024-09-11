/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Text, Icon} from 'react-native-paper';
import AppButton from '../Button/AppButton';
interface FavoriteDetailProps {
  // food: {
  //   name: string;
  //   description: string;
  //   calories: number;
  //   fat: number;
  //   protein: number;
  //   carbohydrate: number;
  // };
//   thumbnail: string;
  onClose: () => void;
}
export default function FavoriteDetail(props: FavoriteDetailProps) {
  // ref
  return (
    <View style={StyleSheet.absoluteFill}>
      <View
        style={{
          width: '100%',
          height: '70%',
          position: 'absolute',
          bottom: 0,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          backgroundColor: '#F4F4F4',
        }}>
        <ScrollView
          style={{
            width: '100%',
            height: '90%',
            position: 'relative',
          }}>
          <TouchableOpacity
            style={{marginVertical: 16, marginLeft: 16}}
            onPress={() => {
              props.onClose();
            }}>
            <Icon source={'close'} size={40}></Icon>
          </TouchableOpacity>
          <Image
            src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            style={{
              height: 250,
              width: '100%',
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
            }}
          />
          <View
            style={{
              height: 150,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              backgroundColor: '#FF847325',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 18, fontWeight: '700', color: '#FF8473'}}>
                Protein
              </Text>
              <Text style={{fontSize: 18, fontWeight: '700', color: '#FF8473'}}>
                450g
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 18, fontWeight: '700', color: '#FF8473'}}>
                Protein
              </Text>
              <Text style={{fontSize: 18, fontWeight: '700', color: '#FF8473'}}>
                450g
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 18, fontWeight: '700', color: '#FF8473'}}>
                Protein
              </Text>
              <Text style={{fontSize: 18, fontWeight: '700', color: '#FF8473'}}>
                450g
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 18, fontWeight: '700', color: '#FF8473'}}>
                Protein
              </Text>
              <Text style={{fontSize: 18, fontWeight: '700', color: '#FF8473'}}>
                450g
              </Text>
            </View>
          </View>
          <View style={{padding: 32}}>
            <Text style={{fontSize: 24, fontWeight: '700', marginBottom: 32}}>
              Details
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '200',
                width: '100%',
              }}>
              A hamburger (also burger for short) is a sandwich consisting of
              one or more cooked patties of ground meat, usually beef, placed
              inside a sliced bread
            </Text>
            <View style={{width: '100%', marginBottom: 32}}>
              <AppButton mode="text">Read More...</AppButton>
            </View>
            <View style={{width: '100%', paddingHorizontal: 20}}>
              <AppButton>Add to Favorites</AppButton>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
