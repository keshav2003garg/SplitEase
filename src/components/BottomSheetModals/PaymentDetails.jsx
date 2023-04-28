import React from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import { trigger } from "react-native-haptic-feedback";

export default function PaymentDetails({ sheet }) {
    return (
        <View className='flex-1'>
            <View className='flex-row items-center justify-between px-5 py-3 border-b-[0.55px] border-[#D8D8D8]'>
                <Text className='text-black text-xl font-[Poppins-Medium]'></Text>
                <TouchableNativeFeedback onPress={() => { trigger("impactMedium"); sheet.forceClose(); }} background={TouchableNativeFeedback.Ripple('#D0D0D0', false)}>
                    <View className='px-2'><Text className='text-[#5A5A5A] text-base font-[Poppins-Regular]'>Payment</Text></View>
                </TouchableNativeFeedback>
            </View>
        </View>
    )
}