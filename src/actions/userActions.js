import {
    GOOGLE_REGISTER__REQUEST, GOOGLE_REGISTER__SUCCESS, GOOGLE_REGISTER__FAIL,
    GOOGLE_LOGOUT__REQUEST, GOOGLE_LOGOUT__SUCCESS, GOOGLE_LOGOUT__FAIL,
    CREATE_GROUP__REQUEST, CREATE_GROUP__SUCCESS, CREATE_GROUP__FAIL,
    FETCH_GROUPS__REQUEST, FETCH_GROUPS__SUCCESS, FETCH_GROUPS__FAIL,
    FETCH_GROUP__REQUEST, FETCH_GROUP__SUCCESS, FETCH_GROUP__FAIL,
    JOIN_GROUP__REQUEST, JOIN_GROUP__SUCCESS, JOIN_GROUP__NOT_SUCCESS, JOIN_GROUP__FAIL,
    FETCH_GROUP_MEMBERS__REQUEST, FETCH_GROUP_MEMBERS__SUCCESS, FETCH_GROUP_MEMBERS__FAIL,
    LEAVE_GROUP__REQUEST, LEAVE_GROUP__SUCCESS, LEAVE_GROUP__FAIL,
    DELETE_GROUP__REQUEST, DELETE_GROUP__SUCCESS, DELETE_GROUP__FAIL,
    UPDATE_GROUP__REQUEST, UPDATE_GROUP__SUCCESS, UPDATE_GROUP__FAIL,
    FETCH_USER_DETAILS__REQUEST, FETCH_USER_DETAILS__SUCCESS, FETCH_USER_DETAILS__FAIL,
    UPDATE_USER_DETAILS__REQUEST, UPDATE_USER_DETAILS__SUCCESS, UPDATE_USER_DETAILS__FAIL,
    UPDATE_PAYMENT_DETAILS__REQUEST, UPDATE_PAYMENT_DETAILS__SUCCESS, UPDATE_PAYMENT_DETAILS__FAIL,
    ADD_EXPENSE__REQUEST, ADD_EXPENSE__SUCCESS, ADD_EXPENSE__FAIL,
    FETCH_BALANCE__REQUEST, FETCH_BALANCE__SUCCESS, FETCH_BALANCE__FAIL,
    FETCH_CATEGORIES_CHART__REQUEST, FETCH_CATEGORIES_CHART__SUCCESS, FETCH_CATEGORIES_CHART__FAIL,
    FETCH_GROUP_CHART__REQUEST, FETCH_GROUP_CHART__SUCCESS, FETCH_GROUP_CHART__FAIL,
    FETCH_SPENDS_CHART__REQUEST, FETCH_SPENDS_CHART__SUCCESS, FETCH_SPENDS_CHART__FAIL,
    ADD_SETTLEMENT__REQUEST, ADD_SETTLEMENT__SUCCESS, ADD_SETTLEMENT__FAIL,
    FETCH_SETTLEMENTS__REQUEST, FETCH_SETTLEMENTS__SUCCESS, FETCH_SETTLEMENTS__FAIL,

    BIOMETRIC_NEEDED, BIOMETRIC_NOT_NEEDED,
    CLEAR__MESSAGES, CLEAR__ERRORS,
    BOTTOM_TAB__VISIBLE, BOTTOM_TAB__HIDDEN,
    ADD_ACTIVITY,
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
                        phoneNumber: '',
                        groupsJoined: [],
                        paymentDetails: {
                            upi: '',
                            paytm: '',
                        },
                        you_borrow: 0,
                        you_lend: 0,
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
                            createdAt: firestore.FieldValue.serverTimestamp(),
                            phoneNumber: '',
                            groupsJoined: [],
                            paymentDetails: {
                                upi: '',
                                paytm: '',
                            },
                            you_borrow: 0,
                            you_lend: 0,
                        }
                    }
                    dispatch({
                        type: GOOGLE_REGISTER__SUCCESS,
                        payload: data,
                    })
                } else {
                    const fireBase = await firestore().collection('users').where('id', '==', res.user.id).get();
                    await firestore().collection('users').doc(fireBase.docs[0].id).update({
                        deviceToken: deviceToken
                    })
                    const date = new Date(fireBase.docs[0].data().createdAt);
                    const data = {
                        message: 'Logged In Successfully',
                        user: {
                            userID: fireBase.docs[0].id,
                            name: fireBase.docs[0].data().name,
                            email: fireBase.docs[0].data().email,
                            avatar: fireBase.docs[0].data().avatar,
                            authToken: res.idToken,
                            deviceToken: deviceToken,
                            createdAt: date,
                            phoneNumber: fireBase.docs[0].data().phoneNumber,
                            groupsJoined: fireBase.docs[0].data().groupsJoined,
                            paymentDetails: fireBase.docs[0].data().paymentDetails,
                            you_borrow: fireBase.docs[0].data().you_borrow,
                            you_lend: fireBase.docs[0].data().you_lend,
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
                    payload: error.toString()
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
                    payload: error.toString()
                })
            }
        }
    )
}



