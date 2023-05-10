import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useDispatch } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import MI from "react-native-vector-icons/MaterialCommunityIcons";
import * as Animatable from "react-native-animatable";

import { googleRegister } from "../../actions/userActions";

export default function Starter({ navigation }) {
	const dispatch = useDispatch();

	return (
		<LinearGradient className="flex-1 bg-[#282d30]" colors={["#000000", "#434343"]}>

			<Animatable.View animation={'bounceIn'} className="flex-[3_3_0%] justify-center items-center">
				<View ><Image source={require('../../../assets/img/logo.png')} /></View>
			</Animatable.View>

			<Animatable.View animation="fadeInUpBig" className="flex-1 bg-white rounded-[25px]">
				
				<TouchableOpacity onPress={() => { dispatch(googleRegister()) }}>
					<View animation="bounceIn" delay={500} className="mx-[25px] mt-[20px] mb-[15px] p-[10px] bg-[#282d30] rounded-[50px] flex-row justify-center items-center">
						<Image className="w-[30px] h-[30px] mx-[10px]" source={require("../../../assets/icons/google.png")}></Image>
						<Text className="text-white text-[15px] font-[Poppins-Medium]"> Continue With Google</Text>
					</View>
				</TouchableOpacity>

				<View className="flex-row items-center">
					<View className="ml-7 flex-1 h-[1.5px] bg-[#282d30]" />
					<View className="mx-2">
						<Text className="text-black text-[15px] font-[Poppins-Medium]">OR</Text>
					</View>
					<View className="mr-7 flex-1 h-[1.5px] bg-[#282d30]" />
				</View>

				<TouchableOpacity onPress={() => { navigation.navigate("Register"); }}>
					<View animation="bounceIn" delay={500} className="mx-[25px] mt-[20px] mb-[15px] p-[10px] bg-[#282d30] rounded-[50px] flex-row justify-center items-center">
						<View className="mx-[10px]"><MI name="email" color="white" size={27} /></View>
						<Text className="text-white text-[15px] font-[Poppins-Medium]">Continue With Email</Text>
					</View>
				</TouchableOpacity>

			</Animatable.View>

		</LinearGradient>
	);
}
