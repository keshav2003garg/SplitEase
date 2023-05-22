import React, { useEffect } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import PieChart from 'react-native-pie-chart';

import { fetchExpenseChart } from '../../actions/userActions';

export default function Charts() {
	const dispatch = useDispatch();
	const { chartData, user } = useSelector(state => state.user);

	useEffect(() => {
		dispatch(fetchExpenseChart(user.userID));
	}, [])

	const series = chartData;
	const categories = [
		{ name: 'Food', icon: require('../../../assets/icons/categories/food.png') },
		{ name: 'Drinks', icon: require('../../../assets/icons/categories/drinks.png') },
		{ name: 'Beverages', icon: require('../../../assets/icons/categories/beverages.png') },
		{ name: 'Travel', icon: require('../../../assets/icons/categories/travel.png') },
		{ name: 'Taxi', icon: require('../../../assets/icons/categories/taxi.png') },
		{ name: 'Hotel', icon: require('../../../assets/icons/categories/hotel.png') },
		{ name: 'Shopping', icon: require('../../../assets/icons/categories/shopping.png') },
		{ name: 'Utilities', icon: require('../../../assets/icons/categories/utilities.png') },
		{ name: 'Medical', icon: require('../../../assets/icons/categories/medical.png') },
		{ name: 'EntryTicket', icon: require('../../../assets/icons/categories/entryTicket.png') },
		{ name: 'Others', icon: require('../../../assets/icons/categories/others.png') },
	]
	const sliceColor = ['#F44336', '#9C27B0', '#3F51B5', '#03A9F4', '#009688', '#8BC34A', '#FFEB3B', '#FF9800', '#795548', '#607D8B', '#E91E63'];
	return (
		<View className='flex-1'>

			<View className='mt-14 pb-[12px] border-[#D8D8D8] border-b-[0.55px]'><Text className='text-black text-xl font-[Poppins-Medium] ml-5'>Charts</Text></View>

			<View className='flex justify-center items-center bg-[#F5F5F5] m-5 py-10 rounded-3xl'>
				{chartData?.length > 0 && <PieChart widthAndHeight={350} series={series} sliceColor={sliceColor} doughnut={true} coverRadius={0.6} coverFill={'#FFFFFF'} />}
				<View className='mt-4 p-3 flex-row flex-wrap'>
					{chartData?.length > 0 && categories.map((item, index) => <ChartCategories item={item} index={index} sliceColor={sliceColor} key={item.name} chartData={chartData} />)}
				</View>

			</View>

			<View className='mt-4 pb-[12px] border-[#D8D8D8] border-b-[0.55px]'><Text className='text-black text-xl font-[Poppins-Medium] ml-5'>Categories</Text></View>

			{chartData?.length > 0 &&
				<View className='flex-1'>
					<FlatList data={categories} renderItem={({ item, index }) => <CategoriesList item={item} index={index} chartData={chartData} sliceColor={sliceColor} />} keyExtractor={(item, index) => index.toString()} />
				</View>
			}

		</View>
	)
}


const ChartCategories = ({ item, index, sliceColor, chartData }) => {
	if (chartData[index] > 0) {
		return (
			<View className='m-1 px-2 rounded-3xl border-[#D8D8D8] border-[1px] flex-row items-center'><View style={{ backgroundColor: `${sliceColor[index]}` }} className={`rounded-full w-3 h-3 mr-3`}></View><Text className='text-black text-base font-[Poppins-Medium]'>{item.name}</Text></View>
		)
	}
}

const CategoriesList = ({ item, index, chartData, sliceColor }) => {
	let totalAmount = chartData.reduce((a, b) => a + b, 0) || 1;
	return (
		<View className='flex-row items-center bg-[#F5F5F5] rounded-xl py-2 px-4 m-2'>
			<View className='p-2 bg-[#BEBEBE] rounded-lg'><Image source={item.icon} className='w-10 h-10' /></View>
			<View className='flex-1'>
				<View className='mx-3 flex-row justify-between'>
					<Text className='text-black text-base font-[Poppins-Medium]'>{item.name}</Text>
					<Text className='text-black text-base font-[Poppins-Medium]'><Text className='text-amber-900'>₹ {chartData[index]}</Text>/₹ {totalAmount}</Text>
				</View>
				<View className='mx-3 mt-1'><ProgressBar style={{ borderRadius: 40, height: 7 }} progress={chartData[index] / totalAmount} color={sliceColor[index]} /></View>
			</View>
		</View>
	)
}