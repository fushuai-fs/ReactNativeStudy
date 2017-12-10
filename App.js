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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

import Main from './app/Main.js';

//ES5
// var App = React.createFactory({
//
// });

// ES6
// noinspection JSAnnotator
export default class App extends Component<{}> {

    render() {
        return (
            <Main/>
        );
    }

}
