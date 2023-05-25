import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StatusBar, Image, ScrollView, TouchableNativeFeedback, RefreshControl } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { MenuProvider, Menu, MenuTrigger, MenuOptions, MenuOption, renderers } from 'react-native-popup-menu';
import { useDispatch, useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/FontAwesome5';
import MAI from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from "react-native-animatable";

import HomeNavbar from "../../components/HomeNavbar";
import GroupList from "../../components/GroupList";
import PulseLoading from "../../components/PulseLoading";

import { fetchGroups, fetchUserDetails } from "../../actions/userActions";


export default function MainHome({ navigation }) {
	const dispatch = useDispatch();
	const { groups, user, pulseLoading } = useSelector(state => state.user);
	const [refreshing, setRefreshing] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [visibleMenu, setVisibleMenu] = useState(false);
	const [checked, setChecked] = React.useState('first');

	useEffect(() => {
		dispatch(fetchGroups(user.userID));
	}, [navigation]);
	const onRefresh = useCallback(() => {
		setRefreshing(true);
		dispatch(fetchGroups(user.userID));
		dispatch(fetchUserDetails(user.userID));
		if (!pulseLoading) setRefreshing(false);
	}, []);
	return (
		<MenuProvider>
			<View className='flex-1 justify-between'>

				<StatusBar barStyle='dark-content' />

				<HomeNavbar navigation={navigation} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

				{pulseLoading ?
					<PulseLoading />
					:
					<ScrollView className='h-[82.5%]' refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >

						<View className='flex-row justify-between items-center mx-[17px] mt-[20px] mb-[7px]'>
							<View>
								<Text className='text-black text-[16px] font-[Poppins-Medium]'>
									{user.you_borrow == 0 && user.you_lend == 0 ?
										<Text>You are settled up</Text>
										:
										<>
											Overall,
											{user.you_borrow != 0 && <Text> you borrow <Text className='text-[#ed4f00]'>₹ {user.you_borrow.toFixed(0)}</Text></Text>}
											{user.you_borrow != 0 && user.you_lend != 0 && <Text>{`\nand `}</Text>}
											{user.you_lend != 0 && <Text>{user.you_lend != 0 && user.you_borrow == 0 ? " " : ""}you lend <Text className='text-[#03a37e]'>₹ {user.you_lend.toFixed(0)}</Text></Text>}
										</>
									}
								</Text>
							</View>
							<Menu opened={visibleMenu} onBackdropPress={() => { setVisibleMenu(false) }} renderers={renderers.SlideInMenu}>
								<MenuTrigger>
									<TouchableNativeFeedback onPress={() => { setVisibleMenu(true) }}><View><Icon name='md-options-sharp' color='#5A5A5A' size={32} /></View></TouchableNativeFeedback>
								</MenuTrigger>
								<MenuOptions>
									<MenuOption onSelect={() => { setChecked('first') }}><View className='flex-row justify-start items-center'><RadioButton onPress={() => { setChecked('first') }} value='first' color='#03a37e' uncheckedColor='#03a37e' status={checked === 'first' ? 'checked' : 'unchecked'} /><Text className='text-black text-[16px] font-[Poppins-Medium]'>All Groups</Text></View></MenuOption>
									<MenuOption onSelect={() => { setChecked('second') }}><View className='flex-row justify-start items-center'><RadioButton onPress={() => { setChecked('second') }} value='second' color='#03a37e' uncheckedColor='#03a37e' status={checked === 'second' ? 'checked' : 'unchecked'} /><Text className='text-black text-[16px] font-[Poppins-Medium]'>Settled Up</Text></View></MenuOption>
									<MenuOption onSelect={() => { setChecked('third') }}><View className='flex-row justify-start items-center'><RadioButton onPress={() => { setChecked('third') }} value='third' color='#03a37e' uncheckedColor='#03a37e' status={checked === 'third' ? 'checked' : 'unchecked'} /><Text className='text-black text-[16px] font-[Poppins-Medium]'>You Owe</Text></View></MenuOption>
									<MenuOption onSelect={() => { setChecked('fourth') }}><View className='flex-row justify-start items-center'><RadioButton onPress={() => { setChecked('fourth') }} value='fourth' color='#03a37e' uncheckedColor='#03a37e' status={checked === 'fourth' ? 'checked' : 'unchecked'} /><Text className='text-black text-[16px] font-[Poppins-Medium]'>You are Owed</Text></View></MenuOption>
								</MenuOptions>
							</Menu>

						</View>

						{groups && groups.map((data) => {
							if (checked === 'first') {
								if (data.groupName.toLowerCase().includes(searchQuery.toLowerCase())) {
									return (
										<GroupList key={data.groupID} data={data} navigation={navigation} />
									)
								}
							}
							else if (checked === 'second') {
								if (data.you_borrow == 0 && data.you_lend == 0) {
									if (data.groupName.toLowerCase().includes(searchQuery.toLowerCase())) {
										return (
											<GroupList key={data.groupID} data={data} navigation={navigation} />
										)
									}
								}
							}
							else if (checked === 'third') {
								if (data.you_borrow != 0) {
									if (data.groupName.toLowerCase().includes(searchQuery.toLowerCase())) {
										return (
											<GroupList key={data.groupID} data={data} navigation={navigation} />
										)
									}
								}
							}
							else if (checked === 'fourth') {
								if (data.you_lend != 0) {
									if (data.groupName.toLowerCase().includes(searchQuery.toLowerCase())) {
										return (
											<GroupList key={data.groupID} data={data} navigation={navigation} />
										)
									}
								}
							}
						})}

						<View className='flex-row mx-[20px] mt-[17px]'>
							<View><Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/splitease-reactnative.appspot.com/o/images%2Fpersonal%2Fpersonal.jpeg?alt=media&token=2d3f531e-2c90-42a6-9d66-6246b0dca90f' }} className='w-[120px] h-[120px] mr-[10px] rounded-[10px]'></Image></View>
							<View className='mx-[10px] justify-center'>
								<Text className='text-black text-[16px] font-[Poppins-Medium]'>Non-group Expenses</Text>
								<Text className='text-[#03a37e] text-[16px] font-[Poppins-Medium]'>you are owed ₹64</Text>
							</View>
						</View>

						<View className='my-7 flex-row justify-center items-center'>
							<TouchableNativeFeedback onPress={() => { navigation.navigate('CreateGroup') }} background={TouchableNativeFeedback.Ripple('#DAFBF3', false)}>
								<View className='p-1 flex-row items-center rounded-lg border-[#03a37e] border-[2px]'>
									<View className='m-[5px]'><MAI name='group-add' color='#03a37e' size={25} /></View>
									<Text className='m-[5px] text-[#03a37e] text-[15px] font-[Poppins-Medium]'>Start a new group</Text>
								</View>
							</TouchableNativeFeedback>
						</View>

					</ScrollView>
				}

				<View className='absolute bottom-4 right-5' onPress={() => { navigation.navigate('AddExpense') }} >
					<TouchableNativeFeedback disabled={groups.length == 0} onPress={() => { navigation.navigate('AddExpense') }}>
						<Animatable.View animation={'bounceInUp'} className='flex-row items-center rounded-[50px] bg-[#03a37e] p-[10px] px-[15px]'>
							<View className='m-[5px]'><Feather name='money-bill-wave' color='white' size={20} /></View>
							<Text className='m-[5px] text-white text-[15px] font-[Poppins-Medium]'>Add Expense</Text>
						</Animatable.View>
					</TouchableNativeFeedback>
				</View>

			</View>
		</MenuProvider>
	)
}