import React, { useState, useCallback, memo } from 'react';
import { View, Text, FlatList, Image, RefreshControl } from 'react-native';
import MI from 'react-native-vector-icons/MaterialIcons';

function Expenses({ data, user, loading }) {
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);
    let expense = JSON.parse(JSON.stringify(data?.expenses));
    expense?.reverse()
    return (
        <View className='flex-1'>

            {loading ?
                <Loading />
                :
                data?.expenses.length > 0 ?
                    <FlatList data={expense} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} renderItem={({ item, index }) => <ExpenseList key={index} item={item} user={user} />} />
                    :
                    <View className='mt-5 flex-1 justify-center items-center'><MI name='error-outline' size={50} color={'black'} /><Text className='text-[#5A5A5A] font-[Poppins-Medium]'>No Expenses</Text></View>
            }

        </View>
    )
}

export default memo(Expenses);


const ExpenseList = ({ item, user }) => {
    const date = new Date(item.expenseCreatedAt.seconds * 1000 + item.expenseCreatedAt.nanoseconds / 1000000);
    return (
        <View className='flex-row justify-between items-center bg-slate-50 my-2 mx-3 p-2 rounded-md'>
            <View className='flex-row items-center'>
                <View className='items-center justify-center'>
                    <Text className='text-[10px] text-[#5A5A5A] font-[Poppins-Regular]'>{date.toLocaleString('default', { month: 'long' })}</Text>
                    <Text className='text-[18px] text-[#5A5A5A] font-[Poppins-Medium] leading-5'>{date.getDate()}</Text>
                </View>
                <View className='mx-3 p-2 bg-slate-300 rounded-lg'><Image source={{ uri: item.expenseCategory }} className='w-10 h-10' /></View>
                <View>
                    <Text className='text-base text-black font-[Poppins-Medium]'>{item.expenseName}</Text>
                    <Text className='text-sm text-[#5A5A5A] font-[Poppins-Regular]'>{item.expensePaidBy.name} Paid ₹{item.expenseAmount}</Text>
                </View>
            </View>
            <View className='items-end'>
                <Text className='text-[13px] text-[#5A5A5A] font-[Poppins-Medium] ml-3'>you {item.expensePaidBy.userID === user.userID ? 'lend' : 'borrowed'}</Text>
                <Text className='text-[17px] text-[#5A5A5A] font-[Poppins-Medium] ml-3'>₹{item.expensePaidBy.userID === user.userID ? (item.expenseAmount - item.expenseAmountPerHead) : item.expenseAmountPerHead}</Text>
            </View>
        </View>
    )
}

const Loading = () => {
    return (
        <>
            <View className='my-2 mx-3 w-max h-16 rounded-md bg-slate-50'></View>
            <View className='my-2 mx-3 w-max h-16 rounded-md bg-slate-50'></View>
            <View className='my-2 mx-3 w-max h-16 rounded-md bg-slate-50'></View>
            <View className='my-2 mx-3 w-max h-16 rounded-md bg-slate-50'></View>
        </>
    )
}