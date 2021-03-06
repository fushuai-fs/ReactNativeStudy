//组件
import { AppRegistry } from 'react-native';
import { StackNavigator,TabNavigator} from 'react-navigation';

//页面
import Login from './Login.js';
// import Main from './app/Main.js';
import All from './app/All.js';
import UnConfirm from './app/UnConfirm.js';
import Mine from './app/Mine.js';
  import Detail from './app/Detail.js';

const MyAppTab = TabNavigator({
    All: { screen: All },
    UnConfirm: { screen: UnConfirm },
    Mine: { screen: Mine },
    // Detail: { screen: Detail },
},
    {
    initialRouteName:'UnConfirm',
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
        activeTintColor: '#e91e63',
        labelStyle: {
            fontSize: 14,
        },
        style: {
            backgroundColor: '#2fa4e7',
        },
    },
});

// 导航
  const App = StackNavigator({
      Login : { screen: Login },
        Detail:{ screen:Detail },
      MyApp:{ screen:MyAppTab }
      },{
      initialRouteName:'Login',
      title:'',
      headerMode: 'none',
      // backBehavior:'none',
      gesturesEnabled:false
      }
  )

AppRegistry.registerComponent('RNapp', () => App);
