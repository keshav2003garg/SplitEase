import React, { useState } from 'react';
import { View, Text, TouchableNativeFeedback, TextInput } from 'react-native';
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
        if(!loading) sheet.forceClose();
    }

    return (
        <View className='flex-1'>
            <View className='flex-row-reverse px-5 py-3 border-b-[0.55px] border-[#D8D8D8]'>
                <TouchableNativeFeedback onPress={handleJoin} background={TouchableNativeFeedback.Ripple('#D0D0D0', false)}>
                    <View className='px-5 py-3 bg-[#A5A5A5] rounded-xl'><Text className='text-[#5A5A5A] text-base font-[Poppins-Regular]'>Join</Text></View>
                </TouchableNativeFeedback>
            </View>

            <Text className='text-center my-5 text-black text-xl font-[Poppins-Medium]'>Enter Group Code</Text>

            <TextInput value={link} className='mx-6 px-3 py-3 text-black text-lg font-[Poppins-Medium] border-slate-200 border-[1px] rounded-md' placeholderTextColor='#5A5A5A' onChangeText={(text) => { setLink(text) }} onFocus={() => { sheet.expand() }} />

        </View>
    )
}