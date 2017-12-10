/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    Image
} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class AppDemo1 extends Component<{}> {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    帐号
                </Text>
                <TextInput  style={styles.testInput } />
                {/*<Text style={styles.instructions}>*/}
                {/*To get started, edit App.js*/}
                {/*</Text>*/}
                <Text style={styles.instructions}>
                    {/*{instructions}*/}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    testInput:{
        minWidth:250,
    }
});
