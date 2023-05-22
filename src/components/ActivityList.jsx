import React from 'react'
import { View, Text, ScrollView, Image } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export default function ActivityList({ data }) {
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
    const date = new Date(data?.expenseCreatedAt);
    const name = JSON.parse(data.expensePaidBy);
    return (
        <PanGestureHandler onGestureEvent={panGesture} >
            <Animated.View style={animatedStyle} className='flex-row justify-between items-center bg-[#F9F9F9] my-2 mx-3 p-2 rounded-md'>
                <View className='flex-row items-center'>
                    <View className='items-center justify-center'>
                        <Text className='text-[10px] text-[#5A5A5A] font-[Poppins-Regular]'>{date.toLocaleString('default', { month: 'long' })}</Text>
                        <Text className='text-[18px] text-[#5A5A5A] font-[Poppins-Medium] leading-5'>{date.getDate()}</Text>
                    </View>
                    <View className='mx-2 p-1 bg-slate-300 rounded-lg'><Image source={{uri: data.expenseCategory}} className='w-[50] h-[50px]'></Image></View>
                    <View>
                        <Text className='text-base text-black font-[Poppins-Medium]'>{data?.expenseName}</Text>
                        <View className='flex-row'>
                            <Text className='mr-1 px-2 text-[10px] text-[#5A5A5A] font-[Poppins-Regular] bg-[#C7F6B6] rounded-md'>{data.groupName}</Text>
                            <Text className='px-2 text-[10px] text-[#5A5A5A] font-[Poppins-Regular] bg-[#FFDEAD] rounded-md'>Your Share: ₹{data.expenseAmountPerHead}</Text>
                        </View>
                    </View>
                </View>
                <View className='items-end'>
                    <Text className='text-[17px] text-[#03a37e] font-[Poppins-Medium]'>₹{data?.expenseAmount}</Text>
                    <View className='overflow-hidden'><Text className='px-2 text-[13px] text-[#5A5A5A] font-[Poppins-Medium] bg-[#B2BEB5] rounded-md'>{name.name}</Text></View>
                </View>
            </Animated.View>
        </PanGestureHandler>
    )
}