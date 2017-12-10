
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,TouchableOpacity
} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
// 导入json数据
var testData = require('./testData.json');

var Dimensions=require('Dimensions');
var {width}= Dimensions.get('window');

var cols =3;
var boxW=100;
var vMargin = (width-cols*boxW)/(cols+1);
var hMargin=25;

//ES5

// var App = React.createFactory({
//
// });


// ES6
// noinspection JSAnnotator
export default class Login extends Component<{}> {

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

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#dddddd',
        //    flexDirection:'row',
        // justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#F5FCFF',
        // flexWrap:'wrap'
    },
    iconStyle:{
        marginTop:50,width:80,height:80,
        borderRadius:40,
        borderWidth:2,borderColor:'white'
    },
    textInputStyle:{
        minWidth:width-70, height:38, backgroundColor:'white',
        marginBottom:1,
        textAlign:'center',marginLeft:30,marginRight:30,
    },
    loginViewStyle:{
        width :width-100,height:38,backgroundColor:'blue',
        marginTop:10,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5
    },
    setingViewStyle:{alignSelf :'flex-start',marginLeft:50,marginTop:10,
        borderBottomColor:'black' }
});
