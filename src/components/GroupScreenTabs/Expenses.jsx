import React, { useState, useCallback, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, FlatList, Image, RefreshControl } from 'react-native';
import MI from 'react-native-vector-icons/MaterialIcons';

import { fetchGroup } from '../../actions/userActions';

function Expenses({ data, user, loading, isModalVisible }) {
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();
    const { localLoading } = useSelector(state => state.user);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        if (data?.groupID) {
            dispatch(fetchGroup(data?.groupID, user?.userID));
        }
        setRefreshing(false);
    }, []);
    let expense = JSON.parse(JSON.stringify(data?.expenses || []));
    expense?.reverse()
    return (
        <View className='flex-1'>

            {loading ?
                <Loading />
                :
                data?.expenses.length > 0 ?
                    <FlatList data={expense} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} renderItem={({ item, index }) => <ExpenseList key={index} item={item} user={user} isModalVisible={isModalVisible} />} />
                    :
                    <View className='mt-5 flex-1 justify-center items-center'><MI name='error-outline' size={50} color={'black'} /><Text className='text-[#5A5A5A] font-[Poppins-Medium]'>No Expenses</Text></View>
            }

        </View>
    )
}

export default memo(Expenses);


const ExpenseList = ({ item, user, isModalVisible }) => {
    const date = new Date(item.expenseCreatedAt.seconds * 1000 + item.expenseCreatedAt.nanoseconds / 1000000);
    return (
        <View className={`flex-row justify-between items-center bg-${isModalVisible ? '[#D8D8D8]' : 'slate-50'} my-2 mx-3 p-2 rounded-md`}>
            <View className='flex-row items-center'>
                <View className='items-center justify-center'>
                    <Text className='text-[10px] text-[#5A5A5A] font-[Poppins-Regular]'>{date.toLocaleString('default', { month: 'long' })}</Text>
                    <Text className='text-[18px] text-[#5A5A5A] font-[Poppins-Medium] leading-5'>{date.getDate()}</Text>
                </View>
                <View className={`mx-3 p-2 bg-${isModalVisible ? '[#BEBEBE]' : 'slate-100'} rounded-lg`}><Image source={{ uri: item.expenseCategory }} className='w-10 h-10' /></View>
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