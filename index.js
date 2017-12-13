//组件
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

//页面
import Login from './Login.js';
import Main from './app/Main.js';
import Mine from './app/Mine.js';

// 导航
  const App = StackNavigator({
      Home : { screen: Login },
      Main : { screen: Main },
      Mine : { screen: Mine },
      },{
          title:'', headerMode: 'none',
      }
  )

AppRegistry.registerComponent('RNapp', () => App);
//
//  AppRegistry.registerComponent('RNapp', () => Login);
