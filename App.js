/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
    TextInput,
  View,
  Image,TouchableOpacity
,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import {
    StackNavigator,
} from 'react-navigation';
// import Main from './app/Main.js';
import  Login from './Login';
//ES5
// var App = React.createFactory({
//
// });

// ES6
// noinspection JSAnnotator
export default class App extends Component<{}> {

    render() {
        return (
<View/>
            {/*<Navigator*/}
                {/*initialRout={{name:'登录',component:Login}}*/}
                {/*configureScene={(route) => {*/}
                    {/*//跳转的动画*/}
                    {/*return Navigator.SceneConfigs.FloatFromRight ;*/}
                {/*}}*/}
                {/*renderScene={(route,navigator)=>{*/}
                    {/*let  Component = route.component;*/}
                    {/*return<Component {...route.passProps} navigator={navigator}/>;*/}
                {/*}}*/}
            {/*/>*/}
        );
    }

}
