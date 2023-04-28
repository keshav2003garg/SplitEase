import React, { useRef, useState, useMemo } from 'react';
import { View, Text, BackHandler } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { trigger } from "react-native-haptic-feedback";

import AccountPage from '../../components/AccountPage';
import Profile from '../../components/BottomSheetModals/Profile';
import JoinByLink from '../../components/BottomSheetModals/JoinByLink';
import PaymentDetails from '../../components/BottomSheetModals/PaymentDetails';
import EmailSettings from '../../components/BottomSheetModals/EmailSettings';

export default function Account({ navigation }) {
	const [isModalVisible, setModalVisible] = useState({ visible: false, components: { profile: false, join: false, payment: false, emailSetting: false, lock: false } });
	const bottomSheetRef = useRef(["profile", "join", "payment", "emailSetting"]);
	const snapPoints = useMemo(() => ['26%', "77%", "90"], []);
	const handleSheet = ((name) => {
		setModalVisible({ visible: true, components: { ...isModalVisible.components, [name]: true } });
		bottomSheetRef.current[name].present();
		trigger("impactMedium");
	});
	BackHandler.addEventListener('hardwareBackPress', () => {
		if (isModalVisible.components.profile) bottomSheetRef.current['profile'].forceClose();
		if (isModalVisible.components.join) bottomSheetRef.current['join'].forceClose();
		if (isModalVisible.components.payment) bottomSheetRef.current['payment'].forceClose();
	});
	return (
		<View pointerEvents={isModalVisible.visible ? "none" : "auto"} className={`flex-1 pointer-events-none ${isModalVisible.visible ? 'bg-[#BEBEBE]' : 'bg-[#FFFFFf]'}`}>

			<View className='mt-14 pb-[12px] border-[#D8D8D8] border-b-[0.55px]'><Text className='text-black text-xl font-[Poppins-Medium] ml-5'>Account</Text></View>

			<AccountPage isModalVisible={isModalVisible} handleSheet={handleSheet} />

			<BottomSheetModal name='profile' ref={ref => (bottomSheetRef.current['profile'] = ref)} index={0} snapPoints={snapPoints} backgroundStyle={{ backgroundColor: '#fff', borderRadius: 40, }} onChange={() => { setModalVisible({ ...isModalVisible, visible: true, components: { profile: true } }) }} onDismiss={() => { setModalVisible({ ...isModalVisible, visible: false, components: { profile: false } }) }} >
				<Profile sheet={bottomSheetRef.current['profile']} />
			</BottomSheetModal>

			<BottomSheetModal name='join' ref={ref => (bottomSheetRef.current['join'] = ref)} index={0} snapPoints={snapPoints} backgroundStyle={{ backgroundColor: '#fff', borderRadius: 40, }} onChange={() => { setModalVisible({ ...isModalVisible, visible: true, components: { join: true } }) }} onDismiss={() => { setModalVisible({ ...isModalVisible, visible: false, components: { join: false } }) }} >
				<JoinByLink sheet={bottomSheetRef.current['join']} />
			</BottomSheetModal>

			<BottomSheetModal name='payment' ref={ref => (bottomSheetRef.current['payment'] = ref)} index={0} snapPoints={snapPoints} backgroundStyle={{ backgroundColor: '#fff', borderRadius: 40, }} onChange={() => { setModalVisible({ ...isModalVisible, visible: true, components: { payment: true } }) }} onDismiss={() => { setModalVisible({ ...isModalVisible, visible: false, components: { payment: false } }) }} >
				<PaymentDetails sheet={bottomSheetRef.current['payment']} />
			</BottomSheetModal>

			<BottomSheetModal name='emailSetting' ref={ref => (bottomSheetRef.current['emailSetting'] = ref)} index={0} snapPoints={snapPoints} backgroundStyle={{ backgroundColor: '#fff', borderRadius: 40, }} onChange={() => { setModalVisible({ ...isModalVisible, visible: true, components: { emailSetting: true } }) }} onDismiss={() => { setModalVisible({ ...isModalVisible, visible: false, components: { emailSetting: false } }) }} >
				<EmailSettings sheet={bottomSheetRef.current['emailSetting']} />
			</BottomSheetModal>

		</View >
	)
}