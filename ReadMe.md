# React Native Firebase App

This ReadMe provides instructions for cloning and setting up a React Native app with Firebase integration, specifically for Google Sign-In functionality. It covers cloning the repository, configuring Firebase, and making the necessary changes to enable Google Sign-In in your app.

## Prerequisites

Before proceeding, make sure you have the following prerequisites installed:

- Node.js (v12.0 or above)
- React Native CLI
- Android SDK and Android Studio
- Firebase account

## Installation

1. Clone the repository:
    ```
    git clone https://github.com/keshav2003garg/SplitEase.git
    ```

2. Navigate to the project's root directory:
    ```
    cd SplitEase
    ```

3. Create a new Firebase project:
    - Go to the Firebase Console (https://console.firebase.google.com/).
    - Click on "Add Project" and provide a name for your project.
    - Select your desired options and follow the on-screen instructions to create the project.

4. Configure Firebase in your app:
    - In the Firebase Console, go to your newly created project.
    - Click on the "Android" icon to add an Android app to your project.
    - Enter the package name as `com.splitease`.
    - Follow the on-screen instructions and download the `google-services.json` file.

5. Copy the `google-services.json` file:
    - Place the downloaded `google-services.json` file in the `android/app` directory of your React Native project.

6. Generate SHA-1 and SHA-256 fingerprints:
    - Open a terminal and navigate to the `android` directory of your React Native project:
      ```
      cd android
      ```
    - Run the following command to generate the fingerprints:
      ```
      ./gradlew signingReport
      ```
    - Look for the "Variant: debug" section in the console output.
    - Copy both the SHA-1 and SHA-256 fingerprints. They should look something like this:
      ```
      Variant: debug
      ...
      SHA1: 12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78
      SHA-256: 12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34
      ```
    - When Releasing the App:

        Look for the "Variant: release" section in the console output.
        - Copy both the SHA-1 and SHA-256 fingerprints. They should look something like this:
      ```
      Variant: release
      ...
      SHA1: 12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78
      SHA-256: 12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34
      ```

7. Configure fingerprints in Firebase project:
    - Go back to the Firebase Console and navigate to your project.
    - Click on the gear icon in the top left corner to access project settings.
    - Under the "General" tab, scroll down to the "Your apps" section and click on the Android app you added earlier.
    - Scroll down to the "Your apps" section and locate the "SHA certificate fingerprints" field.
    - Add the fingerprints you copied in the previous step.
    - Save the changes.

8. Make changes for Google Sign-In:
    - Open your React Native codebase.
    - Locate the file `src/actions/userActions.js`.
    - Example code snippet in `userAction.js`, add the following lines to configure Google Sign-In:

      ```javascript
      const googleRegister = () => {
        return (
            async (dispatch) => {
                try {
                    GoogleSignin.configure({ webClientId: 'YOUR_WEB_CLIENT_ID' });
                    const res = await GoogleSignin.signIn();
                    dispatch({
                        type: GOOGLE_REGISTER__REQUEST
                    })
                    const googleCredential = auth.GoogleAuthProvider.credential(res.idToken);
                    const details = await auth().signInWithCredential(googleCredential);
                    const deviceToken = await messaging().getToken();
      ```
    - Replace `'YOUR_WEB_CLIENT_ID'` with your own Web Client ID. Open the `google-services.json` file located in the `android/app` directory of your React Native project. Look for the client with `"client_type": 3` under the `"client_info"` section. For example:
   
     ```json
        {
        "project_info": {
            "project_number": "816983578662",
            "project_id": "splitease-reactnative",
            "storage_bucket": "splitease-reactnative.appspot.com"
        },
        "client": [
            {
            "client_info": {
                "mobilesdk_app_id": "1:8545478457454:android:12526423c4b545925707aaee7",
                "android_client_info": {
                "package_name": "com.splitease"
                }
            },
            "oauth_client": [
                {
                "client_id": "816987882-18eg5p8a1sf5dd9vq33c0d2dddovt84v8h.apps.googleusercontent.com",
                "client_type": 1,
                "android_info": {
                    "package_name": "com.splitease",
                    "certificate_hash": "5e8f16062ea3cd2c4a0d547876baa6f38cabf625"
                }
                },
                {
                "client_id": "0123456789012-abcdef1234567890abcdef1234567890.apps.googleusercontent.com",
                "client_type": 3
                }
            ],
     ```
     
     In this example, the Web Client ID would be `0123456789012-abcdef1234567890abcdef1234567890.apps.googleusercontent.com`.
9. Setting up Firebase Cloud Messaging (FCM):

    To obtain the server key from Firebase for Firebase Cloud Messaging (FCM) setup, follow these steps:

    - Go to the Firebase Console by visiting https://console.firebase.google.com/ and sign in with your Firebase account.
    - Navigate to the project for which you want to obtain the server key.
    - Once you are in the project dashboard, click on the gear icon located in the top left corner of the page. This will open the project settings.
    - In the project settings, select the "Cloud Messaging" tab. This tab contains the configuration settings for FCM.
    - Under the "Project credentials" section, you will find the "Server key" field. This field contains the server key that you need for FCM.
    - Copy the value of the server key by clicking on the copy icon or by selecting the key and copying it manually.

        The server key is a unique identifier for your Firebase project and is used to authorize your server to send messages to FCM. Make sure to keep this key secure and do not share it publicly.

        Once you have obtained the server key, you can use it in your React Native codebase by locating the file `src/actions/userAction.js`. In that file, you will find a placeholder value for the server key. Replace the placeholder value with the actual server key you obtained from the Firebase Console.

        Example code snippet in `userAction.js` at line `364`:
        ```javascript
            const response = await fetch('https://fcm.googleapis.com/fcm/send', {
                method: 'POST',
                headers: {
                    'authorization': 'key='YOUR_SERVER_KEY'',
                    'content-type': 'application/json',
                },
                body: `{
                    "registration_ids": ${JSON.stringify(deviceTokens)},
                    "notification": ${JSON.stringify(message)}
                }`,
            });
        ```
        Example code snippet in `userAction.js` at line `838`:
        ```javascript
            const response = await fetch('https://fcm.googleapis.com/fcm/send', {
                method: 'POST',
                headers: {
                    'authorization': 'key='YOUR_SERVER_KEY'',
                    'content-type': 'application/json',
                },
                body: `{
                    "registration_ids": ${JSON.stringify(deviceTokens)},
                    "notification": ${JSON.stringify(message)},
                    "data": ${JSON.stringify(expense)},
                    "android": {
                        "image": "${url}",
                        "priority": "high"
                    },
                }`,
            });
        ```

        Replace `'YOUR_SERVER_KEY'` with the actual server key value. This will ensure that your React Native app is properly configured to use FCM and send push notifications.

## Usage

To run your React Native app with Firebase integration and Google Sign-In functionality, follow these steps:

### Android

1. Open a terminal and navigate to the project's root directory.
2. Connect your Android device to your computer or start an Android emulator.
3. Run the following command to build and install the app on the connected Android device:
   ```
   npx react-native run-android
   ```
4. Wait for the build process to complete and the app to be installed on the device.
5. Once the installation is successful, you can launch the app on your device and test the Firebase and Google Sign-In functionality.

Make sure that your Android device is properly configured for development, including USB debugging enabled and the necessary device drivers installed. If you are using an emulator, ensure that it is set up and running correctly.

### iOS

**Note: This repository is not optimized or specifically designed for iOS. Running the app on iOS devices may result in errors or issues. Please refer to the official React Native and Firebase documentation for instructions on setting up Firebase and Google Sign-In on iOS.**

If you still want to attempt running the app on iOS, follow these general steps:

1. Open a terminal and navigate to the project's root directory.
2. Install the project dependencies by running the following command:
   ```
   npm install
   ```
3. Navigate to the iOS directory:
   ```
   cd ios
   ```
4. Install CocoaPods dependencies:
   ```
   pod install
   ```
5. Open the Xcode project:
   ```
   open SplitEase.xcworkspace
   ```
6. Select the target device or simulator from the device selector dropdown in Xcode.
7. Build and run the app by clicking on the "Run" button (play icon) or by pressing `Cmd + R`.
8. Wait for Xcode to build the app and launch it on the selected device or simulator.
9. Once the app is launched, you can test the Firebase integration and Google Sign-In functionality.

Ensure that you have Xcode installed on your machine and a valid Apple Developer account to run the app on iOS devices. Please note that this repository may not provide full support for iOS, and you may encounter errors or issues during the setup process.

### Testing and Documentation

It is important to thoroughly test your app to ensure that Firebase integration and Google Sign-In are working as expected. You can perform various tests, including signing in with a Google account, verifying user authentication, and testing Firebase services such as database operations and push notifications.

For detailed instructions on utilizing Firebase services and Google Sign-In in your React Native app, refer to the official Firebase documentation (https://firebase.google.com/docs) and Google Sign-In documentation (https://developers.google.com/identity/sign-in).

These documentation resources provide comprehensive information, code samples, and guidelines for utilizing the features and functionalities of Firebase and Google Sign-In in your React Native app. Make sure to explore these resources to leverage the full potential of these services.

Certainly! Here's an updated version including the additional key features and a markup file:

## Key Features

Certainly! Here's an elaboration of the key features:

- **Google Sign-In**: The app allows users to sign in using their Google accounts. With a convenient pop-up sign-in feature, users can quickly and securely authenticate themselves without the need for manual input of credentials.

- **Group Creation and Membership**: Users can create groups within the app and invite others to join using unique join codes. This feature facilitates collaborative expense tracking, enabling group members to contribute expenses and manage shared finances effectively.

- **Expense Tracking**: Users can add expenses to the app with predefined categories, making it easy to categorize and track trip expenses. This feature provides a structured approach to expense management, helping users stay organized and informed about their spending.

- **Settle Payments**: The app simplifies payment settlements among group members. Users can record payments made or received and keep track of owed and borrowed amounts. This feature provides transparency and clarity, ensuring that users can easily settle outstanding balances within the app.

- **Overall Balance**: The app provides an overview of the overall lending and borrowing situations for each user. Users can quickly see how much they owe or are owed, helping them understand their financial standings within the group.

- **Filtering and Sorting**: To enhance usability, the app allows users to filter and sort groups based on various criteria, such as owe, owed, and settled statuses. This feature enables users to focus on specific aspects of their expenses and simplifies navigation within the app.

- **Animated Screen Transitions**: The app enhances the user experience by incorporating smooth and visually appealing screen transitions. This feature adds a touch of polish to the app, providing a more engaging and enjoyable user interface.

- **Bottomsheet Modal**: The app utilizes bottomsheet modals to display additional information or actions in a non-intrusive manner. This feature allows users to access contextual information or perform specific actions without interrupting their current workflow.

- **Pie Charts**: To provide visual representation of trip expenses, the app incorporates pie charts. Users can view their expenses categorized by different expense types, enabling them to track and manage their expenses effectively at a glance.

- **Biometric Authentication**: To enhance security, the app supports biometric authentication such as fingerprint or face recognition. Users have the option to enable or disable this feature, providing an additional layer of protection to access the app and ensuring their sensitive information remains secure.

These elaborations demonstrate how each key feature enhances the functionality and user experience of the React Native Firebase app, allowing users to efficiently manage their expenses, track payments, and maintain financial transparency within their groups.

## Showcase Video

To get a better understanding of the app's features and functionality, we have prepared an app showcase video. You can watch the video by clicking on the following link: [App Showcase Video](https://drive.google.com/file/d/1FSCRDted3FiPie9mBLoIXPA1rgLzKnZH/view?usp=share_link). The video provides a visual demonstration of the app's user interface and highlights its key features.

We highly recommend watching the showcase video to get a glimpse of the app in action and see how it can benefit users. It will give you a better understanding of the app's capabilities and help you evaluate its suitability for your needs.

## APK Download

Additionally, if you'd like to try out the app yourself, you can download the APK file by clicking on the following link: [APK Download](https://drive.google.com/file/d/1WEx8Rprk6TeD5ltYnlHQfyB0NSCOGuCF/view?usp=sharing). The APK file allows you to install the app on your Android device and experience it firsthand.

Feel free to watch the showcase video and download the APK file to explore the app's features and functionalities. If you have any questions or feedback, please don't hesitate to reach out.

## Scope of Improvement

To further enhance the React Native Firebase app, here are some additional areas that can be improved:

1. **Offline Mode**: Implement offline mode functionality to allow users to access and interact with the app even without an internet connection. Offline support can include caching data, queuing actions, and synchronizing data when the connection is restored.

2. **Split Partially**: Expand the expense tracking capabilities by adding the option to split expenses partially, allowing users to allocate different amounts to different participants. This feature provides more flexibility and accuracy in expense distribution.

3. **Improved Notification System**: Enhance the notification system by implementing features such as in-app notifications, push notifications for important updates, and the ability to customize notification preferences. This will improve user engagement and keep them informed about relevant activities.

4. **Dark Mode**: Introduce a dark mode option within the app's settings, allowing users to switch between light and dark themes. Dark mode not only provides a visually appealing alternative but also reduces eye strain and conserves battery life on devices with OLED screens.

5. **UI/UX Design**: Continuously refine the app's UI/UX design to create a visually pleasing and intuitive user interface. Pay attention to aspects such as color schemes, typography, iconography, spacing, and navigation, ensuring a consistent and delightful user experience.

6. **Performance Optimization**: Further optimize the app's performance by identifying and resolving any performance bottlenecks. This can involve optimizing data fetching, minimizing network requests, implementing lazy loading, and utilizing performance monitoring tools to identify and address any areas of concern.

7. **Cool Animations**: Implement creative and visually appealing animations to engage users and provide a delightful experience. For example, when there is no data to display, you can showcase a captivating animation that informs and entertains the user.

8. **Enhanced Animation Throughout the App**: Extend the use of animations beyond specific instances and integrate them consistently throughout the entire app. Utilize animated transitions, subtle micro-interactions, and smooth visual effects to create a polished and immersive user interface.

9. **Non-Group Expenses**: Introduce the ability to track individual expenses outside of group contexts. This feature allows users to log personal expenses, making the app more versatile for various use cases, such as personal finance management or tracking expenses unrelated to group activities.

10. **Settle Payments via Paytm or UPI**: Expand the payment settlement options by integrating popular digital payment platforms such as Paytm or UPI (Unified Payments Interface). This allows users to settle their debts directly within the app using their preferred payment methods, offering convenience and flexibility.

11. **Intuitive Onboarding and User Guidance**: Enhance the onboarding process by providing clear instructions and interactive tutorials to help new users get familiar with the app's features and functionality. Implement tooltips, walkthroughs, or contextual help features to guide users and ensure a seamless onboarding experience. 

These improvements will contribute to a more comprehensive and polished React Native Firebase app, providing users with enhanced functionality, usability, and a delightful experience.

Remember to prioritize these improvements based on user feedback, market research, and the project's goals. Regularly iterate on the app to incorporate new features, fix bugs, and deliver an exceptional user experience.

## Conclusion

In conclusion, I highly recommend trying out this project by cloning it and making your own changes. It provides a solid foundation for building a React Native app with Firebase integration and Google Sign-In functionality.

By exploring and modifying the codebase, you can learn valuable insights into working with React Native, Firebase, and implementing Google Sign-In. It's an excellent opportunity to enhance your skills and gain hands-on experience in app development.

- **Contributing**: Contributions to the project are welcome! If you would like to contribute to the development of the React Native Firebase app, you can do so by following these steps:
   1. Fork the repository and create a new branch for your contributions.
   2. Make your desired changes or additions to the codebase.
   3. Ensure that your changes adhere to the project's coding conventions and guidelines.
   4. Test your changes thoroughly to ensure they function as intended.
   5. Submit a pull request describing the changes you've made and explaining their purpose.
   
   I will review your pull request and provide feedback or merge it into the main codebase if it meets the project's requirements. By contributing to the project, you help improve its functionality, stability, and overall quality.

- **License**: This project is licensed under the MIT License. The MIT License is a permissive open-source license that allows you to use, modify, and distribute the project's code for both commercial and non-commercial purposes. It also provides a disclaimer of warranties and limitations of liability. You can find the full text of the MIT License in the [LICENSE](LICENSE) file.

By using or contributing to the React Native Firebase app, you agree to abide by the terms and conditions specified in the MIT License. Make sure to review the license file for more details about your rights and obligations when using this project.

If you encounter any issues or have questions along the way, don't hesitate to reach out to me at keshav2003garg@gmail.com. I'm here to assist you and provide guidance to ensure a smooth development experience.

I look forward to seeing what you create with this project. Happy coding!