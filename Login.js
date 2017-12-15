
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,TouchableOpacity

} from 'react-native';
// var JSON5 = require('json5');
import { StackNavigator,} from 'react-navigation';


 // import Main from './app/Main.js';

// const instructions = Platform.select({
//     ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//     android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

// 全局属性
var GlobalProps = require('./globalProps.json');

var Dimensions=require('Dimensions');
var {width}= Dimensions.get('window');

var cols =3;
var boxW=100;
var vMargin = (width-cols*boxW)/(cols+1);
var hMargin=25;
// import Main from './app/Main.js';
// import All from './app/All.js';
// import Detail from './app/Detail.js';
//
// // 导航
// const App = StackNavigator({
//         Main : { screen: Main },
//         All:{ screen:All },
//         Detail:{ screen:Detail },
//     },{
//         initialRouteName:'Main',
//         title:'', headerMode: 'none',
//     }
// )
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
            SupplierCode:'63967667',
            UserName: 'fushuai',
            Password: 'fushuai',
            loaded: false,
            loginText:'登 录',
            loginDesc:'',
            logined:false
        }
    }
    render() {

         const { navigate } = this.props.navigation;

        return (
            <View style={styles.container} >
                <Image source={require('./image/icon.png')} style={styles.iconStyle }/>
                <View style={styles.loginStyle}>
                    <Text  style={[styles.textsStyle] }>{'公司ID'}</Text>
                    <TextInput ref={'SupplierCode'}
                               style={styles.textInputStyle }
                               keyboardType={'numeric'}
                               placeholde={'公司ID'}
                               placeholderTextColor="red"
                               underlineColorAndroid={'transparent'}
                               onChangeText={(text) => { this.state.SupplierCode = text } }

                    />
                </View>
                <View style={styles.loginStyle}>
                    <Text  style={[styles.textsStyle] }>{'账　号'}</Text>
                    <TextInput ref={'UserName'} placeholde={'账号/手机号'} style={styles.textInputStyle }
                               onChangeText={(text) => { this.state.UserName = text } }

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
                <View>
                    <Text style={{color:'red'}}>{this.state.loginDesc}</Text>
                </View>
                <View style={ styles.setingViewStyle }>
                    <Text>手机验证码登录</Text>
                </View>
            </View>
        );
    }

    renderPress=(navigate)=>{
        // fetch 返回结果最好使用json
       var _navigate= navigate; // 作用域问题定义变量
     //   _navigate('MyApp',{SupplierCode:supplierCode,UserName:userName,});
        var supplierCode=this.state.SupplierCode; var userName=this.state.UserName;var password=this.state.Password;
        this.setState({
            loginText:'正在登录...'
        });
       // alert('Method=Login&SupplierCode='+supplierCode+'&UserName='+userName+'&PassWord='+password);
          //  var bodys= 'Method=Login&SupplierCode='+supplierCode+'&UserName='+userName+'&PassWord='+password;
       // alert(GlobalProps.LoginUrl);
        return fetch(GlobalProps.LoginUrl, {
            method: 'POST',
            headers: {
                 'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:'Method=Login&SupplierCode='+supplierCode+'&UserName='+userName+'&PassWord='+password
        })
          .then((response) => response.json())
            .then((responsejson)=>{
                this.setState({
                    loginText:'登 录'
                });
             // alert(JSON.stringify(responsejson));
              if(responsejson.msg==='')
              {
                    // this.setState({logined:true});
                  // _navigate.dispatch(resetAction);
                  _navigate('MyApp',{SupplierCode:supplierCode,UserName:userName,backBehavior:'none'});
              } else
              {
                  this.setState({
                      loginDesc:responsejson.msg,
                  });
              }
            })
            .catch((error) => {
                 //alert(error);
                this.setState({
                    loginText:'登 录',
                    loginDesc:'网络繁忙请稍后再试......',
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
