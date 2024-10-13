/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {View} from 'react-native';
import {Text, Snackbar, Icon} from 'react-native-paper';
import {useMessage, reset} from '../../../core/store/message/messageSlice';
export default function AppMessage() {
  const [visible, setVisible] = React.useState<boolean>(true);
  const {message} = useMessage();
  const onDismissSnackBar = () => {
    setVisible(false);
    reset();
  };
  React.useEffect(() => {
    if (message) {
      setVisible(true);
    }
  }, [message]);
  return (
    <>
      {visible &&message && (
        <View
          style={{
            width: '100%',
            position: 'absolute',
            bottom: 20,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Snackbar
            visible={visible}
            duration={2000}
            onDismiss={onDismissSnackBar}
            icon={message.icon}
            onIconPress={()=>{}}
            style={{backgroundColor:message.color,}}>
           {message.message}
          </Snackbar>
        </View>
      )}
    </>
  );
}
