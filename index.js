//组件
import { AppRegistry } from 'react-native';

//页面
import Login from './Login.js';
import Main from './app/Main.js';
import All from './app/All.js';
  import Detail from './app/Detail.js';

// 导航
  const App = StackNavigator({
      Login : { screen: Login },
      Main : { screen: Main },
      All:{ screen:All },
        Detail:{ screen:Detail },
      },{
      initialRouteName:'Login',
          title:'', headerMode: 'none',
      }
  )

AppRegistry.registerComponent('RNapp', () => App);
