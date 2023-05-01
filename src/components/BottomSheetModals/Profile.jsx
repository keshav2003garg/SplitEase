import React, { useState } from 'react';
import { View, Text, Image, TouchableNativeFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { TextInput } from 'react-native-paper';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

import { updateUserDetails } from '../../actions/userActions';

export default function Profile({ sheet }) {
	const dispatch = useDispatch();
	const { user, spinLoading } = useSelector(state => state.user);
	const [profile, setProfile] = useState({ name: user.name, email: user.email, phone: user.phoneNumber });

	const handleUpdate = () => {
		dispatch(updateUserDetails(user.userID, profile));
	}

	return (
		<View className='flex-1'>

			<View className='mt-5 pb-[12px] border-[#D8D8D8] border-b-[0.55px]'><Text className='text-black text-xl font-[Poppins-Medium] ml-5'>Update Profile</Text></View>

			{spinLoading ? <SpinLoading /> : null}

			<View className='mt-3 flex-row justify-center'><Image source={{ uri: user.avatar }} className='w-20 h-20 rounded-full' /></View>

			<TextInput className='mx-7 my-3' label={<Text className='text-base font-[Poppins-Medium]'>Name</Text>} value={profile.name} contentStyle={{ fontFamily: 'Poppins-Medium' }} mode='outlined' outlineColor='#5A5A5A' activeOutlineColor='#5A5A5A' outlineStyle={{ backgroundColor: 'white' }} onChangeText={(text) => { setProfile({ ...profile, name: text }) }} />
			<TextInput disabled className='mx-7 my-3' label={<Text className='text-base font-[Poppins-Medium]'>Email</Text>} value={profile.email} contentStyle={{ fontFamily: 'Poppins-Medium' }} mode='outlined' outlineColor='#5A5A5A' activeOutlineColor='#5A5A5A' outlineStyle={{ backgroundColor: 'white' }} onChangeText={(text) => { setProfile({ ...profile, email: text }) }} />
			<TextInput className='mx-7 my-3' label={<Text className='text-base font-[Poppins-Medium]'>Phone Number</Text>} value={profile.phone} contentStyle={{ fontFamily: 'Poppins-Medium' }} mode='outlined' outlineColor='#5A5A5A' activeOutlineColor='#5A5A5A' outlineStyle={{ backgroundColor: 'white' }} onChangeText={(text) => { setProfile({ ...profile, phone: text }) }} />

			<TouchableNativeFeedback onPress={handleUpdate} background={TouchableNativeFeedback.Ripple('#D0D0D0', false)}>
				<View className='mx-6 mt-3 py-3 bg-[#A5A5A5] rounded-xl'><Text className='text-[#5A5A5A] text-center text-base font-[Poppins-Medium]'>Update</Text></View>
			</TouchableNativeFeedback>

		</View>
	)
}

const SpinLoading = () => {
	return (
		<ActivityIndicator animating={true} color={MD2Colors.red800} className='mt-4' size={30} />
	)
}