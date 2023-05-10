import React from 'react';
import { View, Text, FlatList, Image, TouchableNativeFeedback } from 'react-native';

export default function AllGroups({ groups, setSelectedGroup, setModal }) {
    return (
        <>
            <View className='pb-3 border-[#D8D8D8] border-b-[0.55px]'><Text className='text-black text-xl font-[Poppins-Medium] text-center'>All Groups</Text></View>
            <FlatList data={groups} renderItem={({ item }) => <GroupItems items={item} setSelectedGroup={setSelectedGroup} setModal={setModal} />} keyExtractor={(item) => item.groupID} />
        </>
    )
}



const GroupItems = ({ items, setSelectedGroup, setModal }) => {
    return (
        <TouchableNativeFeedback onPress={() => { setSelectedGroup(items); setModal(false) }}>
            <View>
                <View className='flex-row items-center justify-between p-4'>
                    <View className='mr-5 rounded-md overflow-hidden'><Image source={{ uri: items.groupImage }} className='w-10 h-10' /></View>
                    <View className='flex-1 flex-row justify-between'>
                        <Text className='text-black text-sm font-[Poppins-Medium]'>{items.groupName}</Text>
                        <Text className='text-black text-sm font-[Poppins-Medium]'>{items.groupMembers.length} {items.groupMembers.length === 1 ? 'Member' : "Members"}</Text>
                    </View>
                </View>
            </View>
        </TouchableNativeFeedback>
    )
}