//组件
import { AppRegistry } from 'react-native';
import { StackNavigator,TabNavigator} from 'react-navigation';

//页面
import Login from './Login.js';
import Main from './app/Main.js';
import All from './app/All.js';
import UnConfirm from './app/UnConfirm.js';
import Mine from './app/Mine.js';
  import Detail from './app/Detail.js';

const MyAppTab = TabNavigator({
    All: { screen: All },
    UnConfirm: { screen: UnConfirm },
    Mine: { screen: Mine },
    // Detail: { screen: Detail },
}, {
    initialRouteName:'Mine',
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
        activeTintColor: '#e91e63',
    },
});

// 导航
  const App = StackNavigator({
      Login : { screen: Login },
     // Main : { screen: Main },
      // All:{ screen:All },
        Detail:{ screen:Detail },
      MyApp:{ screen:MyAppTab }
      },{
      initialRouteName:'Login',
      title:'',
      headerMode: 'none',
      }
  )

AppRegistry.registerComponent('RNapp', () => App);
