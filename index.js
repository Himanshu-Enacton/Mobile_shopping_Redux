/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import store from './components/redux/store';
import { Provider } from 'react-redux';
import { getMessaging } from '@react-native-firebase/messaging';

getMessaging().setBackgroundMessageHandler(async remoteMessage =>{
    console.warn("message handled in the background!!", remoteMessage)
})

const AppRedux = ()=>(
    <Provider store={store}>
        <App/>
    </Provider>
)
AppRegistry.registerComponent(appName, () => AppRedux);
