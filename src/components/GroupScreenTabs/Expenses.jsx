import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import MI from 'react-native-vector-icons/MaterialIcons';

export default function Expenses({ data, user }) {
    const { expenses } = data;
    return (
        <ScrollView>

            <Text className='text-[15px] text-[#5A5A5A] font-[Poppins-Medium] ml-3'>April 2023</Text>
            {expenses.length > 0 ?
                expenses.map((item, index) => { return (<ExpenseList key={index} item={item} user={user} />) })
                :
                <View className='flex-1 justify-center items-center'><MI name='error-outline' size={50} color={'black'} /><Text className='text-[#5A5A5A] font-[Poppins-Medium]'>No Expenses</Text></View>
            }

        </ScrollView>
    )
}


const ExpenseList = ({ item, user }) => {
    const date = new Date(item.expenseCreatedAt.toDate());
    return (
        <View className='flex-row justify-between items-center bg-slate-50 my-2 mx-3 p-2 rounded-md'>
            <View className='flex-row items-center'>
                <View className='items-center justify-center'>
                    <Text className='text-[10px] text-[#5A5A5A] font-[Poppins-Regular]'>{date.toLocaleString('default', { month: 'long' })}</Text>
                    <Text className='text-[18px] text-[#5A5A5A] font-[Poppins-Medium] leading-5'>{date.getDate()}</Text>
                </View>
                <View className='mx-3 p-2 bg-slate-300 rounded-lg'><MI name='music-note' size={30} color={'black'} /></View>
                <View>
                    <Text className='text-base text-black font-[Poppins-Medium]'>{item.expenseName}</Text>
                    <Text className='text-sm text-[#5A5A5A] font-[Poppins-Regular]'>{item.expensePaidBy.name} Paid ₹{item.expenseAmount}</Text>
                </View>
            </View>
            <View className='items-end'>
                <Text className='text-[13px] text-[#5A5A5A] font-[Poppins-Medium] ml-3'>you {item.expensePaidBy.userID === user.userID ? 'lend' : 'borrowed'}</Text>
                <Text className='text-[17px] text-[#5A5A5A] font-[Poppins-Medium] ml-3'>₹{item.expensePaidBy.userID === user.userID ? item.expenseAmount - item.expenseAmountPerHead : item.expenseAmountPerHead}</Text>
            </View>
        </View>
    )
}