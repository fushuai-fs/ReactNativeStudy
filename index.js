import { AppRegistry } from 'react-native';

import {
    StackNavigator,
} from 'react-navigation';


// import App from './App.js';
import Login from './Login.js';
import Main from './app/Main.js';


const App = StackNavigator({
        Home : { screen: Login },
        Main : { screen: Main }
},{
    title:'', headerMode: 'none',
    }
)


AppRegistry.registerComponent('RNapp', () => App);
//
//  AppRegistry.registerComponent('RNapp', () => Login);

