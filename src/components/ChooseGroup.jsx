import React from 'react';
import { View, Text, Image, TouchableNativeFeedback } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';

export default function ChooseGroup({ selectedGroup, setModal, route }) {
    if (route?.params?.alreadySelected) {
        selectedGroup = route?.params?.group;
    }

    return (
        <TouchableNativeFeedback onPress={() => { setModal(true) }}>
            <View className='mx-4 my-3 p-2 flex-row items-center rounded-md border-[1px] border-[#D8D8D8]'>
                <Text className='text-black text-[15px] font-[Poppins-Medium]'>Choose Group: </Text>
                <View className='ml-12 flex-row items-center'>
                    <View className='rounded-md overflow-hidden'><SharedElement id={`data.${selectedGroup.groupImage}.image`}><Image source={{ uri: selectedGroup.groupImage }} className='w-10 h-10' /></SharedElement></View>
                    <Text className='mx-5 text-black text-[15px] font-[Poppins-Medium]'>{selectedGroup.groupName}</Text>
                </View>
            </View>
        </TouchableNativeFeedback>
    )
}
