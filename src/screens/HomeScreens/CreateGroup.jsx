import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableNativeFeedback } from "react-native";
import { TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import MI from 'react-native-vector-icons/MaterialIcons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import { createGroup } from "../../actions/userActions";

export default function CreateGroup({ navigation }) {
	const dispatch = useDispatch();
	const { user, loading, groups } = useSelector(state => state.user);
	const [group, setGroup] = useState({ name: '', type: 'trip', image: '', members: [user.userID] });

	const handleCreateGroup = () => {
		dispatch(createGroup(group));
		if (!loading) navigation.goBack();
	}

	return (
		<View className="flex-1">

			<View className='flex-row justify-between items-center mt-14 pb-[12px] border-[#D8D8D8] border-b-[0.55px]'>
				<View className='flex-row'>
					<View className='ml-4 mr-7'><TouchableNativeFeedback onPress={() => { navigation.goBack() }}><MI name='cancel' color='#5A5A5A' size={30} /></TouchableNativeFeedback></View>
					<Text className='text-black text-[19px] font-[Poppins-Medium]'>Create a Group</Text>
				</View>
				<TouchableNativeFeedback onPress={handleCreateGroup} ><Text className='text-black text-[15px] font-[Poppins-Medium] mr-4'>Done</Text></TouchableNativeFeedback>
			</View>

			<View>
				<View className='my-5 mx-5 flex-row items-center'>
					<View className='mr-3 p-[14px] border-slate-400 border-[0.55px] rounded-md border-b-4 border-b-slate-400' sharedTransitionTag='sharedTag'><MCI name="camera-plus" color='#000' size={30} /></View>
					<TextInput className='flex-1 text-[Poppins-Medium] text-lg' value={group.name} label={<Text className='text-lg font-[Poppins-Medium]'>Group name</Text>} mode='outlined' outlineColor='#5A5A5A' activeOutlineColor='#5A5A5A' autoFocus outlineStyle={{ backgroundColor: 'white', borderBottomWidth: 2, borderWidth: 0, borderRadius: 0 }} onChangeText={(text) => { setGroup({ ...group, name: text }) }} />
				</View>
				<View>
					<Text className='text-sm text-[#5A5A5A] font-[Poppins-Medium] ml-5'>Type</Text>
					<ScrollView className='ml-6 my-2' horizontal={true} >
						<View className='flex-row justify-center items-center mx-1 p-2 border-[#5A5A5A] border-2 rounded-3xl'>
							<View className='ml-2'><MCI name="airplane" color='black' size={25} /></View>
							<Text className='mx-2 mt-[1px] text-[#5A5A5A] text-[13px] font-[Poppins-Medium]'>Trip</Text>
						</View>
						<View className='flex-row justify-center items-center mx-1 p-2 border-[#5A5A5A] border-2 rounded-3xl'>
							<View className='ml-2'><MCI name="home" color='black' size={25} /></View>
							<Text className='mx-2 mt-[1px] text-[#5A5A5A] text-[13px] font-[Poppins-Medium]'>Home</Text>
						</View>
						<View className='flex-row justify-center items-center mx-1 p-2 border-[#5A5A5A] border-2 rounded-3xl'>
							<View className='ml-2'><MCI name="cards-heart" color='black' size={25} /></View>
							<Text className='mx-2 mt-[1px] text-[#5A5A5A] text-[13px] font-[Poppins-Medium]'>Couple</Text>
						</View>
						<View className='flex-row justify-center items-center mx-1 p-2 border-[#5A5A5A] border-2 rounded-3xl'>
							<View className='ml-2'><MCI name="note-text" color='black' size={25} /></View>
							<Text className='mx-2 mt-[1px] text-[#5A5A5A] text-[13px] font-[Poppins-Medium]'>Other</Text>
						</View>
					</ScrollView>
				</View>
			</View>

		</View>
	);
}