const createGroup = ({ name, type, image, members }) => {
    return (
        async (dispatch) => {
            try {
                if (!name) {
                    dispatch({
                        type: CREATE_GROUP__FAIL,
                        payload: 'Please Enter Group Name'
                    })
                    return;
                }
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
                    expenses: [],
                    payments: [{ userID: members[0], borrow: 0, lend: 0 }],
                    settlements: [],
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
                        expenses: [],
                        payments: [{ userID: members[0], borrow: 0, lend: 0 }],
                        settlements: [],
                        createdBy: members[0],
                        createdAt: firestore.FieldValue.serverTimestamp(),
                    },
                }
                dispatch({
                    type: CREATE_GROUP__SUCCESS,
                    payload: data,
                })
            } catch (error) {
                dispatch({
                    type: CREATE_GROUP__FAIL,
                    payload: error.toString()
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
                    const you = group.data().payments.filter((item) => item.userID === userID);
                    groups.push({
                        groupID: group.id,
                        groupName: group.data().groupName,
                        groupType: group.data().groupType,
                        groupImage: group.data().groupImage,
                        groupMembers: group.data().groupMembers,
                        joinCode: group.data().joinCode,
                        expenses: group.data().expenses,
                        payments: group.data().payments,
                        settlements: group.data().settlements,
                        createdBy: group.data().createdBy,
                        createdAt: group.data().createdAt,
                        borrow: you[0].borrow,
                        lend: you[0].lend,
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
                    payload: error.toString()
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
                if (!joinCode) {
                    const data = {
                        error: 'Join Code is Required',
                    }
                    dispatch({
                        type: JOIN_GROUP__NOT_SUCCESS,
                        payload: data,
                    })
                    return;
                }
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
                            groupMembers: firestore.FieldValue.arrayUnion(userID),
                            payments: [...fireBase.docs[0].data().payments, { userID: userID, borrow: 0, lend: 0 }]
                        });
                        await firestore().collection('users').doc(userID).update({
                            groupsJoined: firestore.FieldValue.arrayUnion(groupID)
                        });
                        const group = await firestore().collection('groups').doc(groupID).get();
                        const user = await firestore().collection('users').doc(userID).get();
                        const deviceTokens = [];
                        const message = {
                            "title": `New Member Joined`,
                            "body": `${user.data().name} has just joined ${group.data().groupName} group`,
                            "color": "#ffa500",
                            "priority": "high",
                            "content_available": true
                        }
                        for (let i = 0; i < groupMembers.length; i++) {
                            const token = await firestore().collection('users').doc(groupMembers[i]).get();
                            deviceTokens.push(token.data().deviceToken);
                        }
                        const response = await fetch('https://fcm.googleapis.com/fcm/send', {
                            method: 'POST',
                            headers: {
                                'authorization': 'key=AAAAvjgEGCY:APA91bHyPolgpCQwV3Z0K32F3RRnuvpye0shUTeP4zW0mQq-W9AvoyjS9cUB2EIoPG21cZApasenBnLWVZpEDVhs5mzRgJvgLgRgDUnH0cBcFIhVLorD-tDq1Q-Ivu5ZhsG-0cLB0szU',
                                'content-type': 'application/json',
                            },
                            body: `{
                                "registration_ids": ${JSON.stringify(deviceTokens)},
                                "notification": ${JSON.stringify(message)}
                            }`,
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
                                expenses: fireBase.docs[0].data().expenses,
                                payments: fireBase.docs[0].data().payments,
                                settlements: fireBase.docs[0].data().settlements,
                                createdBy: fireBase.docs[0].data().createdBy,
                                createdAt: fireBase.docs[0].data().createdAt,
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
                    payload: error.toString()
                })
            }
        }
    )
}



