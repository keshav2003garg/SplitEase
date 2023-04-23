import React from "react";
import { View, Text, TextInput } from "react-native";
import MI from 'react-native-vector-icons/MaterialIcons';
import Io from 'react-native-vector-icons/Ionicons';
import FA from 'react-native-vector-icons/FontAwesome5';

export default function AddExpense() {
	return (
		<View className="flex-1">

			<View className='flex-row justify-between items-center mt-14 pb-[12px] border-[#D8D8D8] border-b-[0.55px]'>
				<View className='flex-row'>
					<View className='ml-4 mr-7'><MI name='arrow-back' color='#5A5A5A' size={30} /></View>
					<Text className='text-black text-[19px] font-[Poppins-Medium]'>Add Expense</Text>
				</View>
				<View className='ml-4 mr-7'><MI name='done' color='#5A5A5A' size={30} /></View>
			</View>

			<View className='items-center mx-14 mt-8'>
				<View className='flex-row items-end mb-5'>
					<View className='mr-3 p-1 border-[#5A5A5A] border-2 rounded-lg'><Io name="fast-food-outline" color='black' size={30} /></View>
					<TextInput className='flex-1 p-0 border-[#5A5A5A] border-b-2 text-black text-lg font-[Poppins-Regular]' placeholderTextColor={'rgb(100 116 139)'} placeholder='Enter a description' inputMode="text" />
				</View>
				<View className='flex-row items-end mb-5'>
					<View className='mr-3 p-2 px-3 border-[#5A5A5A] border-2 rounded-lg'><FA name="rupee-sign" color='black' size={30} /></View>
					<TextInput className='flex-1 p-0 border-[#5A5A5A] border-b-2 text-black text-2xl font-[Poppins-Medium]' placeholderTextColor={'rgb(100 116 139)'} placeholder='0.00' inputMode='decimal' />
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