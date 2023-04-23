import React, { useEffect, useRef } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feather from 'react-native-vector-icons/Feather';
import MI from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from "react-native-animatable";


import Home from "../screens/MainScreens/Home";
import Charts from "../screens/MainScreens/Charts";
import Activity from "../screens/MainScreens/Activity";
import Account from "../screens/MainScreens/Account";

const Tab = createBottomTabNavigator();

const TabArr = [
	{ name: 'Home', component: Home, Icon: Feather, icon: 'home' },
	{ name: 'Charts', component: Charts, Icon: Feather, icon: 'pie-chart' },
	{ name: 'Activity', component: Activity, Icon: Feather, icon: 'activity' },
	{ name: 'Account', component: Account, Icon: MI, icon: 'account-box-outline' },
]

const TabButton = (props) => {
	const { item, onPress, accessibilityState } = props;
	const focused = accessibilityState.selected;
	const viewRef = useRef(null);

	useEffect(() => {
		if (focused) viewRef.current.bounceIn(800);
	}, [focused])

	return (
		<TouchableOpacity className='flex-1 flex-row justify-center items-center' onPress={onPress}>
			<Animatable.View ref={viewRef}><item.Icon name={props.item.icon} color={focused ? '#03a37e' : "#5A5A5A"} size={30} /></Animatable.View>
		</TouchableOpacity>
	)
}

export default function Main() {
	return (
		<Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
			{TabArr.map((item, index) => {
				return (
					<Tab.Screen key={index} name={item.name} component={item.component} options={{ tabBarButton: (props) => <TabButton {...props} item={item} /> }} />
				)
			})}
		</Tab.Navigator>
	);
}
