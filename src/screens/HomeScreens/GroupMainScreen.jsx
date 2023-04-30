import React, { useRef, useState, useMemo, useEffect } from 'react';
import { View, Text, Image, TouchableNativeFeedback, BackHandler } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { trigger } from "react-native-haptic-feedback";
import MI from 'react-native-vector-icons/MaterialIcons';
import { SharedElement } from 'react-navigation-shared-element';

import { fetchGroup } from '../../actions/userActions';

import GroupSettings from '../../components/BottomSheetModals/GroupSettings';
import Expenses from '../../components/GroupScreenTabs/Expenses';
import Balances from '../../components/GroupScreenTabs/Balances';
import Total from '../../components/GroupScreenTabs/Total';
import Payments from '../../components/GroupScreenTabs/Payments';

const GroupMainScreen = ({ route, navigation }) => {
	const { data } = route.params;
	const dispatch = useDispatch();
	const { groupInfo, localLoading } = useSelector(state => state.user);
	const [tab, setTab] = useState({ expenses: true, balances: false, total: false, payments: false });
	const [isModalVisible, setModalVisible] = useState(false);
	const bottomSheetModalRef = useRef(null);
	const snapPoints = useMemo(() => ["64%", "90"], []);
	const handleSheet = () => {
		setModalVisible(true);
		bottomSheetModalRef.current?.present();
		trigger("impactLight", { mode: "medium" });
	}
	BackHandler.addEventListener('hardwareBackPress', () => {
		if (isModalVisible) {
			bottomSheetModalRef.current?.close();
			setModalVisible(false);
		}
	});
	useEffect(() => {
		dispatch(fetchGroup(data.groupID));
	}, []);
	return (
		<View pointerEvents={isModalVisible ? "none" : "auto"} className={`flex-1 ${isModalVisible ? 'bg-[#BEBEBE]' : 'bg-[#FFFFFf]'}`}>

			<Image className='flex-1' source={require('../../../assets/img/group-bg.png')} />

			<TouchableNativeFeedback onPress={() => { navigation.goBack() }}><View className='absolute top-12 left-3'><MI name='arrow-back' color={'white'} size={25} /></View></TouchableNativeFeedback>
			<TouchableNativeFeedback onPress={handleSheet} ><View className='absolute top-12 right-3'><MI name='settings' color={'white'} size={25} /></View></TouchableNativeFeedback>

			<View className='absolute top-24 left-14 border-white border-[3px] rounded-xl overflow-hidden'><SharedElement id={`data.${data.groupImage}.image`}><Image className='w-24 h-24' source={{ uri: groupInfo.groupImage }} /></SharedElement></View>

			<View className='flex-[5_5_0%]'>

				<View className='mt-16 ml-14'>
					{localLoading ? <View className='my-1 w-20 h-5 rounded-full bg-[#D8D8D8]'></View> : <Text className='text-black text-[20px] font-[Poppins-Medium]'>{groupInfo.groupName}</Text>}
					<Text className='text-black text-sm font-[Poppins-Medium]'>Akshat owes you ₹775</Text>
				</View>

				<View className='mx-6 my-6 flex-row' >
					<TouchableNativeFeedback onPress={() => { setTab({ expenses: true, balances: false, total: false, payments: false }) }}>
						<View className={`mx-2 p-2 border-[#AAAAAA] border-[0.6px] rounded-md border-b-4 border-b-[#AAAAAA] ${tab.expenses ? 'bg-[#808080]' : ''}`}>
							<Text className='text-black text-[13px] font-[Poppins-Medium]'>Expenses</Text>
						</View>
					</TouchableNativeFeedback>
					<TouchableNativeFeedback onPress={() => { setTab({ expenses: false, balances: true, total: false, payments: false }) }}>
						<View className={`mx-2 p-2 border-[#AAAAAA] border-[0.6px] rounded-md border-b-4 border-b-[#AAAAAA] ${tab.balances ? 'bg-[#808080]' : ''}`}>
							<Text className='text-black text-[13px] font-[Poppins-Medium]'>Balances</Text>
						</View>
					</TouchableNativeFeedback>
					<TouchableNativeFeedback onPress={() => { setTab({ expenses: false, balances: false, total: true, payments: false }) }}>
						<View className={`mx-2 p-2 border-[#AAAAAA] border-[0.6px] rounded-md border-b-4 border-b-[#AAAAAA] ${tab.total ? 'bg-[#808080]' : ''}`}>
							<Text className='text-black text-[13px] font-[Poppins-Medium]'>Total</Text>
						</View>
					</TouchableNativeFeedback>
					<TouchableNativeFeedback onPress={() => { setTab({ expenses: false, balances: false, total: false, payments: true }) }}>
						<View className={`mx-2 p-2 border-[#AAAAAA] border-[0.6px] rounded-md border-b-4 border-b-[#AAAAAA] ${tab.payments ? 'bg-[#808080]' : ''}`}>
							<Text className='text-black text-[13px] font-[Poppins-Medium]'>Payments</Text>
						</View>
					</TouchableNativeFeedback>
				</View>

				{tab.expenses && <Expenses />}
				{tab.balances && <Balances />}
				{tab.total && <Total />}
				{tab.payments && <Payments />}

				<BottomSheetModal name='settings' ref={bottomSheetModalRef} index={0} snapPoints={snapPoints} backgroundStyle={{ backgroundColor: '#fff', borderRadius: 40, }} onChange={() => { setModalVisible(true) }} onDismiss={() => { setModalVisible(false) }} >
					<GroupSettings data={data} sheet={bottomSheetModalRef.current} navigation={navigation} />
				</BottomSheetModal>

			</View>

		</View>
	)
}

GroupMainScreen.sharedElements = (route) => {
	const { data } = route.params;
	return [{
		id: `data.${data.groupImage}.image`
	}];
};

export default GroupMainScreen;