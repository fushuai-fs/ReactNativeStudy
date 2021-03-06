import { AppRegistry } from 'react-native';

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,TouchableOpacity

} from 'react-native';
var JSON5 = require('json5');
import {
    StackNavigator,
} from 'react-navigation';


// import App from './App.js';
// import Login from './Login.js';
import Main from './app/Main.js';

// 全局属性
var GlobalProps = require('./globalProps.json');

var Dimensions=require('Dimensions');
var {width}= Dimensions.get('window');

var cols =3;
var boxW=100;
var vMargin = (width-cols*boxW)/(cols+1);
var hMargin=25;



// ES6
// noinspection JSAnnotator
export default class Login extends Component<{}> {
    static defaultProps = {
    };  // 注意这里有分号
    static propTypes = {
    };  // 注意这里有分号

    constructor (props) {
        super (props)
        this.state = {
            SupplierCode:'25887708',
            UserName: 'fushuai',
            Password: 'fushuai',
            loaded: false,
            loginText:'登 录',
            loginDesc:'',
        }
    }
    render() {
        const { navigate } = this.props.navigation;

        // return(  <Main/>)
        // if(this.state.loaded)
        // {
        //   return(  <Main/>)
        // }
        return (
            <View style={styles.container} >
                <Image source={require('./image/icon.png')} style={styles.iconStyle }/>
                <View style={styles.loginStyle}>
                    <Text  style={[styles.textsStyle] }>{'公司ID'}</Text>
                    <TextInput ref={'SupplierCode'} placeholde={'公司ID'} style={styles.textInputStyle }
                               onChangeText={(text) => { this.state.SupplierCode = text } }
                               value={'25887708'}
                    />
                </View>
                <View style={styles.loginStyle}>
                    <Text  style={[styles.textsStyle] }>{'账　号'}</Text>
                    <TextInput ref={'UserName'} placeholde={'账号/手机号'} style={styles.textInputStyle }
                               onChangeText={(text) => { this.state.UserName = text } }
                               value={'fushuai'}
                    />
                </View>
                <View style={styles.loginStyle}>
                    <Text  style={[styles.textStyle,styles.textsStyle] }>{'密　码'}</Text>
                    <TextInput ref={'Password'} placeholde={'密码'} secureTextEntry={true} password={true}style={styles.textInputStyle }
                               onChangeText={(text) => { this.state.Password = text } }
                               value={'fushuai'}
                    />
                </View>
                <TouchableOpacity activeOpacity={0.5}
                                  onPress={()=>this.renderPress(navigate)}
                >
                    <View style={ styles.loginViewStyle } >
                        <Text style ={[styles.textsStyle,{color:'white'}]} >{this.state.loginText }</Text>
                    </View>
                </TouchableOpacity>
                {/*<View>*/}
                {/*<Text style={{color:'red'}}>{this.state.loginDesc}</Text>*/}
                {/*</View>*/}
                {/*<View style={ styles.setingViewStyle }>*/}
                {/*<Text>手机验证码登录</Text>*/}
                {/*</View>*/}
            </View>
        );
    }

    renderPress=(navigate)=>{

        var _navigate= navigate;
        //    var _navigation =  this.props.navigation;//
        // this.props.navigation.navigate('Main')

        var supplierCode=this.state.SupplierCode; var userName=this.state.UserName;var password=this.state.Password;
        this.setState({
            loginText:'正在登录...'
        });
        var bodys= 'Method=Login&SupplierCode='+supplierCode+'&UserName='+userName+'&PassWord='+password;
        //    alert(bodys);
        // alert(GlobalProps.LoginUrl);
        // alert(supplierCode+'---'+userName+'==='+password);
        return fetch(GlobalProps.LoginUrl, {
            method: 'POST',
            headers: {

                // 'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:bodys
        })
            .then((response) => response.json())
            .then((responsejson)=>{
                this.setState({
                    loginText:'登 录'
                });

                // var json = response.json();
                var txt = "1";
                alert(responsejson.name+'qwert');
                if(responsejson.name==='123')
                {
                    this.setState({
                        loaded:true,
                    });
                    _navigate('Main');
                }

            })
            .catch((error) => {
                alert(error);
                this.setState({
                    loginText:'登 录'
                });
            });
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
        marginTop:50,width:100,height:100,
        borderRadius:50,
        borderWidth:2,borderColor:'white'
    },
    textsStyle:{
        height:38, justifyContent:'center', alignItems:'center',
        fontSize:18,
        lineHeight:38,
        marginLeft:10,marginRight:0,
        //  backgroundColor:'red'
    },
    loginStyle:{
        flexDirection:'row'
    },
    textInputStyle:{
        minWidth:width*0.6, height:38, backgroundColor:'white',
        marginBottom:1, paddingBottom:0,
        //textAlign:'center',
        marginLeft:5,marginRight:30,
    },
    loginViewStyle:{
        width :width*0.7,height:38,
        backgroundColor:'blue',
        marginTop:10,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5
    },
    setingViewStyle:{width :width*0.8,alignSelf :'flex-start',
        marginLeft:40,
        marginTop:10,
        borderBottomColor:'black' }
});


const App = StackNavigator({
        Home : { screen: Login },
        Main : { screen: Main }
    },{
        title:'', headerMode: 'none',
    }
)

AppRegistry.registerComponent('RNapp', () => App);