const fetchMembers = (groupID) => {
    return (
        async (dispatch) => {
            try {
                dispatch({
                    type: FETCH_GROUP_MEMBERS__REQUEST
                })
                const fireBase = await firestore().collection('groups').doc(groupID).get();
                const groupMembers = fireBase.data().groupMembers;
                const members = [];
                for (let i = 0; i < groupMembers.length; i++) {
                    const member = await firestore().collection('users').doc(groupMembers[i]).get();
                    members.push({
                        userID: member.id,
                        name: member.data().name,
                        email: member.data().email,
                        avatar: member.data().avatar,
                    });
                }
                const data = {
                    message: 'Members Fetched Successfully',
                    groupMembers: members,
                }
                dispatch({
                    type: FETCH_GROUP_MEMBERS__SUCCESS,
                    payload: data,
                })
            } catch (error) {
                dispatch({
                    type: FETCH_GROUP_MEMBERS__FAIL,
                    payload: error.toString()
                })
            }
        }
    )
}



const leaveGroup = (userID, groupID) => {
    return (
        async (dispatch) => {
            try {
                dispatch({
                    type: LEAVE_GROUP__REQUEST
                })
                await firestore().collection('groups').doc(groupID).update({
                    groupMembers: firestore.FieldValue.arrayRemove(userID)
                });
                await firestore().collection('users').doc(userID).update({
                    groupsJoined: firestore.FieldValue.arrayRemove(groupID)
                });
                const data = {
                    message: 'Group Left Successfully',
                    groupID: groupID,
                }
                dispatch({
                    type: LEAVE_GROUP__SUCCESS,
                    payload: data,
                })
            } catch (error) {
                dispatch({
                    type: LEAVE_GROUP__FAIL,
                    payload: error.toString()
                })
            }
        }
    )
}



const deleteGroup = (userID, groupID) => {
    return (
        async (dispatch) => {
            try {
                dispatch({
                    type: DELETE_GROUP__REQUEST
                })
                const group = await firestore().collection('groups').doc(groupID).get();
                for (let i = 0; i < group.data().groupMembers.length; i++) {
                    await firestore().collection('users').doc(group.data().groupMembers[i]).update({
                        groupsJoined: firestore.FieldValue.arrayRemove(groupID)
                    });
                }
                await firestore().collection('groups').doc(groupID).delete();
                const data = {
                    message: 'Group Deleted Successfully',
                    groupID: groupID,
                }
                dispatch({
                    type: DELETE_GROUP__SUCCESS,
                    payload: data,
                })
            } catch (error) {
                dispatch({
                    type: DELETE_GROUP__FAIL,
                    payload: error.toString()
                })
            }
        }
    )
}



const updateGroup = (groupID, groupName) => {
    return (
        async (dispatch) => {
            try {
                dispatch({
                    type: UPDATE_GROUP__REQUEST
                })
                if (!groupName) {
                    dispatch({
                        type: UPDATE_GROUP__FAIL,
                        payload: 'Group Name is Required',
                    })
                    return;
                }
                await firestore().collection('groups').doc(groupID).update({
                    groupName: groupName,
                });
                const data = {
                    message: 'Group Updated Successfully',
                }
                dispatch({
                    type: UPDATE_GROUP__SUCCESS,
                    payload: data,
                })
            } catch (error) {
                dispatch({
                    type: UPDATE_GROUP__FAIL,
                    payload: error.toString()
                })
            }
        }
    )
}



const fetchGroup = (groupID, userID) => {
    return (
        async (dispatch) => {
            try {
                dispatch({
                    type: FETCH_GROUP__REQUEST
                })
                const fireBase = await firestore().collection('groups').doc(groupID).get();

                const data = {
                    message: 'Group Fetched Successfully',
                    group: {
                        groupID: fireBase.id,
                        groupName: fireBase.data().groupName,
                        groupType: fireBase.data().groupType,
                        groupImage: fireBase.data().groupImage,
                        groupMembers: fireBase.data().groupMembers,
                        joinCode: fireBase.data().joinCode,
                        expenses: fireBase.data().expenses,
                        payments: fireBase.data().payments,
                        settlements: fireBase.data().settlements,
                        createdBy: fireBase.data().createdBy,
                        createdAt: fireBase.data().createdAt,
                    },
                }
                dispatch({
                    type: FETCH_GROUP__SUCCESS,
                    payload: data,
                })
            } catch (error) {
                dispatch({
                    type: FETCH_GROUP__FAIL,
                    payload: error.toString()
                })
            }
        }
    )
}



