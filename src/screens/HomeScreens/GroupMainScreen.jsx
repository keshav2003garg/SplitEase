import React from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import MI from 'react-native-vector-icons/MaterialIcons';
import { SharedElement } from 'react-navigation-shared-element';

export default function GroupMainScreen() {
	return (
		<View className='flex-1'>

			<Image className='flex-1' source={require('../../../assets/img/group-bg.png')} />

			<View className='absolute top-24 left-14 border-white border-[3px] rounded-xl overflow-hidden'><SharedElement id='img'><Image className='w-24 h-24 rounded-lg' source={require('../../../assets/img/trip.png')} /></SharedElement></View>

			<ScrollView className='flex-[5_5_0%]'>
				<View className='mt-16 ml-14'>
					<Text className='text-black text-[20px] font-[Poppins-Medium]'>Mussorie Trip</Text>
					<Text className='text-black text-sm font-[Poppins-Medium]'>Akshat owes you ₹775</Text>
				</View>
				<ScrollView className='mx-6 my-6' horizontal >
					<View className='flex-row justify-center items-center mx-1 p-2 border-[#5A5A5A] border-2 rounded-xl bg-[#5d5d5d]'>
						<Text className='text-black text-[13px] font-[Poppins-Medium]'>Expenses</Text>
					</View>
					<View className='flex-row justify-center items-center mx-1 p-2 border-[#5A5A5A] border-2 rounded-xl'>
						<Text className='text-black text-[13px] font-[Poppins-Medium]'>Balances</Text>
					</View>
					<View className='flex-row justify-center items-center mx-1 p-2 border-[#5A5A5A] border-2 rounded-xl'>
						<Text className='text-black text-[13px] font-[Poppins-Medium]'>Total</Text>
					</View>
					<View className='flex-row justify-center items-center mx-1 p-2 border-[#5A5A5A] border-2 rounded-xl'>
						<Text className='text-black text-[13px] font-[Poppins-Medium]'>Payments</Text>
					</View>
				</ScrollView>
				<View>
					<Text className='text-[15px] text-[#5A5A5A] font-[Poppins-Medium] ml-3'>April 2023</Text>
					<View className='flex-row justify-between items-center bg-slate-50 my-2 mx-3 p-2 rounded-md'>
						<View className='flex-row items-center'>
							<View className='items-center justify-center'>
								<Text className='text-[10px] text-[#5A5A5A] font-[Poppins-Regular]'>Apr</Text>
								<Text className='text-[18px] text-[#5A5A5A] font-[Poppins-Medium] leading-5'>20</Text>
							</View>
							<View className='mx-3 p-2 bg-slate-300 rounded-lg'><MI name='music-note' size={30} color={'black'} /></View>
							<View>
								<Text className='text-base text-black font-[Poppins-Medium]'>Food</Text>
								<Text className='text-sm text-[#5A5A5A] font-[Poppins-Regular]'>George Paid $68</Text>
							</View>
						</View>
						<View className='items-end'>
							<Text className='text-[13px] text-[#5A5A5A] font-[Poppins-Medium] ml-3'>you borrowed</Text>
							<Text className='text-[17px] text-[#5A5A5A] font-[Poppins-Medium] ml-3'>$25.365</Text>
						</View>
					</View>
				</View>
			</ScrollView>

		</View>
	)
}