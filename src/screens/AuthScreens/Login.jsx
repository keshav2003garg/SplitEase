import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import * as Animatable from 'react-native-animatable';

export default function SingnInScreen({ navigation }) {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null);
    const [secureTextEntry, setSecureTextEntry] = useState(true)

    const handleSecureTextEntry = () => {
        secureTextEntry ? setSecureTextEntry(false) : setSecureTextEntry(true);
    }
    const emailValidator = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        return reg.test(text) ? true : false;
    }

    return (
        <LinearGradient className="flex-1 bg-[#282d30]" colors={["#000000", "#434343"]}>

            <View className='flex-1 justify-end'><Text className='ml-5 mb-7 text-white text-[30px] font-[Poppins-Bold]'>Welcome Back!</Text></View>

            <Animatable.View className='flex-[2_2_0%] px-6 py-10 bg-white rounded-[30px]' animation='fadeInUpBig'>

                <View className='mb-6'>
                    <Text className='text-[#05375a] text-base font-[Poppins-Medium]'>Email</Text>
                    <View className='flex-row items-center border-b-[1px] border-[#f2f2f2]'>
                        <FontAwesome name='user-o' color='#05375a' size={20} />
                        <TextInput className='h-9 p-[10px] flex-1 text-[#05375a]' placeholder="Your Email" autoComplete='email' autoCapitalize='none' value={email} onChangeText={(text) => { setEmail(text) }} />
                        {!email || email == '' || !emailValidator(email) ? null : <Animatable.View animation='bounceIn'><Feather name='check-circle' color='#282d30' size={20} /></Animatable.View>}
                    </View>
                </View>

                <View className='mb-6'>
                    <Text className='text-[#05375a] text-base font-[Poppins-Medium]'>Password</Text>
                    <View className='flex-row items-center border-b-[1px] border-[#f2f2f2]'>
                        <FontAwesome name='lock' color='#05375a' size={20} />
                        <TextInput className='h-9 p-[10px] flex-1 text-[#05375a]' placeholder="Your Password" secureTextEntry={secureTextEntry} autoCapitalize='none' value={password} onChangeText={(text) => { setPassword(text) }} />
                        <TouchableOpacity onPress={handleSecureTextEntry}>{secureTextEntry ? <Feather name='eye' color='#282d30' size={20} /> : <Animatable.View animation='bounceIn'><Feather name='eye-off' color='#282d30' size={20} /></Animatable.View>}</TouchableOpacity>
                    </View>
                </View>


                <TouchableOpacity className='flex-row justify-center'>
                    <LinearGradient className='mt-5 py-2 flex-1 justify-center items-center rounded-xl' colors={['#000000', '#434343']} >
                        <Text className='text-white font-[Poppins-Bold]'>Sign In</Text>
                    </LinearGradient>
                </TouchableOpacity>

            </Animatable.View>

        </LinearGradient>
    )
}