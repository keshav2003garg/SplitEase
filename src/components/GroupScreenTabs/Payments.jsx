import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, FlatList, Image } from 'react-native';
import MI from 'react-native-vector-icons/MaterialIcons';
import ANT from 'react-native-vector-icons/AntDesign';

import { fetchSettlements } from '../../actions/userActions';

export default function Payments({ groupInfo }) {
	const dispatch = useDispatch();
	const { settlements } = useSelector(state => state.user);

	useEffect(() => {
		dispatch(fetchSettlements(groupInfo?.groupID));
	}, []);

	let settlement = JSON.parse(JSON.stringify(settlements || []));
	settlement?.reverse()

	return (
		settlement.length === 0 ?
			<View className='mt-5 flex-1 justify-center items-center'><MI name='error-outline' size={50} color={'black'} /><Text className='text-[#5A5A5A] font-[Poppins-Medium]'>No Settlements</Text></View>
			:
			<FlatList data={settlement} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) => <SettlementsList item={item} />} />
	)
}


const SettlementsList = ({ item }) => {
	const date = new Date(item.settlementCreatedAt.seconds * 1000 + item.settlementCreatedAt.nanoseconds / 1000000);

	return (
		<View className='bg-slate-50 my-2 mx-3 p-2 rounded-lg'>
			<View className='flex-row justify-between items-center pb-3'>

				<View className='items-center p-3 border-[#D8D8D8] border-[1px] rounded-lg bg-slate-200'>
					<View className='rounded-full overflow-hidden'><Image className='w-12 h-12' source={{ uri: item.settlementPaidBy.avatar }} /></View>
					<Text className='text-black text-[13px] font-[Poppins-Medium]  mt-2'>{item.settlementPaidBy.name}</Text>
				</View>

				<View><ANT name='arrowright' size={25} color={'#000'} /></View>

				<View>
					<Text className='text-[13px] text-[#5A5A5A] font-[Poppins-Medium] ml-3'>paid</Text>
					<Text className='text-[17px] text-[#5A5A5A] font-[Poppins-Medium] ml-3'>₹ {Math.abs(item.settlementAmount)}</Text>
				</View>

				<View><ANT name='arrowright' size={25} color={'#000'} /></View>

				<View className='items-center p-3 border-[#D8D8D8] border-[1px] rounded-lg bg-slate-200'>
					<View className='rounded-full overflow-hidden'><Image className='w-12 h-12' source={{ uri: item.settlementPaidTo.avatar }} /></View>
					<Text className='text-black text-[13px] font-[Poppins-Medium]  mt-2'>{item.settlementPaidTo.name}</Text>
				</View>

			</View>


			<View className='flex-row justify-between items-center py-3 border-[#D8D8D8] border-t-[0.55px]'>
				<View className='p-[10px] mr-4 flex-1 rounded-lg bg-[#000000]'><Text className='text-sm text-white text-center font-[Poppins-Medium]'>{date.getDate()} {date.toLocaleString('default', { month: 'long' })} {date.getFullYear()} {date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</Text></View>
				<View className='p-[10px] ml-4 flex-1 rounded-lg bg-[#009E60]'><Text className='text-sm text-white text-center font-[Poppins-Medium]'>{item.settlementMethod}</Text></View>
			</View>
		</View>
	)
}