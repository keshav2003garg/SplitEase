import React from 'react'
import { View, Text, ScrollView } from 'react-native'

export default function Total({ totalGroupSpent, you_paid, your_share }) {
	return (
		<ScrollView>
			<View className='flex-row justify-between items-center my-2 mx-3 p-2 rounded-md'>
				<Text className='text-black text-base font-[Poppins-Medium]'>Total Group Spending</Text>
				<Text className='text-black text-base font-[Poppins-Medium]'>₹ {totalGroupSpent}</Text>
			</View>
			<View className='flex-row justify-between items-center my-2 mx-3 p-2 rounded-md'>
				<Text className='text-black text-base font-[Poppins-Medium]'>Total You Paid for</Text>
				<Text className='text-black text-base font-[Poppins-Medium]'>₹ {you_paid}</Text>
			</View>
			<View className='flex-row justify-between items-center my-2 mx-3 p-2 rounded-md'>
				<Text className='text-black text-base font-[Poppins-Medium]'>Your Total Share</Text>
				<Text className='text-black text-base font-[Poppins-Medium]'>₹ {your_share}</Text>
			</View>
		</ScrollView>
	)
}