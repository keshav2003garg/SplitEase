import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, TouchableNativeFeedback } from 'react-native';

import CategoriesChart from '../ChartScreens/CategoriesChart';
import GroupsCharts from '../ChartScreens/GroupsCharts';
import SpendsChart from '../ChartScreens/SpendsChart';

export default function Charts() {
	const { groups } = useSelector(state => state.user);
	const [tab, setTab] = useState('Categories');

	return (
		<View className='flex-1'>

			<View className='mt-14 pb-[12px] border-[#D8D8D8] border-b-[0.55px]'><Text className='text-black text-xl font-[Poppins-Medium] ml-5'>Charts</Text></View>

			<View className='flex-row justify-between items-center bg-[#F5F5F5] m-5 px-8 py-3 rounded-3xl'>
				<TouchableNativeFeedback onPress={() => { setTab('Categories') }}><View className={`p-2 px-3 rounded-xl ${tab == 'Categories' ? 'bg-black' : ''}`}><Text className={`text-${tab == 'Categories' ? 'white' : 'black'} text-base font-[Poppins-Medium]`}>Categories</Text></View></TouchableNativeFeedback>
				<TouchableNativeFeedback onPress={() => { setTab('Groups') }} disabled={groups.length==0}><View className={`p-2 px-3 rounded-xl ${tab == 'Groups' ? 'bg-black' : ''}`}><Text className={`text-${tab == 'Groups' ? 'white' : 'black'} text-base font-[Poppins-Medium]`}>Groups</Text></View></TouchableNativeFeedback>
				<TouchableNativeFeedback onPress={() => { setTab('Spends') }} disabled={groups.length==0}><View className={`p-2 px-3 rounded-xl ${tab == 'Spends' ? 'bg-black' : ''}`}><Text className={`text-${tab == 'Spends' ? 'white' : 'black'} text-base font-[Poppins-Medium]`}>Spends</Text></View></TouchableNativeFeedback>
			</View>

			{tab == 'Categories' && <CategoriesChart />}
			{tab == 'Groups' && <GroupsCharts />}
			{tab == 'Spends' && <SpendsChart />}

		</View>
	)
}