import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, FlatList } from 'react-native';

import ActivityList from '../../components/ActivityList';

export default function Activity() {
	const { activity } = useSelector(state => state.user);
	let activityList = JSON.parse(JSON.stringify(activity || []));
	activityList?.reverse()
	return (
		<View className='flex-1'>

			<View className='mt-14 pb-[12px] border-[#D8D8D8] border-b-[0.55px]'><Text className='text-black text-xl font-[Poppins-Medium] ml-5'>Activity</Text></View>

			{activity.length == 0 ?
				<View className='flex-1 justify-center items-center'>
					<Text className='text-black text-[16px] font-[Poppins-Medium]'>No activity yet</Text>
				</View>
				: 
				<FlatList data={activityList} renderItem={({ item }) => <ActivityList data={item} />} keyExtractor={(item, index) => index.toString()} />
			}


		</View>
	)
}





