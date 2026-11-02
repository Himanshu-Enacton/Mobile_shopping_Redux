import ProductWrapper from './components/ProductWrapper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import CartList from './components/CartList';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import UserList from './components/UserList';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const Stack = createNativeStackNavigator();
function App() {
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
