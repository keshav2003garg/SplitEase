import React, { useEffect, useState, useCallback, memo } from 'react';
import { View, Text, ScrollView, Image, TouchableNativeFeedback, RefreshControl } from 'react-native';
import { Modal } from 'react-native-paper';
import { ProgressBar } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import PieChart from 'react-native-pie-chart';

import { fetchGroupsChart } from '../../actions/userActions';

function GroupsCharts() {
    const dispatch = useDispatch();
    const { groupChartData, groups, chartLoading } = useSelector(state => state.user);
    const [selectedGroup, setSelectedGroup] = useState(groups[0]);
    const [modal, setModal] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        dispatch(fetchGroupsChart(selectedGroup.groupID));
        if (!chartLoading) setRefreshing(false);
    }, []);

    useEffect(() => {
        dispatch(fetchGroupsChart(selectedGroup.groupID));
    }, [selectedGroup])

    const series = groupChartData;
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
    const sliceColor = ['#F44336', '#9C27B0', '#3F51B5', '#03A9F4', '#009688', '#8BC34A', '#FFEB3B', '#FF9800', '#795548', '#607D8B', '#E91E63'];

    const totalAmount = groupChartData.reduce((a, b) => a + b, 0);

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

            <TouchableNativeFeedback onPress={() => { setModal(true) }}>
                <View className='mx-4 my-3 p-2 flex-row items-center rounded-md border-[1px] border-[#D8D8D8]'>
                    <Text className='text-black text-[15px] font-[Poppins-Medium]'>Choose Group: </Text>
                    <View className='ml-12 flex-row items-center'>
                        <View className='rounded-md overflow-hidden'><Image source={{ uri: selectedGroup.groupImage }} className='w-10 h-10' /></View>
                        <Text className='mx-5 text-black text-[15px] font-[Poppins-Medium]'>{selectedGroup.groupName}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>

            <View className='flex justify-center items-center bg-[#F5F5F5] m-5 mt-2 py-10 rounded-3xl'>
                {groupChartData?.length > 0 && totalAmount > 0 ?
                    <PieChart widthAndHeight={350} series={series} sliceColor={sliceColor} doughnut={true} coverRadius={0.6} coverFill={'#FFFFFF'} />
                    :
                    <View className='flex justify-center items-center bg-[#F5F5F5] m-5 mt-2 py-10 rounded-3xl'>
                        <Text className='text-black text-xl font-[Poppins-Medium]'>No Data Available</Text>
                    </View>
                }
                <View className='mt-4 p-3 flex-row flex-wrap'>
                    {groupChartData?.length > 0 && categories.map((item, index) => <ChartCategories item={item} index={index} sliceColor={sliceColor} key={item.name} groupChartData={groupChartData} />)}
                </View>
            </View>

            <View className='mt-4 pb-[12px] border-[#D8D8D8] border-b-[0.55px]'><Text className='text-black text-xl font-[Poppins-Medium] ml-5'>Categories</Text></View>

            {groupChartData?.length > 0 &&
                <View className='flex-1'>
                    {categories.map((item, index) => <CategoriesList item={item} index={index} groupChartData={groupChartData} sliceColor={sliceColor} key={item.name} />)}
                </View>
            }



            <Modal visible={modal} onDismiss={() => { setModal(false) }} contentContainerStyle={{ backgroundColor: 'white', borderRadius: 20, overflow: 'hidden', padding: 10, height: '100%' }} className='mt-28 mb-20 mx-14' >
                <>
                    <View className='pb-3 border-[#D8D8D8] border-b-[0.55px]'><Text className='text-black text-xl font-[Poppins-Medium] text-center'>All Groups</Text></View>
                    <ScrollView>
                        {groups.map((item) => <GroupItems items={item} setSelectedGroup={setSelectedGroup} setModal={setModal} key={item.groupID} />)}
                    </ScrollView>
                </>
            </Modal>

        </ScrollView>
    )
}

export default memo(GroupsCharts);

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


const ChartCategories = ({ item, index, sliceColor, groupChartData }) => {
    if (groupChartData[index] > 0) {
        return (
            <View className='m-1 px-2 rounded-3xl border-[#D8D8D8] border-[1px] flex-row items-center'><View style={{ backgroundColor: `${sliceColor[index]}` }} className={`rounded-full w-3 h-3 mr-3`}></View><Text className='text-black text-base font-[Poppins-Medium]'>{item.name}</Text></View>
        )
    }
}

const CategoriesList = ({ item, index, groupChartData, sliceColor }) => {
    let totalAmount = groupChartData.reduce((a, b) => a + b, 0);
    return (
        <View className='flex-row items-center bg-[#F5F5F5] rounded-xl py-2 px-4 m-2'>
            <View className='p-2 bg-[#BEBEBE] rounded-lg'><Image source={item.icon} className='w-10 h-10' /></View>
            <View className='flex-1'>
                <View className='mx-3 flex-row justify-between'>
                    <Text className='text-black text-base font-[Poppins-Medium]'>{item.name}</Text>
                    {totalAmount > 0 ?
                        < Text className='text-black text-base font-[Poppins-Medium]'><Text className='text-amber-900'>₹ {groupChartData[index]}</Text>/₹ {totalAmount}</Text>
                        :
                        < Text className='text-black text-base font-[Poppins-Medium]'><Text className='text-amber-900'>₹ 0</Text>/₹ 0</Text>
                    }
                </View>
                {totalAmount > 0 ?
                    <View className='mx-3 mt-1'><ProgressBar style={{ borderRadius: 40, height: 7 }} progress={groupChartData[index] / totalAmount} color={sliceColor[index]} /></View>
                    :
                    <View className='mx-3 mt-1'><ProgressBar style={{ borderRadius: 40, height: 7 }} progress={0} color={sliceColor[index]} /></View>
                }
            </View>
        </View >
    )
}