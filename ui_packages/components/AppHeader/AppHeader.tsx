/* eslint-disable prettier/prettier */
import * as React from 'react';
import {Appbar, useTheme} from 'react-native-paper';

function AppHeader(props: {
  onBack: () => void;
  title:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | (React.ReactElement<any, string | React.JSXElementConstructor<any>> &
        string)
    | (Iterable<React.ReactNode> & string)
    | (React.ReactPortal & string)
    | null
    | undefined;
}) {
  const _goBack = () => console.log('Went back');

  //   const _handleSearch = () => console.log('Searching');

  //   const _handleMore = () => console.log('Shown more');
  const theme = useTheme();
  return (
    <Appbar.Header
      mode="center-aligned"
      style={{backgroundColor: theme.colors.elevation.level0}}>
      <Appbar.BackAction
        onPress={() => {
          if (!!props.onBack) props.onBack();
          else _goBack();
        }}
      />
      <Appbar.Content color={theme.colors.secondary} title={!!props.title ? props.title : 'Title'} />
      {/* <Appbar.Action icon="magnify" onPress={_handleSearch} />
      <Appbar.Action icon="dots-vertical" onPress={_handleMore} /> */}
    </Appbar.Header>
  );
}

export default AppHeader;
