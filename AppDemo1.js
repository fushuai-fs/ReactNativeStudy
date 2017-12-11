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
    Image,TextInput
} from 'react-native';

// 全局属性
var GlobalProps = require('./globalProps.json');



// const instructions = Platform.select({
//     ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//     android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

export default class AppDemo1 extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {
            isLoading:true,
        };
    }
    render() {
        return (
            <View style={styles.container}>
               <View>
                   <Text style={styles.welcome}>
                       帐号
                   </Text>
                   <TextInput  style={styles.testInput } />

                   <Text style={styles.instructions}>

                   </Text>
               </View>
            </View>
        );
    }


    componentDidMount() {
        return fetch(GlobalProps.LoginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'Method=Login&SupplierCode=25887708&UserName=fushuai&PassWord=fushuai'
        })
            // .then((response) => response.json())
            .then((response)=>{
              if(response.ok){
                  alert("123123123");
              }
            })
            .catch((error) => {
                alert(error+ GlobalProps.LoginUrl);
            });
    }

    dealWithData()
    {

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
