import React from 'react';
import { View, Text, TouchableNativeFeedback, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';

export default function GroupList({ data }) {
    const navigation = useNavigation();
    const { groupName, groupImage, borrow, lend } = data;
    const total = (lend - borrow).toFixed(0);
    return (
        <TouchableNativeFeedback onPress={() => { navigation.navigate('GroupMainScreen', { data }) }}>
            <View className='flex-row mx-[20px] mt-[17px]'>
                <SharedElement id={`data.${groupImage}.image`}><Image source={{ uri: groupImage }} className='w-[120px] h-[120px] mr-[10px] rounded-xl' /></SharedElement>
                <View className='mx-[10px] justify-center'>
                    <Text className='text-black text-[16px] font-[Poppins-Medium]'>{groupName}</Text>
                    {data.expenses.length === 0 ?
                        <Text className='text-[#5A5A5A] text-[16px] font-[Poppins-Medium]'>No expenses</Text>
                        :
                        total > 0 ?
                            <Text className='text-[#03a37e] text-[16px] font-[Poppins-Medium]'>you lend ₹{total}</Text>
                            :
                            <Text className='text-[#ed4f00] text-[16px] font-[Poppins-Medium]'>you borrowed ₹{-total}</Text>
                    }
                    {borrow != 0 && <Text className='text-[#5A5A5A] text-[13px] font-[Poppins-Medium]'>You borrow <Text className='text-[#ed4f00]'>₹ {borrow}</Text></Text>}
                    {lend != 0 && <Text className='text-[#5A5A5A] text-[13px] font-[Poppins-Medium]'>You lend <Text className='text-[#03a37e]'>₹ {lend}</Text></Text>}
                </View>
            </View>
        </TouchableNativeFeedback>
    )
}