const fetchUserDetails = (userID) => {
    return (
        async (dispatch) => {
            try {
                dispatch({
                    type: FETCH_USER_DETAILS__REQUEST
                })
                const fireBase = await firestore().collection('users').doc(userID).get();
                const data = {
                    message: 'User Details Fetched Successfully',
                    user: {
                        userID: fireBase.id,
                        name: fireBase.data().name,
                        email: fireBase.data().email,
                        avatar: fireBase.data().avatar,
                        deviceToken: fireBase.data().deviceToken,
                        createdAt: fireBase.data().createdAt,
                        phoneNumber: fireBase.data().phoneNumber,
                        groupsJoined: fireBase.data().groupsJoined,
                        paymentDetails: fireBase.data().paymentDetails,
                        you_borrow: fireBase.data().you_borrow,
                        you_lend: fireBase.data().you_lend,
                    },
                }
                dispatch({
                    type: FETCH_USER_DETAILS__SUCCESS,
                    payload: data,
                })
            } catch (error) {
                dispatch({
                    type: FETCH_USER_DETAILS__FAIL,
                    payload: error.toString()
                })
            }
        }
    )
}



const updateUserDetails = (userID, { name, email, phone }) => {
    return (
        async (dispatch) => {
            try {
                dispatch({
                    type: UPDATE_USER_DETAILS__REQUEST
                })
                if (!name) {
                    dispatch({
                        type: UPDATE_USER_DETAILS__FAIL,
                        payload: 'Name is Required',
                    })
                    return;
                }
                if (!email) {
                    dispatch({
                        type: UPDATE_USER_DETAILS__FAIL,
                        payload: 'Email is Required',
                    })
                    return;
                }
                await firestore().collection('users').doc(userID).update({
                    name: name,
                    email: email,
                    phoneNumber: phone,
                });
                const data = {
                    message: 'Details Updated Successfully',
                    user: {
                        name: name,
                        email: email,
                        phoneNumber: phone,
                    },
                }
                dispatch({
                    type: UPDATE_USER_DETAILS__SUCCESS,
                    payload: data,
                })
            } catch (error) {
                dispatch({
                    type: UPDATE_USER_DETAILS__FAIL,
                    payload: error.toString()
                })
            }
        }
    )
}



const updatePamentDetails = (userID, { upi, paytm }) => {
    return (
        async (dispatch) => {
            try {
                dispatch({
                    type: UPDATE_PAYMENT_DETAILS__REQUEST
                })
                if (!upi && !paytm) {
                    dispatch({
                        type: UPDATE_PAYMENT_DETAILS__FAIL,
                        payload: 'Atleast one Payment Detail is Required',
                    })
                    return;
                }
                await firestore().collection('users').doc(userID).update({
                    paymentDetails: {
                        upi: upi,
                        paytm: paytm,
                    }
                });
                const data = {
                    message: 'Payment Details Updated Successfully',
                    user: {
                        paymentDetails: {
                            upi: upi,
                            paytm: paytm,
                        }
                    },
                }
                dispatch({
                    type: UPDATE_PAYMENT_DETAILS__SUCCESS,
                    payload: data,
                })
            } catch (error) {
                dispatch({
                    type: UPDATE_PAYMENT_DETAILS__FAIL,
                    payload: error.toString()
                })
            }
        }
    )
}



