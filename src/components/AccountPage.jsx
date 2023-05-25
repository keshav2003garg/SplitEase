import React, { useState, useEffect } from 'react';
import { View, Text, TouchableNativeFeedback, Linking, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import NotificationSetting from 'react-native-open-notification';
import Toast from 'react-native-toast-message';
import AwesomeAlert from 'react-native-awesome-alerts';
import MI from 'react-native-vector-icons/MaterialIcons';
import EN from 'react-native-vector-icons/Entypo';

import { googleLogout, enableBiometric, disableBiometric, fetchUserDetails } from '../actions/userActions';

export default function AccountPage({ isModalVisible, handleSheet }) {
    const dispatch = useDispatch();
    const { user, isFingerPrintNeeded } = useSelector(state => state.user);
    const [alert, setAlert] = useState(false);

    const handleConfirm = () => {
        setAlert(false);
        if (isFingerPrintNeeded) {
            Toast.show({
                type: 'custom',
                position: 'bottom',
                text1: 'App lock removed successfully',
            });
            dispatch(disableBiometric());
        } else {
            Toast.show({
                type: 'custom',
                position: 'bottom',
                text1: 'App lock set successfully',
            });
            dispatch(enableBiometric());
        }
    }

    useEffect(() => {
        dispatch(fetchUserDetails(user.userID));
    }, []);
    return (
        <>
            <View className='px-4 mt-5 pb-3 flex-row justify-between items-center'>
                <View className='flex-row items-center'>
                    <View className={`rounded-full overflow-hidden ${isModalVisible.visible ? 'opacity-70' : 'opacity-100'}`}><Image className='w-20 h-20 scale-[1.25]' source={require('../../assets/img/avatar.jpg')} /></View>
                    <View className='ml-2'>
                        <Text className='text-black text-base font-[Poppins-Medium]'>{user.name}</Text>
                        <Text className='text-[#5A5A5A] text-sm font-[Poppins-Regular]'>{user.email}</Text>
                    </View>
                </View>
                <TouchableNativeFeedback onPress={() => { handleSheet('profile') }}><MI name='edit' size={27} color={'black'} /></TouchableNativeFeedback>
            </View>

            <View className={`my-3 border-b-2 border-[${isModalVisible.visible ? '#AAAAAA' : '#D8D8D8'}]`}></View>

            <TouchableNativeFeedback onPress={() => { handleSheet('join') }} background={TouchableNativeFeedback.Ripple('#D0D0D0', false)}>
                <View className='px-5 py-3 flex-row items-center' >
                    <View><EN name='link' size={30} color={'black'} /></View>
                    <Text className='ml-6 text-black text-base font-[Poppins-Regular]'>Join by Code</Text>
                </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => { handleSheet('payment') }} background={TouchableNativeFeedback.Ripple('#D0D0D0', false)}>
                <View className='px-5 py-3 flex-row items-center'>
                    <View><MI name='payments' size={30} color={'black'} /></View>
                    <Text className='ml-6 text-black text-base font-[Poppins-Regular]'>Your Payment Details</Text>
                </View>
            </TouchableNativeFeedback>

            <Text className='mx-5 mt-4 mb-2 text-black text-sm font-[Poppins-Regular]'>Preferences</Text>

            {/* <TouchableNativeFeedback onPress={() => { handleSheet('emailSetting') }} background={TouchableNativeFeedback.Ripple('#D0D0D0', false)}>
                <View className='px-5 py-3 flex-row items-center'>
                    <View><MI name='email' size={30} color={'black'} /></View>
                    <Text className='ml-6 text-black text-base font-[Poppins-Regular]'>Email Settings</Text>
                </View>
            </TouchableNativeFeedback> */}
            <TouchableNativeFeedback onPress={() => { setAlert(true) }} background={TouchableNativeFeedback.Ripple('#D0D0D0', false)}>
                <View className='px-5 py-3 flex-row items-center'>
                    <View><MI name='lock' size={30} color={'black'} /></View>
                    <Text className='ml-6 text-black text-base font-[Poppins-Regular]'>Lock your App</Text>
                </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => { NotificationSetting.open() }} background={TouchableNativeFeedback.Ripple('#D0D0D0', false)}>
                <View className='px-5 py-3 flex-row items-center'>
                    <View><MI name='notifications' size={30} color={'black'} /></View>
                    <Text className='ml-6 text-black text-base font-[Poppins-Regular]'>Notification settings</Text>
                </View>
            </TouchableNativeFeedback>

            <Text className='mx-5 mt-4 mb-2 text-black text-sm font-[Poppins-Regular]'>Feedback</Text>

            <TouchableNativeFeedback onPress={() => { Linking.openURL("market://details?id=com.Splitwise.SplitwiseMobile") }} background={TouchableNativeFeedback.Ripple('#D0D0D0', false)}>
                <View className='px-5 py-3 flex-row items-center'>
                    <View><MI name='star' size={30} color={'black'} /></View>
                    <Text className='ml-6 text-black text-base font-[Poppins-Regular]'>Rate SplitEase</Text>
                </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => { Linking.openURL("mailto:support@splitease.com") }} background={TouchableNativeFeedback.Ripple('#D0D0D0', false)}>
                <View className='px-5 py-3 flex-row items-center'>
                    <View><MI name='contact-support' size={30} color={'black'} /></View>
                    <Text className='ml-6 text-black text-base font-[Poppins-Regular]'>Contact SplitEase Support</Text>
                </View>
            </TouchableNativeFeedback>

            <View className={`my-3 border-b-2 border-[${isModalVisible.visible ? '#AAAAAA' : '#D8D8D8'}]`}></View>

            <TouchableNativeFeedback onPress={() => { dispatch(googleLogout()) }} background={TouchableNativeFeedback.Ripple('#D0D0D0', false)}>
                <View className='px-5 py-3 flex-row items-center'>
                    <View><MI name='logout' size={30} color={'#5A5A5A'} /></View>
                    <Text className='ml-6 text-[#5A5A5A] text-base font-[Poppins-Regular]'>Logout</Text>
                </View>
            </TouchableNativeFeedback>

            <AwesomeAlert show={alert} showProgress={false} title={isFingerPrintNeeded ? 'Unlock' : 'Lock'} message={isFingerPrintNeeded ? 'Do you really wanna remove App Lock' : 'Do you really wanna set App Lock'} closeOnTouchOutside={false} closeOnHardwareBackPress={true} showCancelButton={true} showConfirmButton={true} cancelText="No" confirmText={isFingerPrintNeeded ? 'Yes, Unlock it' : 'Yes, Lock it'} confirmButtonColor="#DD6B55" onCancelPressed={() => { setAlert(false) }} titleStyle={{ fontFamily: 'Poppins-Medium' }} onConfirmPressed={handleConfirm} messageStyle={{ fontFamily: 'Poppins-Regular' }} cancelButtonTextStyle={{ fontFamily: 'Poppins-Regular' }} confirmButtonTextStyle={{ fontFamily: 'Poppins-Regular' }} />
        </>
    )
}