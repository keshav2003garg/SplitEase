import React from 'react'
import { View, Text, ScrollView, Image } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export default function Activity() {
	const translateX = useSharedValue(0);
	const panGesture = useAnimatedGestureHandler({
		onActive: (e) => {
			translateX.value = withSpring(e.translationX);
		},
		onEnd: () => {
			translateX.value = withSpring(0);
		}
	});
	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{
			translateX: translateX.value
		}]
	}))

	return (
		<View className='flex-1'>

			<View className='mt-14 pb-[12px] border-[#D8D8D8] border-b-[0.55px]'><Text className='text-black text-xl font-[Poppins-Medium] ml-5'>Activity</Text></View>

			<ScrollView>

				<PanGestureHandler onGestureEvent={panGesture} >
					<Animated.View style={animatedStyle} className='flex-row justify-between items-center bg-slate-50 my-2 mx-3 p-2 rounded-md'>
						<View className='flex-row items-center'>
							<View className='items-center justify-center'>
								<Text className='text-[10px] text-[#5A5A5A] font-[Poppins-Regular]'>Apr</Text>
								<Text className='text-[18px] text-[#5A5A5A] font-[Poppins-Medium] leading-5'>20</Text>
							</View>
							<View className='mx-2 p-1 bg-slate-300 rounded-lg'><Image source={require('../../../assets/icons/food.png')} className='w-[50] h-[50px]'></Image></View>
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
					</Animated.View>
				</PanGestureHandler>

			</ScrollView>


		</View>
	)
}





