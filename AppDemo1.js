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
    Image,
    TouchableOpacity
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
            <View style={styles.container} >
                <Image source={require('./image/icon.png')} style={styles.iconStyle }/>
                <TextInput placeholde={'帐号/手机号'} style={styles.textInputStyle }/>
                <TextInput placeholde={'密码'} secureTextEntry={true} password={true}style={styles.textInputStyle } />
                <TouchableOpacity activeOpacity={0.5}
                                  onPress={()=>this.renderPress('')}
                >
                    <View style={ styles.loginViewStyle } >
                        <Text style ={{color:'white'}} >登录</Text>
                    </View>
                </TouchableOpacity>
                <View>
                    {/*<Text>{this.state.title}</Text>*/}
                </View>
                <View style={ styles.setingViewStyle }>
                    <Text>手机验证码登录</Text>
                </View>
            </View>
        );
    }

    renderPress(event){
        alert('点击了啊','');
    }
    // 初始化
    // componentDidMount() {
    //     return fetch(GlobalProps.LoginUrl, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded',
    //         },
    //         body: 'Method=Login&SupplierCode=25887708&UserName=fushuai&PassWord=fushuai'
    //     })
    //         // .then((response) => response.json())
    //         .then((response)=>{
    //           if(response.ok){
    //               alert("123123123");
    //           }
    //         })
    //         .catch((error) => {
    //             alert(error+ GlobalProps.LoginUrl);
    //         });
    // }

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
