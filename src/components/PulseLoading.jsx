import React from 'react';
import { View, Text } from 'react-native';

export default function PulseLoading() {
    return (
        <View className='flex-1'>

            <View className='flex-row justify-between items-center  mx-5 mt-5 mb-1'>
                <View>
                    <View className='my-2 w-40 h-3 rounded-full bg-[#D8D8D8]'></View>
                    <View className='my-2 w-40 h-3 rounded-full bg-[#D8D8D8]'></View>
                </View>
                <View className='w-7 h-7 rounded-full bg-[#D8D8D8]'></View>
            </View>

            <View className='flex-row mx-5 mt-[17px]'>
                <View className='mr-3 w-[120px] h-[120px] rounded-xl bg-[#D8D8D8]'></View>
                <View className='mx-[10px] justify-center'>
                    <View className='my-2 w-48 h-3 rounded-full bg-[#D8D8D8]'></View>
                    <View className='my-2 w-48 h-3 rounded-full bg-[#D8D8D8]'></View>
                    <View className='my-2 w-48 h-3 rounded-full bg-[#D8D8D8]'></View>
                </View>
            </View>
            <View className='flex-row mx-5 mt-[17px]'>
                <View className='mr-3 w-[120px] h-[120px] rounded-xl bg-[#D8D8D8]'></View>
                <View className='mx-[10px] justify-center'>
                    <View className='my-2 w-48 h-3 rounded-full bg-[#D8D8D8]'></View>
                    <View className='my-2 w-48 h-3 rounded-full bg-[#D8D8D8]'></View>
                    <View className='my-2 w-48 h-3 rounded-full bg-[#D8D8D8]'></View>
                </View>
            </View>
            <View className='flex-row mx-5 mt-[17px]'>
                <View className='mr-3 w-[120px] h-[120px] rounded-xl bg-[#D8D8D8]'></View>
                <View className='mx-[10px] justify-center'>
                    <View className='my-2 w-48 h-3 rounded-full bg-[#D8D8D8]'></View>
                    <View className='my-2 w-48 h-3 rounded-full bg-[#D8D8D8]'></View>
                    <View className='my-2 w-48 h-3 rounded-full bg-[#D8D8D8]'></View>
                </View>
            </View>

        </View>
    )
}