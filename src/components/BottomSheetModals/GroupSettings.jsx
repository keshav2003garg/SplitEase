import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableNativeFeedback, FlatList, Share, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import MI from 'react-native-vector-icons/MaterialIcons';

import { fetchMembers, updateGroup, leaveGroup, deleteGroup, fetchGroup } from '../../actions/userActions';

export default function GroupSettings({ data, sheet, navigation }) {
	const dispatch = useDispatch();
	const { localLoading, spinLoading, groupMembers, user, groupInfo } = useSelector(state => state.user);
	const [group, setGroup] = useState({ name: groupInfo.groupName, type: 'trip', image: groupInfo.groupImage });

	useEffect(() => {
		dispatch(fetchMembers(data.groupID));
		dispatch(fetchGroup(data.groupID));
	}, []);

	const onShare = async () => {
		try {
			await Share.share({
				message:
					`Enter this code to join my SplitEase group under Accounts Section.\nGroup Code: ${data.joinCode}`,
			});
		} catch (error) {
			Alert.alert(error.message);
		}
	};

	const handleLeave = () => {
		dispatch(leaveGroup(user.userID,data.groupID));
		navigation.navigate("MainHome");
		if (!spinLoading) {
			sheet.forceClose();
		}
	}

	const handleDelete = () => {
		dispatch(deleteGroup(user.userID, data.groupID));
		navigation.navigate("MainHome");
		if (!spinLoading) {
			sheet.forceClose();
		}
	}

	return (
		<View className='flex-1'>

			<View className='mt-5 pb-[12px] border-[#D8D8D8] border-b-[0.55px]'><Text className='text-black text-xl font-[Poppins-Medium] ml-5'>Group Settings</Text></View>

			{spinLoading ? <SpinLoading /> : null}

			<View className='mx-5 my-4 pb-2 flex-row items-center'>
				<View className='border-2 border-[#AAAAAA] rounded-xl overflow-hidden'><Image source={{ uri: group.image }} className='w-16 h-16' /></View>
				<TextInput className='flex-1 mx-3 mb-2' label={<Text className='text-base font-[Poppins-Medium]'>Group name</Text>} value={group.name} mode='outlined' outlineColor='#5A5A5A' activeOutlineColor='#5A5A5A' outlineStyle={{ backgroundColor: 'white' }} onChangeText={(text) => { setGroup({ ...group, name: text }) }} />
				<TouchableNativeFeedback onPress={() => { dispatch(updateGroup(data.groupID, group.name)); dispatch(fetchGroup(data.groupID)); }} disabled={groupInfo.groupName === group.name} background={TouchableNativeFeedback.Ripple('#D0D0D0', false)}><View className={`p-3 ${groupInfo.groupName === group.name ? 'bg-red-300' : 'bg-red-500'} rounded-lg`}><Text className='text-white text-sm font-[Poppins-Medium]'>Update</Text></View></TouchableNativeFeedback>
			</View>

			<View className='border-b-2 border-[#D8D8D8]'></View>

			<Text className='mx-5 mt-5 mb-2 text-black text-sm font-[Poppins-Regular]'>Group Members</Text>

			<TouchableNativeFeedback onPress={onShare} background={TouchableNativeFeedback.Ripple('#D0D0D0', false)}>
				<View className='flex-row justify-between items-center'>
					<View className='px-5 py-3 flex-row items-center'>
						<View><MI name='link' size={30} color={'black'} /></View>
						<Text className='ml-6 text-black text-base font-[Poppins-Regular]'>Invite via Code</Text>
					</View>
					<View className='mr-5 p-2 bg-gray-400 rounded-lg'><Text className='text-black text-sm font-[Poppins-Regular]'>{groupInfo.joinCode}</Text></View>
				</View>
			</TouchableNativeFeedback>

			{localLoading ? <PulseLoading /> : <FlatList className='flex-grow-0' data={groupMembers} renderItem={({ item }) => <GroupMember data={item} />} keyExtractor={(item, index) => index.toString()} />}

			<View className='border-b-2 border-[#D8D8D8]'></View>

			<TouchableNativeFeedback onPress={handleLeave} background={TouchableNativeFeedback.Ripple('#D0D0D0', false)}>
				<View className='mt-3 px-5 py-3 flex-row items-center'>
					<View><MI name='logout' size={30} color={'#B9261C'} /></View>
					<Text className='ml-6 text-[#B9261C] text-base font-[Poppins-Regular]'>Leave Group</Text>
				</View>
			</TouchableNativeFeedback>
			<TouchableNativeFeedback onPress={handleDelete} background={TouchableNativeFeedback.Ripple('#D0D0D0', false)}>
				<View className='px-5 py-3 flex-row items-center'>
					<View><MI name='delete' size={30} color={'#B9261C'} /></View>
					<Text className='ml-6 text-[#B9261C] text-base font-[Poppins-Regular]'>Delete Group</Text>
				</View>
			</TouchableNativeFeedback>

		</View>
	)
}

const GroupMember = ({ data }) => {
	return (
		<View className='mb-5 px-5 pt-2 flex-row items-center'>
			<View className='rounded-full overflow-hidden'><Image className='w-12 h-12' source={{ uri: data.avatar }} /></View>
			<View className='ml-2'>
				<Text className='text-black text-sm font-[Poppins-Medium]'>{data.name}</Text>
				<Text className='text-[#5A5A5A] text-xs font-[Poppins-Regular]'>{data.email}</Text>
			</View>
		</View>
	)
}

const PulseLoading = () => {
	return (
		<View className='mb-5 px-5 pt-2 flex-row items-center'>
			<View className='w-12 h-12 rounded-full bg-[#D8D8D8]'></View>
			<View className='ml-2 flex-1'>
				<View className='my-1 w-14 h-2 rounded-full bg-[#D8D8D8]'></View>
				<View className='my-1 w-24 h-2 rounded-full bg-[#D8D8D8]'></View>
			</View>
		</View>
	)
}

const SpinLoading = () => {
	return (
		<ActivityIndicator animating={true} color={MD2Colors.red800} className='mt-4' size={30} />
	)
}