import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import MI from 'react-native-vector-icons/MaterialIcons';

export default function Expenses() {
    return (
        <ScrollView>
            <Text className='text-[15px] text-[#5A5A5A] font-[Poppins-Medium] ml-3'>April 2023</Text>
            <View className='flex-row justify-between items-center bg-slate-50 my-2 mx-3 p-2 rounded-md'>
                <View className='flex-row items-center'>
                    <View className='items-center justify-center'>
                        <Text className='text-[10px] text-[#5A5A5A] font-[Poppins-Regular]'>Apr</Text>
                        <Text className='text-[18px] text-[#5A5A5A] font-[Poppins-Medium] leading-5'>20</Text>
                    </View>
                    <View className='mx-3 p-2 bg-slate-300 rounded-lg'><MI name='music-note' size={30} color={'black'} /></View>
                    <View>
                        <Text className='text-base text-black font-[Poppins-Medium]'>Food</Text>
                        <Text className='text-sm text-[#5A5A5A] font-[Poppins-Regular]'>George Paid $68</Text>
                    </View>
                </View>
                <View className='items-end'>
                    <Text className='text-[13px] text-[#5A5A5A] font-[Poppins-Medium] ml-3'>you borrowed</Text>
                    <Text className='text-[17px] text-[#5A5A5A] font-[Poppins-Medium] ml-3'>$25.365</Text>
                </View>
            </View>
        </ScrollView>
    )
}