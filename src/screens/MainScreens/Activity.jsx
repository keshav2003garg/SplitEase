import React from 'react';
import { View, Text, FlatList } from 'react-native';

import ActivityBar from '../../components/ActivityBar';

export default function Activity() {

	const data = [
		{
			month: 'Apr',
			date: '20',
			category: 'Food',
			subCategory: 'Mussorie Trip',
			amount: '$25.365',
			share: 'Abhay'
		},
		{
			month: 'Apr',
			date: '20',
			category: 'Food',
			subCategory: 'Mussorie Trip',
			amount: '$25.365',
			share: 'Abhay'
		},
	]

	return (
		<View className='flex-1'>

			<View className='mt-14 pb-[12px] border-[#D8D8D8] border-b-[0.55px]'><Text className='text-black text-xl font-[Poppins-Medium] ml-5'>Activity</Text></View>

			<FlatList data={data} renderItem={({ item }) => <ActivityBar data={item} />} keyExtractor={(item, index) => index.toString()} />

		</View>
	)
}





