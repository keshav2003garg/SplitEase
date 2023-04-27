import React from 'react';
import { View, Text } from 'react-native';
import FA from 'react-native-vector-icons/FontAwesome5';

export default function Alert({ message, options }) {
    return (
        <View className='flex-1 justify-center items-center mb-7'>
            <View className='flex-row justify-center items-center bg-slate-50 my-2 mx-3 p-2 rounded-md'>
                <View className='mx-2 p-2 px-3 bg-[#C7F6B6] rounded-lg'><FA name='check-circle' size={30} color={'black'} /></View>
                <Text className='text-lg text-[#5A5A5A] font-[Poppins-Medium]'>{message}</Text>
            </View>
        </View>
    )
}