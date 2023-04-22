import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import MI from 'react-native-vector-icons/MaterialIcons';
import EN from 'react-native-vector-icons/Entypo';
import NotificationSetting from 'react-native-open-notification';
import BottomSheet from '@gorhom/bottom-sheet';

import { googleLogout } from '../../actions/userActions';

export default function Account() {
	const dispatch = useDispatch();
	const bottomSheetRef = useRef(null);
	const snapPoints = useMemo(() => ['25%', '50%'], []);
	const handleSheetChanges = useCallback((index) => {
		console.log('handleSheetChanges', index);
	}, []);
	return (
		
		<View className='flex-1'>

			<View className='mt-14 pb-[12px] border-[#D8D8D8] border-b-[0.55px]'><Text className='text-black text-xl font-[Poppins-Medium] ml-5'>Account</Text></View>

			<View className='px-4 my-5 pb-5 flex-row justify-between items-center border-[#D8D8D8] border-b-2'>
				<View className='flex-row items-center'>
					<View className='rounded-full overflow-hidden ring-offset-2 ring-2'><Image className='w-20 h-20' source={require('../../../assets/img/avatar.jpg')} /></View>
					<View className='ml-2'>
						<Text className='text-black text-base font-[Poppins-Medium]'>Keshav Garg</Text>
						<Text className='text-[#5A5A5A] text-sm font-[Poppins-Regular]'>keshav2003garg@gmail.com</Text>
					</View>
				</View>
				<View><MI name='edit' size={27} color={'black'} /></View>
			</View>

			<TouchableOpacity className='mx-5 mb-5 flex-row items-center'>
				<View><EN name='link' size={30} color={'black'} /></View>
				<Text className='ml-6 text-black text-base font-[Poppins-Regular]'>Join by Link</Text>
			</TouchableOpacity>
			<View className='mx-5 mb-5 flex-row items-center'>
				<View><MI name='payments' size={30} color={'black'} /></View>
				<Text className='ml-6 text-black text-base font-[Poppins-Regular]'>Your Payment Details</Text>
			</View>

			<Text className='mx-5 mt-4 mb-5 text-black text-sm font-[Poppins-Regular]'>Preferences</Text>

			<View className='mx-5 mb-5 flex-row items-center'>
				<View><MI name='email' size={30} color={'black'} /></View>
				<Text className='ml-6 text-black text-base font-[Poppins-Regular]'>Email Settings</Text>
			</View>
			<TouchableOpacity className='mx-5 mb-5 flex-row items-center' onPress={() => { NotificationSetting.open() }}>
				<View><MI name='notifications' size={30} color={'black'} /></View>
				<Text className='ml-6 text-black text-base font-[Poppins-Regular]'>Device and Push notification settings</Text>
			</TouchableOpacity>
			<View className='mx-5 mb-5 flex-row items-center'>
				<View><MI name='lock' size={30} color={'black'} /></View>
				<Text className='ml-6 text-black text-base font-[Poppins-Regular]'>Enter Passcode</Text>
			</View>

			<Text className='mx-5 mt-4 mb-5 text-black text-sm font-[Poppins-Regular]'>Feedback</Text>

			<TouchableOpacity className='mx-5 mb-5 flex-row items-center' onPress={() => { Linking.openURL("market://details?id=com.Splitwise.SplitwiseMobile") }}>
				<View><MI name='star' size={30} color={'black'} /></View>
				<Text className='ml-6 text-black text-base font-[Poppins-Regular]'>Rate SplitEase</Text>
			</TouchableOpacity>
			<TouchableOpacity className='px-5 pb-5 flex-row items-center border-[#D8D8D8] border-b-2' onPress={() => { Linking.openURL("mailto:support@splitease.com") }}>
				<View><MI name='contact-support' size={30} color={'black'} /></View>
				<Text className='ml-6 text-black text-base font-[Poppins-Regular]'>Contact SplitEase Support</Text>
			</TouchableOpacity>

			<TouchableOpacity className='mx-5 mt-7 flex-row items-center' onPress={() => { dispatch(googleLogout()) }} >
				<View><MI name='logout' size={30} color={'#5A5A5A'} /></View>
				<Text className='ml-6 text-[#5A5A5A] text-base font-[Poppins-Regular]'>Logout</Text>
			</TouchableOpacity>

		</View>
	)
}