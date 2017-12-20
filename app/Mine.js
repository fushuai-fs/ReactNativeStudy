
import React, { Component } from 'react';
import {
    Alert,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity
    ,NativeModules
,ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
var JSON5 = require('json5');
var GlobalProps = require('../globalProps.json');
// 导入json数据
// var testData = require('./testData.json');

var Dimensions=require('Dimensions');
var {width}= Dimensions.get('window');
//
// var cols =3;
// var boxW=100;
// var vMargin = (width-cols*boxW)/(cols+1);
// var hMargin=25;

// ES6
// noinspection JSAnnotator
export default class Mine extends Component<{}> {
    static navigationOptions = {
        title: '我的',    //设置navigator的title
    }
    static defaultProps:{
    }
    propTypes:{
    }
    constructor(props) {
        super(props);
        this.state = {
            currentVersion:'0.0.33',
            currentTextDesc:'已是最新版本',
            isCheck:false,

        }
    }
    render() {
        return (
            <View>
                <View style={styles.titlestyle}>
                    <Text style={{alignSelf:'center'}}> </Text>
                    <Text style={{ alignSelf:'center'}}>{'欢迎您使用百拓酒店管理系统'}</Text>
                    <Text >　　 </Text>
                </View>
                <View style={styles.container}>
                    <Image source={require('../image/icon.png')} style={styles.iconStyle }/>
                    <Text>
                    版本号 {this.state.currentVersion }
                    </Text>

                    <TouchableOpacity  style={styles.itemsStyle} onPress={()=>this.checkVersion()}>
                        <Text style={styles.textsStyle}>
                            检查更新
                        </Text>
                        <Text style={styles.textsStyle}>
                            {this.state.currentTextDesc}
                        </Text>
                    </TouchableOpacity>

                    {/*<View style={styles.cellStyle}>*/}
                    {/*</View>*/}
                </View>

            </View>
        );
    }
    checkVersion() {
        if (this.state.isCheck === false) {
            this.setState({
                //复制数据源
                currentTextDesc: '正在检测...',
                isCheck: true
            });
               // alert(this.state.currentVersion);
            fetch(GlobalProps.CheckVersion, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'version=' + this.state.currentVersion
            })
                .then((response) => response.json())
                .then((responseData) => {
                    // alert(JSON5.stringify(responseData));

                    if(responseData.IsUpgrade){
                        // alert(responseData.downloadUrl);
                        Alert.alert('温馨提醒','检测到有新版本是否更新?',[
                            {text:'否',onPress:()=>{
                                this.setState({
                                currentTextDesc: '检测到有新版本',isCheck: false
                            });}},
                            {text:'是',onPress:()=> {
                                NativeModules.UpgradeModule.upgrade(responseData.downloadUrl);
                                this.setState({
                                    currentTextDesc: '正在更新...',
                                    isCheck: false
                                });
                            }}]);
                    }
                    else {
                        this.setState({
                            currentTextDesc: '已是最新版本',
                            isCheck: false
                        });
                        if(Platform.OS==='android'){
                            ToastAndroid.show('已是最新版本',ToastAndroid.SHORT);
                        }else{
                            alert('已是最新版本');
                        }
                    }

                    //  alert(JSON5.stringify(this.state.dataArray));
                })
                .catch((error) => {
                    // alert(error);
                    this.setState({
                        error: true,
                        errorInfo: error
                    })
                })
                .done();
        }
    }


}

const styles = StyleSheet.create({
    iconStyle:{
        alignItems:'center',
        marginTop:50,width:100,height:100,
        borderRadius:50,
        borderWidth:2,borderColor:'white'
    },
    container: {
        width:width,
        alignItems: 'center',
    },
    textsStyle:{
        justifyContent:'center',
        alignItems:"center",
        alignSelf:'center',
        fontSize:18,
        marginLeft:10,marginRight:0,
        //  backgroundColor:'red'
    },
    titlestyle:{
        flexDirection: 'row',
        justifyContent:'space-between',
        // alignItems:'flex-start',
        backgroundColor:'#2fa4e7',
        height:35,
    },
    itemsStyle:{
        width:width*0.95,
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#ffffff',
        height:40,
        borderRadius:5,
        paddingLeft:10,
        paddingRight:10,
        marginBottom:3,
        marginLeft:5,
        marginRight:5,
    },

});
