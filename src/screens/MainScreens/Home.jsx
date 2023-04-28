import React from "react";
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { forSlide } from "../../utils/transition";

import MainHome from "../HomeScreens/MainHome";
import CreateGroup from "../HomeScreens/CreateGroup";
import GroupMainScreen from "../HomeScreens/GroupMainScreen";
import AddExpense from "../HomeScreens/AddExpense";


const options = {
	gestureEnabled: true,
	cardStyleInterpolator: forSlide
}

const Stack = createSharedElementStackNavigator();

export default function Home() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="MainHome" component={MainHome} />
			<Stack.Screen name="CreateGroup" component={CreateGroup} options={options} />
			<Stack.Screen name="GroupMainScreen" component={GroupMainScreen} options={options} />
			<Stack.Screen name="AddExpense" component={AddExpense} options={options} />
		</Stack.Navigator>
	);
}