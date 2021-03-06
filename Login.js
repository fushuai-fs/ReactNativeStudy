
import React, { Component } from 'react';
import {
    Alert,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    NativeModules
} from 'react-native';

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
            SupplierCode:'',
            UserName: '',
            Password: '',
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

                <View style={[styles.loginStyle,,{marginTop:5}]}>
                    <Text  style={[styles.textsStyle] }>{'账 号'}</Text>
                    <TextInput ref={'UserName'} placeholde={'账号/手机号'} style={styles.textInputStyle }
                               onChangeText={(text) => { this.state.UserName = text } }

                    />
                </View>
                <View style={styles.loginStyle}>
                    <Text style={[styles.textsStyle] }>{'密 码'}</Text>
                    <TextInput ref={'Password'} placeholde={'密码'} secureTextEntry={true} password={true}style={styles.textInputStyle }
                               onChangeText={(text) => { this.state.Password = text } }
                               // value={'fushuai'}
                    />
                </View>

                <View style={styles.loginStyle}>
                <TouchableOpacity activeOpacity={0.5}
                                  onPress={()=>this.renderPress(navigate)} >
                    <View style={ styles.loginViewStyle } >
                        <Text style ={{color:'white'}} >{this.state.loginText }</Text>
                    </View>
                </TouchableOpacity>
                </View>
                <View>
                    <Text style={{color:'#c00'}}>{this.state.loginDesc}</Text>
                </View>
            </View>
        );
    }
    LoginMethod(){
        Alert.alert('','此版本暂不支持,请关注后续版本');
    }

    renderPress=(navigate)=>{
        _navigate('MyApp',{SupplierCode:supplierCode,UserName:userName,backBehavior:'none'});

        // Alert.alert('tltle','msg');
        // fetch 返回结果最好使用json
       var _navigate= navigate; // 作用域问题定义变量

     //   _navigate('MyApp',{SupplierCode:supplierCode,UserName:userName,});
        var supplierCode=this.state.SupplierCode; var userName=this.state.UserName;var password=this.state.Password;
        this.setState({
            loginText:'正在登录...'
        });

    }

    componentDidMount(){
        NativeModules.LoginModule.checkLogin((isLogin,msg)=>{
            // alert(isLogin+'---'+msg);
        },
            (isLogin,Supplier,UserName,Password)=>{
                // alert(isLogin+'---'+Supplier+'---'+UserName);
                if(isLogin){
                    this.setState({
                        SupplierCode:Supplier,
                        UserName:UserName,
                        Password:Password
                    });
                    const { navigate } = this.props.navigation;
                    this.renderPress(navigate);
                }
            });
      // var  resetAction = NavigationActions.reset({
      //       index: 0,
      //
      //   });
        // this.props.navigation.dispatch(resetAction);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#dddddd',
        //    flexDirection:'row',
        //   justifyContent: 'center',
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
         justifyContent:'center', alignItems:'center',
        alignSelf:'center',
        fontSize:18,
        // lineHeight:38,
        marginLeft:20,
        // backgroundColor:'white'
    },
    loginStyle:{
        flexDirection:'row',
        alignItems:'center',
    },
    textInputStyle:{
        flex:1,
        height:38, backgroundColor:'white',
        marginBottom:1,
        paddingBottom:0,
        //textAlign:'center',
        marginLeft:5,marginRight:20,
    },
    loginViewStyle:{
        width:width-40,
        marginLeft:10,marginRight:10,
        height:38,
        backgroundColor:'#2fa4e7',
        marginTop:10,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        borderRadius:5
    },
    setingViewStyle:{width :width*0.8,alignSelf :'flex-start',
        marginLeft:40,
        marginTop:10,
        borderBottomColor:'black' }
});
