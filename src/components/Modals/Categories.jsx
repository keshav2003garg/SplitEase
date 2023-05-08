import React from 'react';
import { View, Text, Image, FlatList, TouchableNativeFeedback } from 'react-native';

export default function Categories({ setCategory, setVisible, setData, data }) {
    const categories = [
        { name: 'Food', icon: require('../../../assets/icons/categories/food.png') },
        { name: 'Drinks', icon: require('../../../assets/icons/categories/drinks.png') },
        { name: 'Beverages', icon: require('../../../assets/icons/categories/beverages.png') },
        { name: 'Travel', icon: require('../../../assets/icons/categories/travel.png') },
        { name: 'Taxi', icon: require('../../../assets/icons/categories/taxi.png') },
        { name: 'Hotel', icon: require('../../../assets/icons/categories/hotel.png') },
        { name: 'Shopping', icon: require('../../../assets/icons/categories/shopping.png') },
        { name: 'Utilities', icon: require('../../../assets/icons/categories/utilities.png') },
        { name: 'Medical', icon: require('../../../assets/icons/categories/medical.png') },
        { name: 'EntryTicket', icon: require('../../../assets/icons/categories/entryTicket.png') },
        { name: 'Others', icon: require('../../../assets/icons/categories/others.png') },
    ]

    return (
        <View>
            <FlatList data={categories} renderItem={({ item }) => <List items={item} setCategory={setCategory} setVisible={setVisible} setData={setData} data={data} />} keyExtractor={(item, index) => index.toString()} />
        </View>
    )
}


const List = ({ items, setCategory, setVisible, setData, data }) => {
    return (
        <TouchableNativeFeedback onPress={() => { setCategory({ name: items.name, icon: items.icon }); setData({ ...data, expenseCategory: items.name }); setVisible(false) }}>
            <View className='flex-row items-center bg-slate-50 my-2 mx-3 p-2 px-8 rounded-md'>

                <View><Image className='w-16 h-16' source={items.icon} /></View>

                <View className='mx-14'><Text className='text-[#5A5A5A] text-base font-[Poppins-Medium]'>{items.name}</Text></View>

            </View>
        </TouchableNativeFeedback>
    )
}