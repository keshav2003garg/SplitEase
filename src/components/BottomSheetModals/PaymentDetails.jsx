import React, { useState } from 'react';
import { View, Text, Image, TouchableNativeFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { TextInput } from 'react-native-paper';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

import { updatePamentDetails } from '../../actions/userActions';

export default function PaymentDetails({ sheet }) {
    const dispatch = useDispatch();
    const { user, spinLoading } = useSelector(state => state.user);
    const [paymentInfo, setPaymentInfo] = useState({ upi: user.paymentDetails.upi, paytm: user.paymentDetails.paytm });

    const handleUpdate = () => {
        dispatch(updatePamentDetails(user.userID, paymentInfo));
    }

    return (
        <View className='flex-1'>

            <View className='mt-5 pb-[12px] border-[#D8D8D8] border-b-[0.55px]'><Text className='text-black text-xl font-[Poppins-Medium] ml-5'>Payment Details</Text></View>

            {spinLoading ? <SpinLoading /> : null}

            <View className='my-2 mx-6 flex-row items-center'>
                <Image className='h-20 w-20 mr-3' source={require('../../../assets/icons/upi.png')}></Image>
                <TextInput className='flex-1' label={<Text className='text-base font-[Poppins-Medium]'>Your UPI ID</Text>} value={paymentInfo.upi} contentStyle={{ fontFamily: 'Poppins-Medium' }} mode='outlined' outlineColor='#5A5A5A' activeOutlineColor='#5A5A5A' outlineStyle={{ backgroundColor: 'white' }} onChangeText={(text) => { setPaymentInfo({ ...paymentInfo, upi: text }) }} />
            </View>
            <View className='mx-6 flex-row items-center'>
                <Image className='w-20 h-20 mr-3' source={require('../../../assets/icons/paytm.png')}></Image>
                <TextInput className='flex-1' label={<Text className='text-base font-[Poppins-Medium]'>Your Paytm Number</Text>} value={paymentInfo.paytm} contentStyle={{ fontFamily: 'Poppins-Medium' }} mode='outlined' outlineColor='#5A5A5A' activeOutlineColor='#5A5A5A' outlineStyle={{ backgroundColor: 'white' }} onChangeText={(text) => { setPaymentInfo({ ...paymentInfo, paytm: text }) }} />
            </View>

            <TouchableNativeFeedback onPress={handleUpdate} background={TouchableNativeFeedback.Ripple('#D0D0D0', false)}>
                <View className='mx-6 mt-3 py-3 bg-[#A5A5A5] rounded-xl'><Text className='text-[#5A5A5A] text-center text-base font-[Poppins-Medium]'>Update</Text></View>
            </TouchableNativeFeedback>

        </View>
    )
}

const SpinLoading = () => {
	return (
		<ActivityIndicator animating={true} color={MD2Colors.red800} className='mt-4' size={30} />
	)
}