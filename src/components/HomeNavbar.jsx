import React from 'react';
import { View } from 'react-native';
import * as Animatable from "react-native-animatable";
import Icon from 'react-native-vector-icons/Ionicons';
import MI from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HomeNavbar() {
    return (
        <View className='flex-row justify-end mt-[50px] pb-[12px] border-[#D8D8D8] border-b-[0.55px]'>
            <View className='flex flex-row justify-between mr-[12px]'>
                <Animatable.View animation={'bounceIn'} className='mx-[10px] mt-[3px]'><Icon name='search-sharp' color='#5A5A5A' size={24} /></Animatable.View>
                <Animatable.View animation={'bounceIn'} className='mx-[10px]'><MI name='account-multiple-plus-outline' color='#5A5A5A' size={27} /></Animatable.View>
            </View>
        </View>
    )
}