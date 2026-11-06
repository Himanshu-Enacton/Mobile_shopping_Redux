import ProductWrapper from './components/ProductWrapper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import CartList from './components/CartList';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import UserList from './components/UserList';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import FinalPage from './components/FinalPage';
import UserDetails from './components/UserDetails';
import type { RootStackParamList } from './components/navigationTypes';
import { useEffect } from 'react';
// import { LogLevel, OneSignal } from 'react-native-onesignal';
import {
  getMessaging,
  getToken,
  onMessage,
} from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {

//notifee setup: 
const onDisplayNotification = async (remoteMessage:any)=> {
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: remoteMessage.notification?.title ?? remoteMessage.data?.title,
      body: remoteMessage.notification?.body ?? remoteMessage.data?.body,
      android: {
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }
//Firebase: FCM
useEffect(() => {
  const remoteMessage = getMessaging();

  const fetchFCMToken = async () => {
    try {
      const settings = await notifee.requestPermission();
      if (settings.authorizationStatus === 0) {
        console.warn('Notification permission denied. Enable notifications in Android app settings.');
      }
      const token = await getToken(remoteMessage);
      console.log('Firebase FCM Token:', token);
    } catch (error) {
      console.log('FCM Token Error:', error);
    }
  };

  fetchFCMToken();

  const unsubscribe = onMessage(remoteMessage, async message =>{
    console.log('Message received in the foreground:', message);
    try {
      await onDisplayNotification(message);
    } catch (error) {
      console.error('Notification display failed:', error);
    }
})

  return unsubscribe;
}, []);
//oneSignal
//   useEffect(() => {
//   OneSignal.Debug.setLogLevel(LogLevel.Verbose);

//   OneSignal.initialize('f512c253-b742-4078-abe3-6acab1d2794c');

//   OneSignal.Notifications.requestPermission(false);

//   const onSubscriptionChange = (event: any) => {
//     console.log('Subscription changed:', event);

//     console.log('Subscription ID:', event.current.id);
//     console.log('Push Token:', event.current.token);
//     console.log('Opted In:', event.current.optedIn);
//   };

//   OneSignal.User.pushSubscription.addEventListener(
//     'change',
//     onSubscriptionChange,
//   );

//   return () => {
//     OneSignal.User.pushSubscription.removeEventListener(
//       'change',
//       onSubscriptionChange,
//     );
//   };
// }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaProvider>
          <SafeAreaView edges={['top']} style={{ flex: 1 }}>
            <NavigationContainer>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={ProductWrapper} />
                <Stack.Screen name="List" component={CartList} />
                <Stack.Screen name="User" component={UserList} />
                <Stack.Screen name="Final" component={FinalPage} />
                <Stack.Screen name="UserDetails" component={UserDetails} />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </SafeAreaProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

export default App;

// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable';
// import { ScrollView, Text, View } from 'react-native';
// import Header from './components/Header';
// import Products from './components/Products';

// const Tab = createNativeBottomTabNavigator();

// function HomeScreen() {
//   return (
//     <ScrollView>
//       <Header />
//       <Products />
//     </ScrollView>
//   );
// }

// function SettingsScreen() {
//   return (
//     <View>
//       <Text>Settings</Text>
//     </View>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused }) => ({
//             type: 'sfSymbol' as const,
//             name:
//               route.name === 'Home'
//                 ? focused
//                   ? ('house.fill' as const)
//                   : ('house' as const)
//                 : focused
//                 ? ('gearshape.fill' as const)
//                 : ('gearshape' as const),
//           }),
//         })}
//       >
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Settings" component={SettingsScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }
