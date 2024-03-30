/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import NetInfo from '@react-native-community/netinfo';
import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import Main from './src/Main';
import NoConnection from './src/components/noconnection/NoConnection';
// import {store} from './src/store/store';
import OneSignal from 'react-native-onesignal';
import store from './src/app/store';
import Utils from './src/utils';

navigator.__defineGetter__('userAgent', function () {
  // you have to import rect native first !!
  return 'react-native';
});
const App = () => {
  const [connectionStatus, setConnetionStatus] = useState(true);

  useEffect(() => {
    Utils.onCreateRSA();
    const unsubscribe = NetInfo.addEventListener(state => {
      if (
        state.isInternetReachable == true ||
        state.isInternetReachable == null
      ) {
        setConnetionStatus(true);
      } else {
        setConnetionStatus(false);
      }
    });

    OneSignal.setAppId('6c785abe-e313-4306-9205-6d1ca254b6c4');

    // promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
    // We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
    OneSignal.promptForPushNotificationsWithUserResponse();

    //Method for handling notifications received while app in foreground
    OneSignal.setNotificationWillShowInForegroundHandler(
      notificationReceivedEvent => {
        // console.log(
        //   'OneSignal: notification will show in foreground:',
        //   notificationReceivedEvent,
        // );
        let notification = notificationReceivedEvent.getNotification();
        console.log('notification: ', notification);
        const data = notification.additionalData;
        // console.log('additionalData: ', data);
        // Complete with null means don't show a notification.
        notificationReceivedEvent.complete(notification);
      },
    );

    //Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler(notification => {
      // console.log('OneSignal: notification opened:', notification);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (connectionStatus) {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <Main />
          <Toast />
        </SafeAreaProvider>
      </Provider>
    );
  } else {
    return <NoConnection />;
  }
};

export default App;
