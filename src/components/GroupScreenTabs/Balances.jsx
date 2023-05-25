import React, { useMemo, useState, useRef, useEffect } from 'react'
import { View, Text, Image, FlatList, TouchableNativeFeedback, Linking, BackHandler } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { TextInput } from 'react-native-paper';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import ANT from 'react-native-vector-icons/AntDesign';

import { addSettlement } from '../../actions/userActions';

export default function Balances({ balance, user, groupInfo }) {
	return (
		<FlatList data={balance} renderItem={({ item }) => <BalanceList item={item} user={user} groupInfo={groupInfo} />} />
	)
}

const BalanceList = ({ item, user, groupInfo }) => {
	const borrower = item?.balance > 0 ? item : user;
	const lender = item?.balance > 0 ? user : item;
	let remind = `sms:+91${borrower?.phoneNumber}?text=Hey%20${borrower?.name}%2C%0A%0AJust%20a%20quick%20note%20to%20remind%20you%20about%20the%20money%20I%20lent%20you.%20Remember%20that%20₹${Math.abs(item.balance)}%20you%20borrowed%20from%20me%3F%20Well%2C%20it%27s%20time%20for%20us%20to%20settle%20up%21%0AI%20totally%20understand%20that%20things%20can%20slip%20our%20minds%2C%20but%20I%27d%20really%20appreciate%20it%20if%20you%20could%20pay%20me%20back%20as%20soon%20as%20you%20can.%20Your%20promptness%20would%20mean%20a%20lot%20to%20me.%0A%0AOnce%20you%27ve%20made%20the%20payment%2C%20shoot%20me%20a%20quick%20message%20or%20give%20me%20a%20call%20to%20let%20me%20know.%20That%20way%2C%20I%20can%20keep%20track%20of%20things%20and%20make%20sure%20everything%27s%20squared%20away.%0A%0AThanks%20a%20bunch%20for%20taking%20care%20of%20this.%20I%20really%20value%20our%20friendship%2C%20and%20I%20know%20life%20can%20get%20busy.%20Just%20hoping%20we%20can%20wrap%20this%20up%20soon%21%0AIf%20you%20have%20any%20questions%20or%20need%20more%20info%2C%20feel%20free%20to%20reach%20out.%20Looking%20forward%20to%20getting%20this%20sorted%20out.%0A%0ACheers%2C%0A%0A${lender?.name}`;

	if (borrower?.phoneNumber !== '') remind = `https://wa.me/+91${borrower?.phoneNumber}?text=Hey%20${borrower?.name}%2C%0A%0AJust%20a%20quick%20note%20to%20remind%20you%20about%20the%20money%20I%20lent%20you.%20Remember%20that%20₹${Math.abs(item.balance)}%20you%20borrowed%20from%20me%3F%20Well%2C%20it%27s%20time%20for%20us%20to%20settle%20up%21%0AI%20totally%20understand%20that%20things%20can%20slip%20our%20minds%2C%20but%20I%27d%20really%20appreciate%20it%20if%20you%20could%20pay%20me%20back%20as%20soon%20as%20you%20can.%20Your%20promptness%20would%20mean%20a%20lot%20to%20me.%0A%0AOnce%20you%27ve%20made%20the%20payment%2C%20shoot%20me%20a%20quick%20message%20or%20give%20me%20a%20call%20to%20let%20me%20know.%20That%20way%2C%20I%20can%20keep%20track%20of%20things%20and%20make%20sure%20everything%27s%20squared%20away.%0A%0AThanks%20a%20bunch%20for%20taking%20care%20of%20this.%20I%20really%20value%20our%20friendship%2C%20and%20I%20know%20life%20can%20get%20busy.%20Just%20hoping%20we%20can%20wrap%20this%20up%20soon%21%0AIf%20you%20have%20any%20questions%20or%20need%20more%20info%2C%20feel%20free%20to%20reach%20out.%20Looking%20forward%20to%20getting%20this%20sorted%20out.%0A%0ACheers%2C%0A%0A${lender?.name}`;
	else remind = `mailto:${borrower?.email}?subject=Payment%20Due%20for%20${groupInfo.groupName}&body=Hey%20${borrower?.name}%2C%0A%0AJust%20a%20quick%20note%20to%20remind%20you%20about%20the%20money%20I%20lent%20you.%20Remember%20that%20₹${Math.abs(item.balance)}%20you%20borrowed%20from%20me%3F%20Well%2C%20it%27s%20time%20for%20us%20to%20settle%20up%21%0AI%20totally%20understand%20that%20things%20can%20slip%20our%20minds%2C%20but%20I%27d%20really%20appreciate%20it%20if%20you%20could%20pay%20me%20back%20as%20soon%20as%20you%20can.%20Your%20promptness%20would%20mean%20a%20lot%20to%20me.%0A%0AOnce%20you%27ve%20made%20the%20payment%2C%20shoot%20me%20a%20quick%20message%20or%20give%20me%20a%20call%20to%20let%20me%20know.%20That%20way%2C%20I%20can%20keep%20track%20of%20things%20and%20make%20sure%20everything%27s%20squared%20away.%0A%0AThanks%20a%20bunch%20for%20taking%20care%20of%20this.%20I%20really%20value%20our%20friendship%2C%20and%20I%20know%20life%20can%20get%20busy.%20Just%20hoping%20we%20can%20wrap%20this%20up%20soon%21%0AIf%20you%20have%20any%20questions%20or%20need%20more%20info%2C%20feel%20free%20to%20reach%20out.%20Looking%20forward%20to%20getting%20this%20sorted%20out.%0A%0ACheers%2C%0A%0A${lender?.name}`

	const [isModalVisible, setModalVisible] = useState(false);
	const bottomSheetModalRef = useRef(null);
	const snapPoints = useMemo(() => ["90"], []);
	const handleSheet = () => {
		setModalVisible(true);
		bottomSheetModalRef.current?.present();
	}
	BackHandler.addEventListener('hardwareBackPress', () => {
		if (isModalVisible) {
			bottomSheetModalRef.current?.forceClose();
		}
	});

	const [selectedMethod, setSelectedMethod] = useState({ upi: false, paytm: false, cash: true });

	const dispatch = useDispatch();

	const handleSettleUp = () => {
		bottomSheetModalRef.current?.close();
		dispatch(addSettlement(groupInfo.groupID, borrower.balance, borrower, lender, "Cash"));
	}


	return (
		item?.balance !== 0 &&
		<View className='bg-slate-50 my-2 mx-3 p-2 rounded-lg'>
			<View className='flex-row justify-between items-center pb-3'>

				<View className='items-center p-3 border-[#D8D8D8] border-[1px] rounded-lg bg-slate-200'>
					<View className='rounded-full overflow-hidden'><Image className='w-12 h-12' source={{ uri: borrower.avatar }} /></View>
					<Text className='text-black text-[13px] font-[Poppins-Medium]  mt-2'>{borrower.name}</Text>
				</View>

				<View><ANT name='arrowright' size={25} color={'#000'} /></View>

				<View>
					<Text className='text-[13px] text-[#5A5A5A] font-[Poppins-Medium] ml-3'>will pay</Text>
					<Text className='text-[17px] text-[#5A5A5A] font-[Poppins-Medium] ml-3'>₹ {Math.abs(item.balance)}</Text>
				</View>

				<View><ANT name='arrowright' size={25} color={'#000'} /></View>

				<View className='items-center p-3 border-[#D8D8D8] border-[1px] rounded-lg bg-slate-200'>
					<View className='rounded-full overflow-hidden'><Image className='w-12 h-12' source={{ uri: lender.avatar }} /></View>
					<Text className='text-black text-[13px] font-[Poppins-Medium]  mt-2'>{lender.name}</Text>
				</View>

			</View>

			<View className='flex-row justify-between items-center py-3 border-[#D8D8D8] border-t-[0.55px]'>
				<TouchableNativeFeedback onPress={() => { Linking.openURL(remind) }}><View className='p-[10px] rounded-lg bg-[#000000]'><Text className='text-sm text-white font-[Poppins-Medium]'>Remind</Text></View></TouchableNativeFeedback>
				<TouchableNativeFeedback onPress={handleSheet}><View className='p-[10px] rounded-lg bg-[#009E60]'><Text className='text-sm text-white font-[Poppins-Medium]'>SettleUp</Text></View></TouchableNativeFeedback>
			</View>

			<BottomSheetModal name='settings' ref={bottomSheetModalRef} index={0} snapPoints={snapPoints} backgroundStyle={{ backgroundColor: '#F5F5F5', borderRadius: 40, }} onChange={() => { setModalVisible(true) }} onDismiss={() => { setModalVisible(false) }} >

				<View className='mt-5 pb-[12px] border-[#D8D8D8] border-b-[0.55px]'><Text className='text-black text-lg font-[Poppins-Medium] ml-5'>Record a Payment</Text></View>

				<View className='flex-row justify-between items-center pb-3 m-6'>
					<View className='items-center p-3 border-[#D8D8D8] border-[1px] rounded-lg bg-slate-200'>
						<View className='rounded-full overflow-hidden'><Image className='w-12 h-12' source={{ uri: borrower.avatar }} /></View>
						<Text className='text-black text-[13px] font-[Poppins-Medium] mt-2'>{borrower.name}</Text>
					</View>

					<View><ANT name='arrowright' size={25} color={'#000'} /></View>

					<View className='items-center p-3 border-[#D8D8D8] border-[1px] rounded-lg bg-slate-200'>
						<View className='rounded-full overflow-hidden'><Image className='w-12 h-12' source={{ uri: lender.avatar }} /></View>
						<Text className='text-black text-[13px] font-[Poppins-Medium] mt-2'>{lender.name}</Text>
					</View>
				</View>

				<TextInput className='mx-3 mb-2' label={<Text className='text-base font-[Poppins-Medium]'>Enter Amount</Text>} value={borrower.balance.toString()} contentStyle={{ fontFamily: 'Poppins-Medium' }} mode='outlined' outlineColor='#5A5A5A' activeOutlineColor='#5A5A5A' outlineStyle={{ backgroundColor: 'white' }} inputMode='decimal' />


				<View className='mt-5 pb-[12px]'><Text className='text-black text-base font-[Poppins-Medium] ml-5'>Select Payment Method</Text></View>

				<TouchableNativeFeedback disabled onPress={() => { setSelectedMethod({ cash: false, upi: true, paytm: false }) }}>
					<View className={`my-2 mx-6 flex-row items-center ${selectedMethod.upi ? 'p-3 border-[#D8D8D8] border-[1px] rounded-lg bg-slate-200' : ''}`}>
						<Image className='h-20 w-20 mr-3' source={require('../../../assets/icons/upi.png')}></Image>
						<TextInput disabled={!selectedMethod.upi} className='flex-1' label={<Text className='text-base font-[Poppins-Medium]'>UPI ID</Text>} contentStyle={{ fontFamily: 'Poppins-Medium' }} mode='outlined' outlineColor='#5A5A5A' activeOutlineColor='#5A5A5A' outlineStyle={{ backgroundColor: 'white' }} />
					</View>
				</TouchableNativeFeedback>
				<TouchableNativeFeedback disabled onPress={() => { setSelectedMethod({ cash: false, upi: false, paytm: true }) }}>
					<View className={`mx-6 flex-row items-center ${selectedMethod.paytm ? 'p-3 border-[#D8D8D8] border-[1px] rounded-lg bg-slate-200' : ''}`}>
						<Image className='w-20 h-20 mr-3' source={require('../../../assets/icons/paytm.png')}></Image>
						<TextInput disabled={!selectedMethod.paytm} className='flex-1' label={<Text className='text-base font-[Poppins-Medium]'>Paytm Number</Text>} contentStyle={{ fontFamily: 'Poppins-Medium' }} mode='outlined' outlineColor='#5A5A5A' activeOutlineColor='#5A5A5A' outlineStyle={{ backgroundColor: 'white' }} />
					</View>
				</TouchableNativeFeedback>

				<View className='mt-5 pb-[12px]'><Text className='text-black text-base font-[Poppins-Medium] ml-5 text-center'>OR</Text></View>

				<TouchableNativeFeedback onPress={() => { setSelectedMethod({ cash: true, upi: false, paytm: false }) }}>
					<View className={`overflow-hidden flex items-center mx-32 ${selectedMethod.cash ? 'p-3 border-[#D8D8D8] border-[1px] rounded-lg bg-slate-200' : ''}`}>
						<Image className='w-28 h-w-28' source={require('../../../assets/icons/cash.png')} />
					</View>
				</TouchableNativeFeedback>

				<TouchableNativeFeedback onPress={handleSettleUp}>
					<View className='mx-3 my-5 py-3 bg-black rounded-xl'><Text className='text-white text-center text-base font-[Poppins-Medium]'>Settle Up</Text></View>
				</TouchableNativeFeedback>

			</BottomSheetModal>

		</View>
	)
}