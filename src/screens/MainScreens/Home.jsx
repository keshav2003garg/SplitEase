import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainHome from "../HomeScreens/MainHome";
import CreateGroup from "../HomeScreens/CreateGroup";
import GroupMainScreen from "../HomeScreens/GroupMainScreen";
import AddExpense from "../HomeScreens/AddExpense";


const options = {
  gestureEnabled: true,
  transitionSpec: {
    open: { animation: 'timing', config: { duration: 300 } },
    close: { animation: 'timing', config: { duration: 300 } },
  },
  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      cardStyle: {
        opacity: progress,
      }
    }
  }
}

const Stack = createNativeStackNavigator();

export default function Home() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="MainHome" component={MainHome} />
        <Stack.Screen name="CreateGroup" component={CreateGroup} />
        <Stack.Screen name="GroupMainScreen" component={GroupMainScreen} options={options}/>
        <Stack.Screen name="AddExpense" component={AddExpense} options={options}/>
    </Stack.Navigator>
  );
}