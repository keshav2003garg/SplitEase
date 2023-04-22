import React from 'react'
import { View, Text, ScrollView, RefreshControl } from 'react-native'
import FA from 'react-native-vector-icons/FontAwesome5';

export default function Activity() {
	const [refreshing, setRefreshing] = React.useState(false);
	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 500);
	}, []);

	return (
		<View className='flex-1'>

			<View className='mt-14 pb-[12px] border-[#D8D8D8] border-b-[0.55px]'><Text className='text-black text-xl font-[Poppins-Medium] ml-5'>Activity</Text></View>

			<ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

				<View className='flex-row justify-between items-center bg-slate-50 my-2 mx-3 p-2 rounded-md'>
					<View className='flex-row items-center'>
						<View className='items-center justify-center'>
							<Text className='text-[10px] text-[#5A5A5A] font-[Poppins-Regular]'>Apr</Text>
							<Text className='text-[18px] text-[#5A5A5A] font-[Poppins-Medium] leading-5'>20</Text>
						</View>
						<View className='mx-2 p-2 px-3 bg-slate-300 rounded-lg'><FA name='hamburger' size={30} color={'black'} /></View>
						{/* <View className='mx-2 p-1 bg-slate-300 rounded-lg'><Image source={require('../../../assets/icons/food.png')} className='w-[50] h-[50px]'></Image></View> */}
						<View>
							<Text className='text-base text-black font-[Poppins-Medium]'>Food</Text>
							<View className='flex-row'>
								<Text className='mr-1 px-2 text-[10px] text-[#5A5A5A] font-[Poppins-Regular] bg-[#C7F6B6] rounded-md'>Mussorie Trip</Text>
								<Text className='px-2 text-[10px] text-[#5A5A5A] font-[Poppins-Regular] bg-[#FFDEAD] rounded-md'>Your Share: $56</Text>
							</View>
						</View>
					</View>
					<View className='items-end'>
						<Text className='text-[17px] text-[#03a37e] font-[Poppins-Medium]'>$25.365</Text>
						<View className='overflow-hidden'><Text className='px-2 text-[13px] text-[#5A5A5A] font-[Poppins-Medium] bg-[#B2BEB5] rounded-md'>Abhay</Text></View>
					</View>
				</View>
				
			</ScrollView>


		</View>
	)
}





