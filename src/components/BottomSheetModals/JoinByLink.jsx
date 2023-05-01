import React, { useState } from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import { TextInput } from 'react-native-paper';
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { useDispatch, useSelector } from 'react-redux';
import { trigger } from "react-native-haptic-feedback";

import { joinGroup } from '../../actions/userActions';

export default function JoinByLink({ sheet }) {
    const dispatch = useDispatch();
    const { user, loading } = useSelector(state => state.user);
    const [link, setLink] = useState('');

    const handleJoin = () => {
        trigger("impactMedium");
        dispatch(joinGroup(user.userID, link));
        if (!loading) sheet.forceClose();
    }

    return (
        <View className='flex-1'>

            <View className='mt-5 pb-[12px] border-[#D8D8D8] border-b-[0.55px]'><Text className='text-black text-xl font-[Poppins-Medium] ml-5'>Join a Group</Text></View>

            <TextInput value={link} className='mx-7 my-3' label={<Text className='text-base font-[Poppins-Medium]'>Enter Group Code</Text>} contentStyle={{ fontFamily: 'Poppins-Medium' }} mode='outlined' outlineColor='#5A5A5A' activeOutlineColor='#5A5A5A' outlineStyle={{ backgroundColor: 'white' }} onChangeText={(text) => { setLink(text) }} onFocus={() => { sheet.expand() }} />

            <TouchableNativeFeedback onPress={handleJoin} background={TouchableNativeFeedback.Ripple('#D0D0D0', false)}>
                <View className='mx-7 py-3 bg-[#A5A5A5] rounded-xl'><Text className='text-[#5A5A5A] text-center text-base font-[Poppins-Medium]'>Join</Text></View>
            </TouchableNativeFeedback>

        </View>
    )
}