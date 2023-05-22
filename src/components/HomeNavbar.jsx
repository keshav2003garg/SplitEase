import React, { useState } from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import * as Animatable from "react-native-animatable";
import Icon from 'react-native-vector-icons/Ionicons';
import MIC from 'react-native-vector-icons/MaterialCommunityIcons';
import MI from 'react-native-vector-icons/MaterialIcons';

export default function HomeNavbar({ navigation, searchQuery, setSearchQuery }) {
    const [showSearch, setShowSearch] = useState(false);
    return (
        <View className='flex-row justify-end mt-[50px] pb-[12px] border-[#D8D8D8] border-b-[0.55px]'>
            {showSearch && <View className='flex flex-row justify-between items-center mx-[12px]'>
                <Searchbar autoFocus placeholder='Search Group' className='w-[88%] border-[#D8D8D8] border-[0.55px] rounded-xl bg-[#F5F5F5]' inputStyle={{ fontFamily: "Poppins-Medium", fontSize: 15 }} value={searchQuery} onChangeText={(text) => { setSearchQuery(text) }} />
                <Animatable.View animation={'bounceIn'} className='mx-[10px] mt-[3px]'><MI onPress={() => { setShowSearch(false); setSearchQuery('') }} name='cancel' color='#5A5A5A' size={27} /></Animatable.View>
            </View>}
            {!showSearch && <View className='flex flex-row justify-between mx-[12px]'>
                <Animatable.View animation={'bounceIn'} className='mx-[10px] mt-[3px]'><Icon onPress={() => { setShowSearch(true) }} name='search-sharp' color='#5A5A5A' size={24} /></Animatable.View>
                <Animatable.View animation={'bounceIn'} className='mx-[10px]'><MIC onPress={() => { navigation.navigate('CreateGroup') }} name='account-multiple-plus-outline' color='#5A5A5A' size={27} /></Animatable.View>
            </View>}
        </View>
    )
}