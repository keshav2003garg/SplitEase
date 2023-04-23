import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Starter from "../screens/AuthScreens/Starter";
import Register from "../screens/AuthScreens/Register";
import Login from "../screens/AuthScreens/Login";

const Stack = createNativeStackNavigator();

export default function Auth() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Starter" component={Starter} />
			<Stack.Screen name="Register" component={Register} />
			<Stack.Screen name="Login" component={Login} />
		</Stack.Navigator>
	);
}