import React from 'react';
import { View, Text, TouchableNativeFeedback, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';

export default function GroupList({ data }) {
    const navigation = useNavigation();
    const { groupName, groupImage } = data;

    return (
        <TouchableNativeFeedback onPress={() => { navigation.navigate('GroupMainScreen', { data }) }}>
            <View className='flex-row mx-[20px] mt-[17px]'>
                <SharedElement id={`data.${groupImage}.image`}><Image source={{ uri: groupImage }} className='w-[120px] h-[120px] mr-[10px] rounded-[10px]' /></SharedElement>
                <View className='mx-[10px] justify-center'>
                    <Text className='text-black text-[16px] font-[Poppins-Medium]'>{groupName}</Text>
                    <Text className='text-[#03a37e] text-[16px] font-[Poppins-Medium]'>you are owed ₹64</Text>
                    <Text className='text-[#5A5A5A] text-[13px] font-[Poppins-Medium]'>Kishan owes you <Text className='text-[#03a37e]'>₹33</Text></Text>
                    <Text className='text-[#5A5A5A] text-[13px] font-[Poppins-Medium]'>Akshat owes you <Text className='text-[#03a37e]'>₹31</Text></Text>
                </View>
            </View>
        </TouchableNativeFeedback>
    )
}