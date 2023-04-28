import {
    GOOGLE_REGISTER__REQUEST, GOOGLE_REGISTER__SUCCESS, GOOGLE_REGISTER__FAIL,
    GOOGLE_LOGOUT__REQUEST, GOOGLE_LOGOUT__SUCCESS, GOOGLE_LOGOUT__FAIL,
    CREATE_GROUP__REQUEST, CREATE_GROUP__SUCCESS, CREATE_GROUP__FAIL,
    FETCH_GROUPS__REQUEST, FETCH_GROUPS__SUCCESS, FETCH_GROUPS__FAIL,
    JOIN_GROUP__REQUEST, JOIN_GROUP__SUCCESS, JOIN_GROUP__NOT_SUCCESS, JOIN_GROUP__FAIL,

    BIOMETRIC_NEEDED, BIOMETRIC_NOT_NEEDED,
    CLEAR__MESSAGES, CLEAR__ERRORS,
    BOTTOM_TAB__VISIBLE, BOTTOM_TAB__HIDDEN
} from '../constants/userConstants';

import auth from '@react-native-firebase/auth';
import createCode from '../utils/createJoinCode';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
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
                const details = await auth().signInWithCredential(googleCredential);
                const deviceToken = await messaging().getToken();
                if (details.additionalUserInfo.isNewUser) {
                    const fireBase = await firestore().collection('users').add({
                        id: res.user.id,
                        name: res.user.name,
                        email: res.user.email,
                        avatar: res.user.photo,
                        deviceToken: deviceToken,
                        createdAt: firestore.FieldValue.serverTimestamp(),
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
                } else {
                    const fireBase = await firestore().collection('users').where('id', '==', res.user.id).get();
                    const data = {
                        message: 'Logged In Successfully',
                        user: {
                            userID: fireBase.docs[0].id,
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
                }

            } catch (error) {
                dispatch({
                    type: GOOGLE_REGISTER__FAIL,
                    payload: error.response
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
                    payload: error.response
                })
            }
        }
    )
}


const createGroup = ({ name, type, image, members }) => {
    return (
        async (dispatch) => {
            try {
                dispatch({
                    type: CREATE_GROUP__REQUEST
                })
                if (!image) {
                    const ref = storage().ref(`/images/trip/${Math.floor((Math.random() * 20) + 1)}.png`);
                    const url = await ref.getDownloadURL();
                    image = url;
                }
                const code = createCode(6);
                const fireBase = await firestore().collection('groups').add({
                    groupName: name,
                    groupType: type,
                    groupImage: image,
                    groupMembers: members,
                    joinCode: code,
                    createdAt: firestore.FieldValue.serverTimestamp(),
                    createdBy: members[0]
                })
                await firestore().collection('users').doc(members[0]).update({
                    groupsJoined: firestore.FieldValue.arrayUnion(fireBase.id)
                });
                const data = {
                    message: 'Group Created Successfully',
                    group: {
                        groupID: fireBase.id,
                        groupName: name,
                        groupType: type,
                        groupImage: image,
                        groupMembers: members,
                        joinCode: code,
                    },

                }
                dispatch({
                    type: CREATE_GROUP__SUCCESS,
                    payload: data,
                })
            } catch (error) {
                console.log(error)
                dispatch({
                    type: CREATE_GROUP__FAIL,
                    payload: error.response
                })
            }
        }
    )
}


const fetchGroups = (userID) => {
    return (
        async (dispatch) => {
            try {
                dispatch({
                    type: FETCH_GROUPS__REQUEST
                })
                const fireBase = await firestore().collection('users').doc(userID).get();
                const groupsJoined = fireBase.data().groupsJoined;
                const groups = [];

                for (let i = 0; i < groupsJoined.length; i++) {
                    const group = await firestore().collection('groups').doc(groupsJoined[i]).get();
                    groups.push({
                        groupID: group.id,
                        groupName: group.data().groupName,
                        groupType: group.data().groupType,
                        groupImage: group.data().groupImage,
                        groupMembers: group.data().groupMembers,
                        joinCode: group.data().joinCode,
                    });
                }
                const data = {
                    message: 'Groups Fetched Successfully',
                    groups: groups,
                }
                dispatch({
                    type: FETCH_GROUPS__SUCCESS,
                    payload: data,
                })
            } catch (error) {
                dispatch({
                    type: FETCH_GROUPS__FAIL,
                    payload: error.response
                })
            }
        }
    )
}

const joinGroup = (userID, joinCode) => {
    return (
        async (dispatch) => {
            try {
                dispatch({
                    type: JOIN_GROUP__REQUEST
                })
                const fireBase = await firestore().collection('groups').where('joinCode', '==', joinCode).get();
                if (fireBase.empty) {
                    const data = {
                        error: 'No Group Found',
                    }
                    dispatch({
                        type: JOIN_GROUP__NOT_SUCCESS,
                        payload: data,
                    })
                } else {
                    const groupID = fireBase.docs[0].id;
                    const groupMembers = fireBase.docs[0].data().groupMembers;
                    if (groupMembers.includes(userID)) {
                        const data = {
                            error: 'Already Joined',
                        }
                        dispatch({
                            type: JOIN_GROUP__NOT_SUCCESS,
                            payload: data,
                        })
                    } else {
                        await firestore().collection('groups').doc(groupID).update({
                            groupMembers: firestore.FieldValue.arrayUnion(userID)
                        });
                        await firestore().collection('users').doc(userID).update({
                            groupsJoined: firestore.FieldValue.arrayUnion(groupID)
                        });
                        const data = {
                            message: 'Group Joined Successfully',
                            group: {
                                groupID: groupID,
                                groupName: fireBase.docs[0].data().groupName,
                                groupType: fireBase.docs[0].data().groupType,
                                groupImage: fireBase.docs[0].data().groupImage,
                                groupMembers: fireBase.docs[0].data().groupMembers,
                                joinCode: fireBase.docs[0].data().joinCode,
                            },
                        }
                        dispatch({
                            type: JOIN_GROUP__SUCCESS,
                            payload: data,
                        })
                    }
                }
            } catch (error) {
                dispatch({
                    type: JOIN_GROUP__FAIL,
                    payload: error.response
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

const enableBiometric = () => {
    return (
        async (dispatch) => {
            dispatch({ type: BIOMETRIC_NEEDED });
        }
    )
}

const disableBiometric = () => {
    return (
        async (dispatch) => {
            dispatch({ type: BIOMETRIC_NOT_NEEDED });
        }
    )
}



export {
    googleRegister, googleLogout,
    createGroup, fetchGroups, joinGroup,

    clearErrors, clearMessages, bottomTabVisible, bottomTabHidden, enableBiometric, disableBiometric
};