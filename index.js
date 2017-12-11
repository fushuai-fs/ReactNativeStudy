import { AppRegistry } from 'react-native';

import {
    StackNavigator,
} from 'react-navigation';


// import App from './App.js';
import Login from './Login.js';


const App = StackNavigator({
    Home : { screen: Login
        ,snavigationOptions:{headerTitle:''}
         ,tintColor:'red'
    },
})


AppRegistry.registerComponent('RNapp', () => App);
//
//  AppRegistry.registerComponent('RNapp', () => Login);

