/* eslint-disable prettier/prettier */
import * as React from 'react';
import {View, Image,Dimensions} from 'react-native';
import {Text} from 'react-native-paper';
import {ProgressBar, useTheme} from 'react-native-paper';

export default function Loading() {
  const theme = useTheme();
  const [progress, setProgress] = React.useState<number>(0);
  const windowWidth = Dimensions.get('window').width;
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress(progress => progress + 0.1);
    }, 300);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        padding: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
      }}>
      <Image
        src="https://eliai-server.eliai.vn/images/7c9b1768-dc21-406b-81d9-d9f3a5c261df/7c9b1768-dc21-406b-81d9-d9f3a5c261df_0.jpg"
        style={{width: '80%', aspectRatio: 1, marginTop: 120}}
      />
      <ProgressBar
        style={{
          height: 10,
          width: windowWidth*0.9,
          borderRadius: 100,
          marginBottom: 24,
          marginTop: 40,
        }}
        color={theme.colors.inversePrimary}
        animatedValue={progress}
        // progress={0.5}
      />
      <Text>Loading....</Text>
    </View>
  );
}