const addExpense = (groupID, { expenseName, expenseAmount, expensePaidBy, expenseCategory }) => {
    return (
        async (dispatch) => {
            try {
                dispatch({
                    type: ADD_EXPENSE__REQUEST
                })
                if (!expenseName) {
                    dispatch({
                        type: ADD_EXPENSE__FAIL,
                        payload: 'Expense Name is Required',
                    })
                    return;
                }
                if (!expenseAmount) {
                    dispatch({
                        type: ADD_EXPENSE__FAIL,
                        payload: 'Expense Amount is Required',
                    })
                    return;
                }
                const fireBase = await firestore().collection('groups').doc(groupID).get();
                const groupMembers = fireBase.data().groupMembers;
                if (groupMembers.length === 1) {
                    dispatch({
                        type: ADD_EXPENSE__FAIL,
                        payload: 'There should be atleast 2 members in the group',
                    })
                    return;
                }
                const payments = fireBase.data().payments;
                const groupMembersCount = groupMembers.length;
                const expenseAmountPerHead = Math.round(expenseAmount / groupMembersCount);
                const paidBy = await firestore().collection('users').doc(expensePaidBy).get();
                const ref = storage().ref(`/icons/categories/${expenseCategory.toLowerCase()}.png`);
                const url = await ref.getDownloadURL();
                const expense = {
                    expenseName: expenseName,
                    expenseAmount: expenseAmount,
                    expensePaidBy: { userID: paidBy.id, name: paidBy.data().name.split(' ')[0] },
                    expenseAmountPerHead: expenseAmountPerHead,
                    expenseCreatedAt: new Date(),
                    expenseFor: groupMembers.filter((member) => member !== expensePaidBy),
                    expenseCategory: url,
                    expenseCategoryName: expenseCategory,
                    groupName: fireBase.data().groupName,
                }
                await firestore().collection('groups').doc(groupID).update({
                    expenses: firestore.FieldValue.arrayUnion(expense),
                });
                for (let i = 0; i < groupMembersCount; i++) {
                    if (groupMembers[i] === expensePaidBy) {
                        await firestore().collection('users').doc(groupMembers[i]).update({
                            you_lend: firestore.FieldValue.increment(expenseAmount - expenseAmountPerHead),
                        });
                    } else {
                        await firestore().collection('users').doc(groupMembers[i]).update({
                            you_borrow: firestore.FieldValue.increment(expenseAmountPerHead),
                        });
                    }
                }
                const newPayments = [];
                for (let i = 0; i < payments.length; i++) {
                    if (payments[i].userID === expensePaidBy) {
                        newPayments.push({ userID: payments[i].userID, borrow: payments[i].borrow, lend: payments[i].lend + (expenseAmount - expenseAmountPerHead) });
                    } else {
                        newPayments.push({ userID: payments[i].userID, borrow: payments[i].borrow + expenseAmountPerHead, lend: payments[i].lend });
                    }
                }
                await firestore().collection('groups').doc(groupID).update({
                    payments: newPayments,
                });
                const deviceTokens = [];
                const message = {
                    "title": `New expense added in ${fireBase.data().groupName} group`,
                    "body": `${expenseName} of ₹${expenseAmount} added by ${paidBy.data().name.split(' ')[0]}`,
                    "color": "#ffa500",
                    "priority": "high",
                    "content_available": true
                }
                for (let i = 0; i < groupMembers.length; i++) {
                    const token = await firestore().collection('users').doc(groupMembers[i]).get();
                    deviceTokens.push(token.data().deviceToken);
                }
                const response = await fetch('https://fcm.googleapis.com/fcm/send', {
                    method: 'POST',
                    headers: {
                        'authorization': 'key=AAAAvjgEGCY:APA91bHyPolgpCQwV3Z0K32F3RRnuvpye0shUTeP4zW0mQq-W9AvoyjS9cUB2EIoPG21cZApasenBnLWVZpEDVhs5mzRgJvgLgRgDUnH0cBcFIhVLorD-tDq1Q-Ivu5ZhsG-0cLB0szU',
                        'content-type': 'application/json',
                    },
                    body: `{
                        "registration_ids": ${JSON.stringify(deviceTokens)},
                        "notification": ${JSON.stringify(message)},
                        "data": ${JSON.stringify(expense)}
                    }`,
                });
                const data = {
                    message: 'Expense Added Successfully',
                    expense: expense,
                }
                dispatch({
                    type: ADD_EXPENSE__SUCCESS,
                    payload: data,
                })
            } catch (error) {
                dispatch({
                    type: ADD_EXPENSE__FAIL,
                    payload: error.toString()
                })
            }
        }
    )
}



const fetchbalance = (userID, groupID) => {
    return (
        async (dispatch) => {
            try {
                dispatch({
                    type: FETCH_BALANCE__REQUEST
                })
                const fireBase = await firestore().collection('groups').doc(groupID).get();
                const expenses = fireBase.data().expenses;
                const groupMembers = fireBase.data().groupMembers;

                let balance = [];
                for (let i = 0; i < groupMembers.length; i++) {
                    if (groupMembers[i] === userID) continue;
                    let total = 0;
                    for (let j = 0; j < expenses.length; j++) {
                        if (expenses[j].expensePaidBy.userID === groupMembers[i] && expenses[j].expenseFor.includes(userID)) {
                            total -= expenses[j].expenseAmountPerHead;
                        }
                        if (expenses[j].expensePaidBy.userID === userID && expenses[j].expenseFor.includes(groupMembers[i])) {
                            total += expenses[j].expenseAmountPerHead;
                        }
                    }
                    const user = await firestore().collection('users').doc(groupMembers[i]).get();
                    balance.push({
                        userID: groupMembers[i],
                        name: user.data().name,
                        avatar: user.data().avatar,
                        balance: Math.round(total),
                        email: user.data().email,
                        phoneNumber: user.data().phoneNumber,
                    })
                }
                let total = 0;
                for (let j = 0; j < balance.length; j++) {
                    total += parseInt(balance[j].balance);
                }
                let totalGroupSpent = 0, you_paid = 0, your_share = 0;
                for (let j = 0; j < expenses.length; j++) {
                    totalGroupSpent += parseInt(expenses[j].expenseAmount);
                    if (expenses[j].expensePaidBy.userID === userID) {
                        you_paid += parseInt(expenses[j].expenseAmount);
                    }
                    if (expenses[j].expenseFor.includes(userID) || expenses[j].expensePaidBy.userID === userID) {
                        your_share += parseInt(expenses[j].expenseAmountPerHead);
                    }
                }
                const data = {
                    message: 'Balance Fetched Successfully',
                    balance: balance,
                    total: Math.round(total),
                    totalGroupSpent: Math.round(totalGroupSpent),
                    you_paid: Math.round(you_paid),
                    your_share: Math.round(your_share),
                }
                dispatch({
                    type: FETCH_BALANCE__SUCCESS,
                    payload: data,
                })
            } catch (error) {
                console.log(error)
                dispatch({
                    type: FETCH_BALANCE__FAIL,
                    payload: error.toString()
                })
            }
        }
    )
}




