import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import AwesomeAlert from 'react-native-awesome-alerts';
import { useRefBottomAlert, BottomAlert, showBottomAlert } from 'react-native-modal-bottom-alert';
import messaging from '@react-native-firebase/messaging';

import { clearMessages, clearErrors } from "../actions/userActions";

import Main from './mainTabs';
import Auth from './authTabs';

messaging().setBackgroundMessageHandler(async remoteMessage => {
	console.log('Killed state notification.', remoteMessage)
});

export default function Root() {
	const dispatch = useDispatch();
	const { isAuthenticated, loading, message, error } = useSelector((state) => state.user);
	useEffect(() => {
		if (message) {
			showBottomAlert('success', message,)
			dispatch(clearMessages());
		}
		if (error) {
			showBottomAlert('error', error)
			dispatch(clearErrors());
		}
	});
	return (
		<>
			{isAuthenticated ? <Main /> : <Auth />}
			{loading ? <AwesomeAlert show={true} showProgress={true} title='Loading' progressColor='#434343' useNativeDriver={true} closeOnTouchOutside={false} closeOnHardwareBackPress={false} /> : null}
			<BottomAlert ref={(ref) => useRefBottomAlert(ref)} />
		</>
	)
}