const demo = async()=>{
    const url = 'https://fcm.googleapis.com/fcm/send';

    const data = `{ 
        "notification": {
          "title": "Portugal vs. Denmark",
          "body": "Great match!",
        },
        "to":"fxTI2NjDQou9QNTWf28J2k:APA91bF88Ong6V_Vc-Yyj9xYZeTq31a3UA7bqbIK_nN5mS2fpqil4wO4WRRGKBbqB_QUs8cggsN3wHWe1xSGJoZ0flobVOvFkZSZGSqn_wuRWoP9P3Y21Y__jv18QInbWH5C9xztDv-_"
    }`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'authorization': 'key=AAAAvjgEGCY:APA91bHyPolgpCQwV3Z0K32F3RRnuvpye0shUTeP4zW0mQq-W9AvoyjS9cUB2EIoPG21cZApasenBnLWVZpEDVhs5mzRgJvgLgRgDUnH0cBcFIhVLorD-tDq1Q-Ivu5ZhsG-0cLB0szU',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
        },
        body: data,
    }); 

    const text = await response.text();

    console.log(text);
  }

  

  import messaging from "@react-native-firebase/messaging";
  useEffect(() => {
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!");
    });
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log("Notification caused app to open from background state:");
    });
    messaging().onMessage(async (remoteMessage) => {
      console.log("A new FCM message arrived!");
    });
  });

  // android:roundIcon="@mipmap/ic_launcher_round"