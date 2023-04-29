import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useRefBottomAlert, BottomAlert, showBottomAlert } from 'react-native-modal-bottom-alert';
import messaging from '@react-native-firebase/messaging';
import LocalAuthentication from 'rn-local-authentication';
import AwesomeAlert from 'react-native-awesome-alerts';

import { clearMessages, clearErrors } from "../actions/userActions";

import Main from './mainTabs';
import Auth from './authTabs';

messaging().setBackgroundMessageHandler(async remoteMessage => {
	console.log('Killed state notification.', remoteMessage)
});

export default function Root() {
	const [access, setAccess] = useState({ isAccessed: false, error: null });
	const dispatch = useDispatch();
	const { isFingerPrintNeeded, isAuthenticated, loading, message, error } = useSelector((state) => state.user);

	const authenticateBioMetric = async () => {
		const response = await LocalAuthentication.authenticateAsync({
			title: "Unlock SplitEase",
			reason: "Confirm your FingerPrint or PIN to continue",
			fallbackEnabled: true,
			fallbackToPinCodeAction: true,
		});
		if (response.success) setAccess({ isAccessed: true, error: null });
		else {
			setAccess({ isAccessed: false, error: response.error });
		}
	}
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

	if (isFingerPrintNeeded) {
		if (!access.isAccessed) authenticateBioMetric();
		return access.isAccessed ?
			(<>
				{isAuthenticated ? <Main /> : <Auth />}
				{loading ? <AwesomeAlert show={true} showProgress={true} title='Loading' progressColor='#434343' useNativeDriver={true} closeOnTouchOutside={false} closeOnHardwareBackPress={false} /> : null}
				<BottomAlert ref={(ref) => useRefBottomAlert(ref)} />
			</>) : null;
	} else {
		return (
			<>
				{isAuthenticated ? <Main /> : <Auth />}
				{loading ? <AwesomeAlert show={true} showProgress={true} title='Loading' progressColor='#434343' useNativeDriver={true} closeOnTouchOutside={false} closeOnHardwareBackPress={false} /> : null}
				<BottomAlert ref={(ref) => useRefBottomAlert(ref)} statusBarTranslucent loopAnimation />
			</>
		)
	}
}