import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableNativeFeedback } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MI from 'react-native-vector-icons/MaterialIcons';
import Io from 'react-native-vector-icons/Ionicons';
import FA5 from 'react-native-vector-icons/FontAwesome5';
import FA from 'react-native-vector-icons/FontAwesome';

import { addExpense } from "../../actions/userActions";

export default function AddExpense({ navigation }) {
	const dispatch = useDispatch();
	const [focused, setFocused] = useState({ _1: false, _2: false });
	const { user, groups } = useSelector(state => state.user);
	const [data, setData] = useState({ expenseName: '', expenseAmount: '', expensePaidBy: user.userID });

	const handleExpense = () => {
		navigation.goBack();
		dispatch(addExpense(groups[0].groupID, data));
	}

	return (
		<View className="flex-1">

			<View className='flex-row justify-between items-center mt-14 pb-[12px] border-[#D8D8D8] border-b-[0.55px]'>
				<View className='flex-row'>
					<View className='ml-4 mr-7'><TouchableNativeFeedback onPress={() => { navigation.goBack() }}><MI name='arrow-back' color='#5A5A5A' size={30} /></TouchableNativeFeedback></View>
					<Text className='text-black text-[19px] font-[Poppins-Medium]'>Add Expense</Text>
				</View>
				<View className='ml-4 mr-7'><TouchableNativeFeedback onPress={handleExpense}><MI name='done' color='#5A5A5A' size={30} /></TouchableNativeFeedback></View>
			</View>

			<View className='items-center mx-14 mt-8'>
				<View className='flex-row items-end mb-5'>
					<View className={`mr-3 p-2 px-[9px] bg-[${focused._1 ? '#d6ecdc' : '#94A3B8'}] border-slate-400 border-[0.55px] rounded-md border-b-4 border-b-slate-400`}><Io name="ios-fast-food-outline" color='#5A5A5A' size={33} /></View>
					<TextInput value={data.expenseName} className={`flex-1 p-0 border-[${focused._1 ? '#03a37e' : '#5A5A5A'}] border-b-2 text-black text-lg font-[Poppins-Regular]`} placeholderTextColor={'rgb(100 116 139)'} placeholder='Enter a description' inputMode="text" onFocus={() => { setFocused({ ...focused, _1: true }) }} onBlur={() => { setFocused({ ...focused, _1: false }) }} onChangeText={(text) => { setData({ ...data, expenseName: text }) }} />
				</View>
				<View className='flex-row items-end mb-5'>
					<View className={`mr-3 p-2 px-4 pb-1 bg-[${focused._2 ? '#d6ecdc' : '#94A3B8'}] border-slate-400 border-[0.55px] rounded-md border-b-4 border-b-slate-400`}><FA name="rupee" color='#5A5A5A' size={35} /></View>
					<TextInput value={data.expenseAmount} className={`flex-1 p-0 border-[${focused._2 ? '#03a37e' : '#5A5A5A'}] border-b-2 text-black text-3xl h-12 font-[Poppins-Medium]`} placeholderTextColor={'rgb(100 116 139)'} placeholder='0.00' inputMode='decimal' onFocus={() => { setFocused({ ...focused, _2: true }) }} onBlur={() => { setFocused({ ...focused, _2: false }) }} onChangeText={(text) => { setData({ ...data, expenseAmount: text }) }} />
				</View>
				<View className='flex-row items-center'>
					<Text className='text-black text-[15px] font-[Poppins-Medium]'>Paid by</Text>
					<Text className='text-black text-[15px] font-[Poppins-Medium] mx-2 p-2 border-slate-300 border-[0.55px] rounded-md border-b-4 border-b-slate-300'>you</Text>
					<Text className='text-black text-[15px] font-[Poppins-Medium]'>and split</Text>
					<Text className='text-black text-[15px] font-[Poppins-Medium] mx-2 p-2 border-slate-300 border-[0.55px] rounded-md border-b-4 border-b-slate-300'>equally</Text>
				</View>
			</View>

		</View>
	)
}