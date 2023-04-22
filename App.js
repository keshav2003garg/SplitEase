import React, {useEffect} from "react";
import * as TransparentStatusAndNavigationBar from "react-native-transparent-status-and-navigation-bar";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import store, { persistor } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import Root from "./src/clusters/root";

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

TransparentStatusAndNavigationBar.init();
export default function App() {
  useEffect(()=>{
    GoogleSignin.configure();
  })
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer theme={navTheme}>
          <Root />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
