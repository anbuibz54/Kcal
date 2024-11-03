import * as React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const WATER_INTAKE_KEY = '@water_intake';
const WATER_IMAGES_KEY = '@water_images';
const LAST_UPDATE_DATE_KEY = '@last_update_date';

function WaterTracker() {
  const [waterIntake, setWaterIntake] = React.useState(0);
  const [waterImages, setWaterImages] = React.useState<{ id: number, amount: number }[]>([]);

  // Hàm khôi phục dữ liệu từ AsyncStorage
  const loadData = async () => {
    try {
      const intake = await AsyncStorage.getItem(WATER_INTAKE_KEY);
      const images = await AsyncStorage.getItem(WATER_IMAGES_KEY);
      const lastUpdateDate = await AsyncStorage.getItem(LAST_UPDATE_DATE_KEY);

      const today = moment().format('YYYY-MM-DD');

      // Nếu ngày hiện tại khác ngày lưu trữ cuối cùng, đặt lại dữ liệu
      if (lastUpdateDate !== today) {
        await AsyncStorage.setItem(WATER_INTAKE_KEY, '0');
        await AsyncStorage.setItem(WATER_IMAGES_KEY, JSON.stringify([]));
        await AsyncStorage.setItem(LAST_UPDATE_DATE_KEY, today);
      } else {
        if (intake) setWaterIntake(Number(intake));
        if (images) setWaterImages(JSON.parse(images));
      }
    } catch (error) {
      console.error('Error loading data', error);
    }
  };

  // Hàm lưu dữ liệu vào AsyncStorage
  const saveData = async () => {
    try {
      await AsyncStorage.setItem(WATER_INTAKE_KEY, waterIntake.toString());
      await AsyncStorage.setItem(WATER_IMAGES_KEY, JSON.stringify(waterImages));
    } catch (error) {
      console.error('Error saving data', error);
    }
  };

  React.useEffect(() => {
    loadData();
  }, []);

  React.useEffect(() => {
    saveData();
  }, [waterIntake, waterImages]);

  const addWaterIntake = () => {
    const newId = waterImages.length;
    setWaterIntake(prev => prev + 0.5);
    setWaterImages(prev => [...prev, { id: newId, amount: 0.5 }]);
  };

  const removeWaterIntake = (id: number) => {
    const updatedImages = waterImages.filter(image => image.id !== id);
    const removedWater = waterImages.find(image => image.id === id)?.amount || 0;

    setWaterIntake(prev => prev - removedWater);
    setWaterImages(updatedImages);
  };

  return (
    <View
      style={{
        backgroundColor: '#45a0eb',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        marginBottom: 16,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: '700', color: '#FFFFFF' }}>
        Bạn đã uống: {waterIntake} lít
      </Text>

      <View style={{ 
          flexDirection: 'row', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          marginTop: 16,
        }}>
        {waterImages.map(({ id }, index) => (
          <TouchableOpacity key={id} onPress={() => removeWaterIntake(id)}>
            <Image
              source={require('../../../assets/images/water.png')}
              style={{ width: 50, height: 50, margin: 0 }} 
            />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity 
        onPress={addWaterIntake} 
        style={{ 
          marginTop: 16,
          backgroundColor: '#ffffff', 
          borderRadius: 50, 
          padding: 10, 
          alignItems: 'center', 
          justifyContent: 'center',
        }}>
        <Text style={{ fontSize: 24, color: '#45a0eb' }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

export default WaterTracker;
