import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableNativeFeedback, Image, StatusBar } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from 'react-native-paper';
import MI from 'react-native-vector-icons/MaterialIcons';
import FA from 'react-native-vector-icons/FontAwesome';

import { addExpense } from "../../actions/userActions";
import ChooseGroup from "../../components/ChooseGroup";
import Categories from "../../components/Modals/Categories";
import AllGroups from "../../components/Modals/AllGroups";

export default function AddExpense({ navigation, route }) {
	const dispatch = useDispatch();
	const { user, groups } = useSelector(state => state.user);
	const [focused, setFocused] = useState({ _1: false, _2: false });
	const [category, setCategory] = useState({ name: 'Others', icon: require('../../../assets/icons/categories/others.png') });
	const [data, setData] = useState({ expenseName: '', expenseAmount: '', expensePaidBy: user.userID, expenseCategory: category.name });
	const [visible, setVisible] = useState(false);
	const [modal, setModal] = useState(false);
	const [selectedGroup, setSelectedGroup] = useState(groups[0]);

	const handleExpense = () => {
		navigation.goBack();
		data.expenseAmount = parseInt(data.expenseAmount);
		dispatch(addExpense(selectedGroup.groupID, data));
	}
	useEffect(() => {
		if (route?.params?.alreadySelected) {
			setSelectedGroup(route.params?.group);
		}
	}, [route?.params?.alreadySelected, route?.params?.group]);

	return (
		<View className="flex-1">

			<StatusBar barStyle='dark-content' />

			<View className='flex-row justify-between items-center mt-14 pb-[12px] border-[#D8D8D8] border-b-[0.55px]'>
				<View className='flex-row'>
					<View className='ml-4 mr-7'><TouchableNativeFeedback onPress={() => { navigation.goBack() }}><MI name='arrow-back' color='#5A5A5A' size={30} /></TouchableNativeFeedback></View>
					<Text className='text-black text-[19px] font-[Poppins-Medium]'>Add Expense</Text>
				</View>
				<View className='ml-4 mr-7'><TouchableNativeFeedback onPress={handleExpense}><MI name='done' color='#5A5A5A' size={30} /></TouchableNativeFeedback></View>
			</View>

			<ChooseGroup selectedGroup={selectedGroup} setModal={setModal} />

			<View className='items-center mx-14 mt-8'>
				<View className='flex-row items-end mb-5'>
					<TouchableNativeFeedback onPress={() => { setVisible(true) }}><View className={`mr-3 p-2 px-[9px] border-slate-400 border-[0.55px] rounded-md border-b-4 border-b-slate-400`}><Image className='w-8 h-8' source={category.icon} /></View></TouchableNativeFeedback>
					<TextInput value={data.expenseName} className={`flex-1 p-0 border-[${focused._1 ? '#03a37e' : '#5A5A5A'}] border-b-2 text-black text-lg font-[Poppins-Regular]`} placeholderTextColor={'rgb(100 116 139)'} placeholder='Enter a description' inputMode="text" onFocus={() => { setFocused({ ...focused, _1: true }) }} onBlur={() => { setFocused({ ...focused, _1: false }) }} onChangeText={(text) => { setData({ ...data, expenseName: text }) }} />
				</View>
				<View className='flex-row items-end mb-5'>
					<View className={`mr-3 p-2 px-4 pb-1 border-slate-400 border-[0.55px] rounded-md border-b-4 border-b-slate-400`}><FA name="rupee" color='#5A5A5A' size={35} /></View>
					<TextInput value={data.expenseAmount.toString()} className={`flex-1 p-0 border-[${focused._2 ? '#03a37e' : '#5A5A5A'}] border-b-2 text-black text-3xl h-12 font-[Poppins-Medium]`} placeholderTextColor={'rgb(100 116 139)'} placeholder='0.00' inputMode='decimal' onFocus={() => { setFocused({ ...focused, _2: true }) }} onBlur={() => { setFocused({ ...focused, _2: false }) }} onChangeText={(text) => { setData({ ...data, expenseAmount: text }) }} />
				</View>
				<View className='flex-row items-center'>
					<Text className='text-black text-[15px] font-[Poppins-Medium]'>Paid by</Text>
					<Text className='text-black text-[15px] font-[Poppins-Medium] mx-2 p-2 border-slate-300 border-[0.55px] rounded-md border-b-4 border-b-slate-300'>you</Text>
					<Text className='text-black text-[15px] font-[Poppins-Medium]'>and split</Text>
					<Text className='text-black text-[15px] font-[Poppins-Medium] mx-2 p-2 border-slate-300 border-[0.55px] rounded-md border-b-4 border-b-slate-300'>equally</Text>
				</View>
			</View>


			<Modal visible={visible} onDismiss={() => { setVisible(false) }} contentContainerStyle={{ backgroundColor: 'white', borderRadius: 20, overflow: 'hidden' }} className='mt-28 mb-20 mx-14' >
				<Categories setCategory={setCategory} setVisible={setVisible} setData={setData} data={data} />
			</Modal>

			<Modal visible={modal} onDismiss={() => { setModal(false) }} contentContainerStyle={{ backgroundColor: 'white', borderRadius: 20, overflow: 'hidden', padding: 10 }} className='mt-28 mb-20 mx-14' >
				<AllGroups groups={groups} setSelectedGroup={setSelectedGroup} setModal={setModal} />
			</Modal>


		</View>
	)
}