import React, { useRef, useState, useMemo, useEffect } from 'react';
import { View, Text, Image, TouchableNativeFeedback, BackHandler, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { trigger } from "react-native-haptic-feedback";
import MI from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/FontAwesome5';
import { SharedElement } from 'react-navigation-shared-element';

import { fetchGroup, fetchbalance } from '../../actions/userActions';

import GroupSettings from '../../components/BottomSheetModals/GroupSettings';
import Expenses from '../../components/GroupScreenTabs/Expenses';
import Balances from '../../components/GroupScreenTabs/Balances';
import Total from '../../components/GroupScreenTabs/Total';
import Payments from '../../components/GroupScreenTabs/Payments';

const GroupMainScreen = ({ route, navigation }) => {
	const { data } = route.params;
	const dispatch = useDispatch();
	const { groupInfo, localLoading, user, balance, tabLoading, total, totalGroupSpent, you_paid, your_share } = useSelector(state => state.user);
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
			bottomSheetModalRef.current?.forceClose();
		}
	});
	useEffect(() => {
		dispatch(fetchGroup(data.groupID, user.userID));
		dispatch(fetchbalance(user.userID, data.groupID));
	}, []);
	return (
		<View pointerEvents={isModalVisible ? "none" : "auto"} className={`flex-1 ${isModalVisible ? 'bg-[#BEBEBE]' : 'bg-[#FFFFFf]'}`}>

			<StatusBar barStyle='light-content' />

			<Image className='flex-1' source={require('../../../assets/img/group-bg.png')} />

			<TouchableNativeFeedback onPress={() => { navigation.goBack() }}><View className='absolute top-12 left-3'><MI name='arrow-back' color={'white'} size={25} /></View></TouchableNativeFeedback>
			<TouchableNativeFeedback onPress={handleSheet} ><View className='absolute top-12 right-3'><MI name='settings' color={'white'} size={25} /></View></TouchableNativeFeedback>

			<View className='absolute top-24 left-14 border-white border-[3px] rounded-xl overflow-hidden'><SharedElement id={`data.${data.groupImage}.image`}><Image className='w-24 h-24' source={{ uri: data.groupImage || groupInfo.groupImage }} /></SharedElement></View>

			<View className='flex-[5_5_0%]'>

				<View className='mt-16 ml-14'>
					{localLoading ? <View className='my-1 w-20 h-[25.5px] rounded-full bg-[#D8D8D8]'></View> : <Text className='text-black text-[20px] font-[Poppins-Medium]'>{data.groupName || groupInfo.groupName}</Text>}
					{tabLoading ?
						<View className='my-1 w-44 h-5 rounded-full bg-[#D8D8D8]'></View>
						:
						total === 0 ?
							<Text className='text-[#5A5A5A] text-base font-[Poppins-Medium] mb-1'>You are all settled up</Text>
							:
							total > 0 ?
								<Text className='text-[#03a37e] text-base font-[Poppins-Medium] mb-1'>You lend ₹{total} overall</Text>
								:
								<Text className='text-[#ed4f00] text-base font-[Poppins-Medium] mb-1'>You borrow ₹{-total} overall</Text>
					}
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

				{tab.expenses && <Expenses data={groupInfo} user={user} loading={localLoading} />}
				{tab.balances && <Balances balance={balance} user={user} />}
				{tab.total && <Total totalGroupSpent={totalGroupSpent} you_paid={you_paid} your_share={your_share} />}
				{tab.payments && <Payments />}

				<View className='absolute bottom-4 right-5' onPress={() => { navigation.navigate('AddExpense') }} >
					<TouchableNativeFeedback onPress={() => { navigation.navigate('AddExpense', { alreadySelected: true, group: groupInfo }) }}>
						<View animation={'bounceInUp'} className='flex-row items-center rounded-[50px] bg-[#03a37e] p-[10px] px-[15px]'>
							<View className='m-[5px]'><Feather name='money-bill-wave' color='white' size={20} /></View>
							<Text className='m-[5px] text-white text-[15px] font-[Poppins-Medium]'>Add Expense</Text>
						</View>
					</TouchableNativeFeedback>
				</View>

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