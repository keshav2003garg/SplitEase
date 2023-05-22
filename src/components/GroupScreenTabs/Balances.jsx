import React from 'react'
import { View, Text, Image, FlatList, TouchableNativeFeedback } from 'react-native'
import ANT from 'react-native-vector-icons/AntDesign';

export default function Balances({ balance, user }) {
	return (
		<FlatList data={balance} renderItem={({ item }) => <BalanceList item={item} user={user} />} />
	)
}

const BalanceList = ({ item, user }) => {
	const borrower = item?.balance > 0 ? item : user;
	return (
		item?.balance !== 0 &&
		<View className='bg-slate-50 my-2 mx-3 p-2 rounded-lg'>
			<View className='flex-row justify-between items-center pb-3'>

				{item?.balance > 0 ?
					<View className='items-center'>
						<View className='rounded-full overflow-hidden'><Image className='w-12 h-12' source={{ uri: item.avatar }} /></View>
						<Text className='text-black text-[13px] font-[Poppins-Medium]'>{item.name}</Text>
					</View>
					:
					<View className='items-center'>
						<View className='rounded-full overflow-hidden'><Image className='w-12 h-12' source={{ uri: user.avatar }} /></View>
						<Text className='text-black text-[13px] font-[Poppins-Medium]'>{user.name}</Text>
					</View>
				}

				<View><ANT name='arrowright' size={25} color={'#000'} /></View>

				<View>
					<Text className='text-[13px] text-[#5A5A5A] font-[Poppins-Medium] ml-3'>will pay</Text>
					<Text className='text-[17px] text-[#5A5A5A] font-[Poppins-Medium] ml-3'>₹ {Math.abs(item.balance)}</Text>
				</View>

				<View><ANT name='arrowright' size={25} color={'#000'} /></View>

				{item?.balance > 0 ?
					<View className='items-center'>
						<View className='rounded-full overflow-hidden'><Image className='w-12 h-12' source={{ uri: user.avatar }} /></View>
						<Text className='text-black text-[13px] font-[Poppins-Medium]'>{user.name}</Text>
					</View>
					:
					<View className='items-center'>
						<View className='rounded-full overflow-hidden'><Image className='w-12 h-12' source={{ uri: item.avatar }} /></View>
						<Text className='text-black text-[13px] font-[Poppins-Medium]'>{item.name}</Text>
					</View>
				}

			</View>

			<View className='flex-row justify-between items-center py-3 border-[#D8D8D8] border-t-[0.55px]'>
				<TouchableNativeFeedback><View className='p-[10px] rounded-lg bg-[#000000]'><Text className='text-sm text-white font-[Poppins-Medium]'>Remind</Text></View></TouchableNativeFeedback>
				<TouchableNativeFeedback><View className='p-[10px] rounded-lg bg-[#009E60]'><Text className='text-sm text-white font-[Poppins-Medium]'>SettleUp</Text></View></TouchableNativeFeedback>
			</View>

		</View>
	)
}