import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import {NativeBaseProvider} from 'native-base';
import {customTheme} from './src/theme';
import AuthContextProvider from './src/context/AuthContext';
import CartProvider from './src/context/CartContext';
import ReadContext from './src/context/ReadContext';
export default function App() {
  return (
    <AuthContextProvider>
      <CartProvider>
        <ReadContext>
          <NativeBaseProvider theme={customTheme}>
            <StatusBar barStyle={'light-content'} backgroundColor="#f75606" />
            <AppNavigator />
          </NativeBaseProvider>
        </ReadContext>
      </CartProvider>
    </AuthContextProvider>
  );
}