const fetchCategoriesChart = (userID) => {
    return (
        async (dispatch) => {
            try {
                dispatch({
                    type: FETCH_CATEGORIES_CHART__REQUEST
                })
                const fireBase = await firestore().collection('users').doc(userID).get();
                const groupsJoined = fireBase.data().groupsJoined;
                const expenses = [
                    { category: 'Food', amount: 0 },
                    { category: 'Drinks', amount: 0 },
                    { category: 'Beverages', amount: 0 },
                    { category: 'Travel', amount: 0 },
                    { category: 'Taxi', amount: 0 },
                    { category: 'Hotel', amount: 0 },
                    { category: 'Shopping', amount: 0 },
                    { category: 'Utilities', amount: 0 },
                    { category: 'Medical', amount: 0 },
                    { category: 'EntryTicket', amount: 0 },
                    { category: 'Others', amount: 0 },
                ];
                for (let i = 0; i < groupsJoined.length; i++) {
                    const group = await firestore().collection('groups').doc(groupsJoined[i]).get();
                    const groupExpenses = group.data().expenses;
                    for (let j = 0; j < groupExpenses.length; j++) {
                        if (groupExpenses[j].expenseCategoryName === 'Food') {
                            expenses[0].amount += parseInt(groupExpenses[j].expenseAmount);
                        } else if (groupExpenses[j].expenseCategoryName === 'Drinks') {
                            expenses[1].amount += parseInt(groupExpenses[j].expenseAmount);
                        } else if (groupExpenses[j].expenseCategoryName === 'Beverages') {
                            expenses[2].amount += parseInt(groupExpenses[j].expenseAmount);
                        } else if (groupExpenses[j].expenseCategoryName === 'Travel') {
                            expenses[3].amount += parseInt(groupExpenses[j].expenseAmount);
                        } else if (groupExpenses[j].expenseCategoryName === 'Taxi') {
                            expenses[4].amount += parseInt(groupExpenses[j].expenseAmount);
                        } else if (groupExpenses[j].expenseCategoryName === 'Hotel') {
                            expenses[5].amount += parseInt(groupExpenses[j].expenseAmount);
                        } else if (groupExpenses[j].expenseCategoryName === 'Shopping') {
                            expenses[6].amount += parseInt(groupExpenses[j].expenseAmount);
                        } else if (groupExpenses[j].expenseCategoryName === 'Utilities') {
                            expenses[7].amount += parseInt(groupExpenses[j].expenseAmount);
                        } else if (groupExpenses[j].expenseCategoryName === 'Medical') {
                            expenses[8].amount += parseInt(groupExpenses[j].expenseAmount);
                        } else if (groupExpenses[j].expenseCategoryName === 'EntryTicket') {
                            expenses[9].amount += parseInt(groupExpenses[j].expenseAmount);
                        } else if (groupExpenses[j].expenseCategoryName === 'Others') {
                            expenses[10].amount += parseInt(groupExpenses[j].expenseAmount);
                        }
                    }
                }
                let chartData = [];
                for (let i = 0; i < expenses.length; i++) {
                    chartData.push(expenses[i].amount);
                }
                const data = {
                    message: 'Expense Chart Fetched Successfully',
                    chartData: chartData,
                }
                dispatch({
                    type: FETCH_CATEGORIES_CHART__SUCCESS,
                    payload: data,
                })
            } catch (error) {
                dispatch({
                    type: FETCH_CATEGORIES_CHART__FAIL,
                    payload: error.toString()
                })
            }
        }
    )
}




