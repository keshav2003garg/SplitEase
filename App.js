import React, { useEffect } from "react";
import * as TransparentStatusAndNavigationBar from "react-native-transparent-status-and-navigation-bar";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
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

const App = () => {

  useEffect(() => {
    GoogleSignin.configure();
  })
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer theme={navTheme}>
          <BottomSheetModalProvider>
            <Root />
          </BottomSheetModalProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default gestureHandlerRootHOC(App);
