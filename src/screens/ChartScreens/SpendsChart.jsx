import React, { useEffect, useCallback, useState, memo } from 'react';
import { View, Text, ScrollView, Image, RefreshControl } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import PieChart from 'react-native-pie-chart';

import { fetchSpendsChart } from '../../actions/userActions';

function SpendsChart() {
	const dispatch = useDispatch();
	const { spendsChartData, user, chartLoading } = useSelector(state => state.user);
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		dispatch(fetchSpendsChart(user.userID));
		if (!chartLoading) setRefreshing(false);
	}, []);

	useEffect(() => {
		dispatch(fetchSpendsChart(user.userID));
	}, [])

	const groups = spendsChartData[0]
	const series = spendsChartData[1];
	const sliceColor = ['#F44336', '#9C27B0', '#3F51B5', '#03A9F4', '#009688', '#8BC34A', '#FFEB3B', '#FF9800', '#795548', '#607D8B', '#E91E63'];

	const totalAmount = spendsChartData[1]?.reduce((a, b) => a + b, 0);

	return (
		<ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

			<View className='flex justify-center items-center bg-[#F5F5F5] m-5 mt-2 py-10 rounded-3xl'>
				{spendsChartData?.length > 0 && totalAmount > 0 ?
					<PieChart widthAndHeight={350} series={series} sliceColor={sliceColor} doughnut={true} coverRadius={0.6} coverFill={'#FFFFFF'} />
					:
					<View className='flex justify-center items-center bg-[#F5F5F5] m-5 mt-2 py-10 rounded-3xl'>
						<Text className='text-black text-xl font-[Poppins-Medium]'>No Data Available</Text>
					</View>
				}
				<View className='mt-4 p-3 flex-row flex-wrap'>
					{spendsChartData?.length > 0 && groups.map((item, index) => <ChartCategories item={item} index={index} sliceColor={sliceColor} key={index.toString()} spendsChartData={spendsChartData} />)}
				</View>
			</View>

			{spendsChartData?.length > 0 &&
				<View className='flex-1'>
					{groups.map((item, index) => <CategoriesList item={item} index={index} spendsChartData={spendsChartData} sliceColor={sliceColor} key={index.toString()} />)}
				</View>
			}

		</ScrollView>
	)
}

export default memo(SpendsChart);



const ChartCategories = ({ item, index, sliceColor, spendsChartData }) => {
	if (spendsChartData[1][index] > 0) {
		return (
			<View className='m-1 px-2 rounded-3xl border-[#D8D8D8] border-[1px] flex-row items-center'><View style={{ backgroundColor: `${sliceColor[index]}` }} className={`rounded-full w-3 h-3 mr-3`}></View><Text className='text-black text-base font-[Poppins-Medium]'>{item.name}</Text></View>
		)
	}
}

const CategoriesList = ({ item, index, spendsChartData, sliceColor }) => {
	let totalAmount = spendsChartData[1].reduce((a, b) => a + b, 0);
	return (
		<View className='flex-row items-center bg-[#F5F5F5] rounded-xl py-2 px-4 m-2'>
			<View className='overflow-hidden'><Image source={{ uri: item.icon }} className='w-14 h-14 rounded-lg' /></View>
			<View className='flex-1'>
				<View className='mx-3 flex-row justify-between'>
					<Text className='text-black text-base font-[Poppins-Medium]'>{item.name}</Text>
					{totalAmount > 0 ?
						<Text className='text-black text-base font-[Poppins-Medium]'><Text className='text-amber-900'>₹ {spendsChartData[1][index]}</Text>/₹ {totalAmount}</Text>
						:
						<Text className='text-black text-base font-[Poppins-Medium]'><Text className='text-amber-900'>₹ 0</Text>/₹ 0</Text>
					}
				</View>
				{totalAmount > 0 ?
					<View className='mx-3 mt-1'><ProgressBar style={{ borderRadius: 40, height: 7 }} progress={spendsChartData[1][index] / totalAmount} color={sliceColor[index]} /></View>
					:
					<View className='mx-3 mt-1'><ProgressBar style={{ borderRadius: 40, height: 7 }} progress={0} color={sliceColor[index]} /></View>
				}
			</View>
		</View>
	)
}