const fetchGroupsChart = (groupID) => {
    return (
        async (dispatch) => {
            try {
                dispatch({
                    type: FETCH_GROUP_CHART__REQUEST
                })
                const fireBase = await firestore().collection('groups').doc(groupID).get();
                const expenses = [
                    { category: 'Food', amount: 0 },
                    { category: 'Drinks', amount: 0 },
                    { category: 'Beverages', amount: 0 },
                    { category: 'Travel', amount: 0 },
                    { category: 'Taxi', amount: 0 },
                    { category: 'Hotel', amount: 0 },
                    { category: 'Shopping', amount: 0 },
                    { category: 'Utilities', amount: 0 },
                    { category: 'Medical', amount: 0 },
                    { category: 'EntryTicket', amount: 0 },
                    { category: 'Others', amount: 0 },
                ];
                const groupExpenses = fireBase.data().expenses;
                for (let j = 0; j < groupExpenses.length; j++) {
                    if (groupExpenses[j].expenseCategoryName === 'Food') {
                        expenses[0].amount += parseInt(groupExpenses[j].expenseAmount);
                    } else if (groupExpenses[j].expenseCategoryName === 'Drinks') {
                        expenses[1].amount += parseInt(groupExpenses[j].expenseAmount);
                    } else if (groupExpenses[j].expenseCategoryName === 'Beverages') {
                        expenses[2].amount += parseInt(groupExpenses[j].expenseAmount);
                    } else if (groupExpenses[j].expenseCategoryName === 'Travel') {
                        expenses[3].amount += parseInt(groupExpenses[j].expenseAmount);
                    } else if (groupExpenses[j].expenseCategoryName === 'Taxi') {
                        expenses[4].amount += parseInt(groupExpenses[j].expenseAmount);
                    } else if (groupExpenses[j].expenseCategoryName === 'Hotel') {
                        expenses[5].amount += parseInt(groupExpenses[j].expenseAmount);
                    } else if (groupExpenses[j].expenseCategoryName === 'Shopping') {
                        expenses[6].amount += parseInt(groupExpenses[j].expenseAmount);
                    } else if (groupExpenses[j].expenseCategoryName === 'Utilities') {
                        expenses[7].amount += parseInt(groupExpenses[j].expenseAmount);
                    } else if (groupExpenses[j].expenseCategoryName === 'Medical') {
                        expenses[8].amount += parseInt(groupExpenses[j].expenseAmount);
                    } else if (groupExpenses[j].expenseCategoryName === 'EntryTicket') {
                        expenses[9].amount += parseInt(groupExpenses[j].expenseAmount);
                    } else if (groupExpenses[j].expenseCategoryName === 'Others') {
                        expenses[10].amount += parseInt(groupExpenses[j].expenseAmount);
                    }
                }
                let chartData = [];
                for (let i = 0; i < expenses.length; i++) {
                    chartData.push(expenses[i].amount);
                }
                const data = {
                    message: 'Expense Chart Fetched Successfully',
                    chartData: chartData,
                }
                dispatch({
                    type: FETCH_GROUP_CHART__SUCCESS,
                    payload: data,
                })
            } catch (error) {
                dispatch({
                    type: FETCH_GROUP_CHART__FAIL,
                    payload: error.toString()
                })
            }
        }
    )
}





const fetchSpendsChart = (userID) => {
    return (
        async (dispatch) => {
            try {
                dispatch({
                    type: FETCH_SPENDS_CHART__REQUEST
                })
                const fireBase = await firestore().collection('users').doc(userID).get();
                const groupsJoined = fireBase.data().groupsJoined;
                const expenses = [];
                for (let i = 0; i < groupsJoined.length; i++) {
                    const group = await firestore().collection('groups').doc(groupsJoined[i]).get();
                    const groupExpenses = group.data().expenses;
                    let totalExpense = 0;
                    for (let j = 0; j < groupExpenses.length; j++) {
                        totalExpense += parseInt(groupExpenses[j].expenseAmount);
                    }
                    expenses.push({
                        name: group.data().groupName,
                        icon: group.data().groupImage,
                        amount: totalExpense,
                    });
                }
                const chartData = [[], []];
                for (let i = 0; i < expenses.length; i++) {
                    chartData[0].push({
                        name: expenses[i].name,
                        icon: expenses[i].icon,
                    });
                    chartData[1].push(expenses[i].amount);
                }

                const data = {
                    message: 'Expense Chart Fetched Successfully',
                    chartData: chartData,
                }
                dispatch({
                    type: FETCH_SPENDS_CHART__SUCCESS,
                    payload: data,
                })
            } catch (error) {
                dispatch({
                    type: FETCH_SPENDS_CHART__FAIL,
                    payload: error.toString()
                })
            }
        }
    )
}




