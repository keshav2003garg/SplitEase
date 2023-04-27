import React, { useRef, useState } from 'react';
import { View, Text, Image, Linking, BackHandler, TouchableNativeFeedback } from 'react-native'
import { useDispatch } from 'react-redux';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { trigger } from "react-native-haptic-feedback";
import Toast from 'react-native-toast-message';
import NotificationSetting from 'react-native-open-notification';
import MI from 'react-native-vector-icons/MaterialIcons';
import EN from 'react-native-vector-icons/Entypo';

import { googleLogout } from '../../actions/userActions';

export default function Account({ navigation }) {
	const dispatch = useDispatch();
	const [isModalVisible, setModalVisible] = useState({ visible: false, components: { profile: false, join: false, payment: false, emailSetting: false, lock: false } });
	const bottomSheetRef = useRef(["profile", "join", "payment", "emailSetting", "lock"]);
	const snapPoints = ['26%', "77%", "90"];
	const handleSheet = ((name) => {
		setModalVisible({ visible: true, components: { ...isModalVisible.components, [name]: true } });
		bottomSheetRef.current[name].present();
		trigger("impactMedium");
	});
	navigation.addListener('beforeRemove', (e) => { e.preventDefault() });
	BackHandler.addEventListener('hardwareBackPress', () => {
		if (isModalVisible.components.join) bottomSheetRef.current['join'].forceClose();
		if (isModalVisible.components.payment) bottomSheetRef.current['payment'].forceClose();
	});

	const handleAuth = () => {
		Toast.show({
			type: 'tomatoToast',
			text1: 'Hello',
			position: 'bottom',
		});
	};

	return (
		<View pointerEvents={isModalVisible.visible ? "none" : "auto"} className={`flex-1 pointer-events-none ${isModalVisible.visible ? 'bg-[#BEBEBE]' : 'bg-[#FFFFFf]'}`}>

			<View className='mt-14 pb-[12px] border-[#D8D8D8] border-b-[0.55px]'><Text className='text-black text-xl font-[Poppins-Medium] ml-5'>Account</Text></View>

			<View className='px-4 mt-5 pb-3 flex-row justify-between items-center'>
				<View className='flex-row items-center'>
					<View className={`rounded-full overflow-hidden ${isModalVisible.visible ? 'opacity-70' : 'opacity-100'}`}><Image className='w-20 h-20 scale-[1.25]' source={require('../../../assets/img/avatar.jpg')} /></View>
					<View className='ml-2'>
						<Text className='text-black text-base font-[Poppins-Medium]'>Keshav Garg</Text>
						<Text className='text-[#5A5A5A] text-sm font-[Poppins-Regular]'>keshav2003garg@gmail.com</Text>
					</View>
				</View>
				<View><MI name='edit' size={27} color={'black'} /></View>
			</View>

			<View className={`my-3 border-b-2`} style={{ borderColor: `${isModalVisible.visible ? '#AAAAAA' : '#D8D8D8'}` }}></View>

			<TouchableNativeFeedback onPress={() => { handleSheet('join') }} background={TouchableNativeFeedback.Ripple('#D0D0D0', false)}>
				<View className='px-5 py-3 flex-row items-center' >
					<View><EN name='link' size={30} color={'black'} /></View>
					<Text className='ml-6 text-black text-base font-[Poppins-Regular]'>Join by Link</Text>
				</View>
			</TouchableNativeFeedback>

			<TouchableNativeFeedback onPress={() => { handleSheet('payment') }} background={TouchableNativeFeedback.Ripple('#D0D0D0', false)}>
				<View className='px-5 py-3 flex-row items-center'>
					<View><MI name='payments' size={30} color={'black'} /></View>
					<Text className='ml-6 text-black text-base font-[Poppins-Regular]'>Your Payment Details</Text>
				</View>
			</TouchableNativeFeedback>

			<Text className='mx-5 mt-4 mb-2 text-black text-sm font-[Poppins-Regular]'>Preferences</Text>

			<TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#D0D0D0', false)}>
				<View className='px-5 py-3 flex-row items-center'>
					<View><MI name='email' size={30} color={'black'} /></View>
					<Text className='ml-6 text-black text-base font-[Poppins-Regular]'>Email Settings</Text>
				</View>
			</TouchableNativeFeedback>

			<TouchableNativeFeedback onPress={() => { NotificationSetting.open() }} background={TouchableNativeFeedback.Ripple('#D0D0D0', false)}>
				<View className='px-5 py-3 flex-row items-center'>
					<View><MI name='notifications' size={30} color={'black'} /></View>
					<Text className='ml-6 text-black text-base font-[Poppins-Regular]'>Device and Push notification settings</Text>
				</View>
			</TouchableNativeFeedback>
			<TouchableNativeFeedback onPress={handleAuth} background={TouchableNativeFeedback.Ripple('#D0D0D0', false)}>
				<View className='px-5 py-3 flex-row items-center'>
					<View><MI name='lock' size={30} color={'black'} /></View>
					<Text className='ml-6 text-black text-base font-[Poppins-Regular]'>Lock your App</Text>
				</View>
			</TouchableNativeFeedback>

			<Text className='mx-5 mt-4 mb-2 text-black text-sm font-[Poppins-Regular]'>Feedback</Text>

			<TouchableNativeFeedback onPress={() => { Linking.openURL("market://details?id=com.Splitwise.SplitwiseMobile") }} background={TouchableNativeFeedback.Ripple('#D0D0D0', false)}>
				<View className='px-5 py-3 flex-row items-center'>
					<View><MI name='star' size={30} color={'black'} /></View>
					<Text className='ml-6 text-black text-base font-[Poppins-Regular]'>Rate SplitEase</Text>
				</View>
			</TouchableNativeFeedback>
			<TouchableNativeFeedback onPress={() => { Linking.openURL("mailto:support@splitease.com") }} background={TouchableNativeFeedback.Ripple('#D0D0D0', false)}>
				<View className='px-5 py-3 flex-row items-center'>
					<View><MI name='contact-support' size={30} color={'black'} /></View>
					<Text className='ml-6 text-black text-base font-[Poppins-Regular]'>Contact SplitEase Support</Text>
				</View>
			</TouchableNativeFeedback>

			<View className={`my-3 border-b-2`} style={{ borderColor: `${isModalVisible ? '#AAAAAA' : '#D8D8D8'}` }}></View>

			<TouchableNativeFeedback onPress={() => { dispatch(googleLogout()) }} background={TouchableNativeFeedback.Ripple('#D0D0D0', false)}>
				<View className='px-5 py-3 flex-row items-center'>
					<View><MI name='logout' size={30} color={'#5A5A5A'} /></View>
					<Text className='ml-6 text-[#5A5A5A] text-base font-[Poppins-Regular]'>Logout</Text>
				</View>
			</TouchableNativeFeedback>

			<BottomSheetModal name='join' ref={ref => (bottomSheetRef.current['join'] = ref)} index={0} snapPoints={snapPoints} backgroundStyle={{ backgroundColor: '#fff', borderRadius: 40, }} onChange={() => { setModalVisible({ ...isModalVisible, visible: true, components: { join: true } }) }} onDismiss={() => { setModalVisible({ ...isModalVisible, visible: false, components: { join: false } }) }} >
				<View className='flex-1'>
					<View className='flex-row items-center justify-between px-5 py-3 border-b-[0.55px] border-[#D8D8D8]'>
						<Text className='text-black text-xl font-[Poppins-Medium]'></Text>
						<TouchableNativeFeedback onPress={() => { trigger("impactMedium"); bottomSheetRef.current['join'].forceClose(); }} background={TouchableNativeFeedback.Ripple('#D0D0D0', false)}>
							<View className='px-2'><Text className='text-[#5A5A5A] text-base font-[Poppins-Regular]'>Join</Text></View>
						</TouchableNativeFeedback>
					</View>
				</View>
			</BottomSheetModal>

			<BottomSheetModal name='payment' ref={ref => (bottomSheetRef.current['payment'] = ref)} index={0} snapPoints={snapPoints} backgroundStyle={{ backgroundColor: '#fff', borderRadius: 40, }} onChange={() => { setModalVisible({ ...isModalVisible, visible: true, components: { payment: true } }) }} onDismiss={() => { setModalVisible({ ...isModalVisible, visible: false, components: { payment: false } }) }} >
				<View className='flex-1'>
					<View className='flex-row items-center justify-between px-5 py-3 border-b-[0.55px] border-[#D8D8D8]'>
						<Text className='text-black text-xl font-[Poppins-Medium]'></Text>
						<TouchableNativeFeedback onPress={() => { trigger("impactMedium"); bottomSheetRef.current['payment'].forceClose(); }} background={TouchableNativeFeedback.Ripple('#D0D0D0', false)}>
							<View className='px-2'><Text className='text-[#5A5A5A] text-base font-[Poppins-Regular]'>Payment</Text></View>
						</TouchableNativeFeedback>
					</View>
				</View>
			</BottomSheetModal>

		</View >
	)
}