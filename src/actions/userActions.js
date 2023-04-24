import {
    GOOGLE_REGISTER__REQUEST, GOOGLE_REGISTER__SUCCESS, GOOGLE_REGISTER__FAIL,
    GOOGLE_LOGOUT__REQUEST, GOOGLE_LOGOUT__SUCCESS, GOOGLE_LOGOUT__FAIL,

    CLEAR__MESSAGES, CLEAR__ERRORS,
    BOTTOM_TAB__VISIBLE, BOTTOM_TAB__HIDDEN
} from '../constants/userConstants';

import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import messaging from "@react-native-firebase/messaging";

const googleRegister = () => {
    return (
        async (dispatch) => {
            try {
                GoogleSignin.configure({ webClientId: '816983578662-2enaqagq6oo51ful143e4r5dd4ritf2r.apps.googleusercontent.com' });
                const res = await GoogleSignin.signIn();
                dispatch({
                    type: GOOGLE_REGISTER__REQUEST
                })
                const googleCredential = auth.GoogleAuthProvider.credential(res.idToken);
                await auth().signInWithCredential(googleCredential);
                const deviceToken = await messaging().getToken();
                const fireBase = await firestore().collection('users').add({
                    id: res.user.id,
                    name: res.user.name,
                    email: res.user.email,
                    avatar: res.user.photo,
                    deviceToken: deviceToken,
                })
                const data = {
                    message: 'Registered Successfully',
                    user: {
                        userID: fireBase.id,
                        name: res.user.name,
                        email: res.user.email,
                        avatar: res.user.photo,
                        authToken: res.idToken,
                        deviceToken: deviceToken,
                    }
                }
                dispatch({
                    type: GOOGLE_REGISTER__SUCCESS,
                    payload: data,
                })
            } catch (error) {
                dispatch({
                    type: GOOGLE_REGISTER__FAIL,
                    payload: error.response.data.message
                })
            }
        }
    )
}


const googleLogout = () => {
    return (
        async (dispatch) => {
            try {
                dispatch({
                    type: GOOGLE_LOGOUT__REQUEST
                })
                await GoogleSignin.signOut();
                const data = {
                    message: 'Logged Out Successfully',
                }
                dispatch({
                    type: GOOGLE_LOGOUT__SUCCESS,
                    payload: data,
                })
            } catch (error) {
                dispatch({
                    type: GOOGLE_LOGOUT__FAIL,
                    payload: error.response.data.message
                })
            }
        }
    )
}


const clearErrors = () => {
    return (
        async (dispatch) => {
            dispatch({ type: CLEAR__ERRORS });
        }
    )
}


const clearMessages = () => {
    return (
        async (dispatch) => {
            dispatch({ type: CLEAR__MESSAGES });
        }
    )
}

const bottomTabVisible = () => {
    return (
        async (dispatch) => {
            dispatch({ type: BOTTOM_TAB__VISIBLE });
        }
    )
}

const bottomTabHidden = () => {
    return (
        async (dispatch) => {
            dispatch({ type: BOTTOM_TAB__HIDDEN });
        }
    )
}


export { googleRegister, googleLogout, clearErrors, clearMessages, bottomTabVisible, bottomTabHidden };