const addSettlement = (groupID, settlementAmount, settlementPaidBy, settlementPaidTo, settlementMethod) => {
    return (
        async (dispatch) => {
            try {
                dispatch({
                    type: ADD_SETTLEMENT__REQUEST
                })
                if (!settlementAmount) {
                    dispatch({
                        type: ADD_SETTLEMENT__FAIL,
                        payload: 'Settlement Amount is Required',
                    })
                    return;
                }
                const fireBase = await firestore().collection('groups').doc(groupID).get();

                const newPayments = [];
                const payments = fireBase.data().payments;
                for (let i = 0; i < payments.length; i++) {
                    if (payments[i].userID === settlementPaidBy.userID) {
                        newPayments.push({ userID: payments[i].userID, borrow: payments[i].borrow - settlementAmount, lend: payments[i].lend });
                    } else if (payments[i].userID === settlementPaidTo.userID) {
                        newPayments.push({ userID: payments[i].userID, borrow: payments[i].borrow, lend: payments[i].lend - settlementAmount });
                    } else {
                        newPayments.push(payments[i]);
                    }
                }
                await firestore().collection('groups').doc(groupID).update({
                    payments: newPayments,
                });
                const groupMembers = fireBase.data().groupMembers;
                for (let i = 0; i < groupMembers.length; i++) {
                    if (groupMembers[i] === settlementPaidBy.userID) {
                        await firestore().collection('users').doc(groupMembers[i]).update({
                            you_borrow: firestore.FieldValue.increment(-settlementAmount),
                        });
                    } else if (groupMembers[i] === settlementPaidTo.userID) {
                        await firestore().collection('users').doc(groupMembers[i]).update({
                            you_lend: firestore.FieldValue.increment(-settlementAmount),
                        });
                    }
                }
                const settlement = {
                    settlementAmount: settlementAmount,
                    settlementPaidBy: { userID: settlementPaidBy.userID, name: settlementPaidBy.name, avatar: settlementPaidBy.avatar },
                    settlementPaidTo: { userID: settlementPaidTo.userID, name: settlementPaidTo.name, avatar: settlementPaidTo.avatar },
                    settlementMethod: settlementMethod,
                    settlementCreatedAt: new Date(),
                }
                await firestore().collection('groups').doc(groupID).update({
                    settlements: firestore.FieldValue.arrayUnion(settlement),
                });
                const data = {
                    message: 'Amount SettledUp Successfully',
                    settlement: settlement,
                }
                dispatch({
                    type: ADD_SETTLEMENT__SUCCESS,
                    payload: data,
                })
            } catch (error) {
                dispatch({
                    type: ADD_SETTLEMENT__FAIL,
                    payload: error.toString()
                })
            }
        }
    )
}





const fetchSettlements = (groupID) => {
    return (
        async (dispatch) => {
            try {
                dispatch({
                    type: FETCH_SETTLEMENTS__REQUEST
                })
                const fireBase = await firestore().collection('groups').doc(groupID).get();
                const settlements = fireBase.data().settlements;
                const data = {
                    message: 'Settlements Fetched Successfully',
                    settlements: settlements,
                }
                dispatch({
                    type: FETCH_SETTLEMENTS__SUCCESS,
                    payload: data,
                })
            } catch (error) {
                dispatch({
                    type: FETCH_SETTLEMENTS__FAIL,
                    payload: error.toString()
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

const addActivity = (activity) => {
    return (
        async (dispatch) => {
            dispatch({
                type: ADD_ACTIVITY,
                payload: activity,
            })
        }
    )
}





export {
    googleRegister, googleLogout,
    createGroup, fetchGroups, joinGroup, fetchMembers, leaveGroup, deleteGroup, updateGroup, fetchGroup, addExpense, fetchbalance, fetchCategoriesChart, fetchGroupsChart, fetchSpendsChart, addSettlement, fetchSettlements,
    fetchUserDetails, updateUserDetails, updatePamentDetails,

    clearErrors, clearMessages, bottomTabVisible, bottomTabHidden, enableBiometric, disableBiometric, addActivity,
};