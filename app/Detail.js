
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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
var JSON5 = require('json5');
// 全局属性
var GlobalProps = require('../globalProps.json');

var Dimensions=require('Dimensions');
var {width}= Dimensions.get('window');

var cols =3;
var boxW=100;
var vMargin = (width-cols*boxW)/(cols+1);
var hMargin=25;

// ES6
// noinspection JSAnnotator
export default class Detail extends Component<{}> {
    static defaultProps={
    }
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            //网络请求状态
            error: false,
            errorInfo: "",
            dataArray:{},
            SupplierCode:'',
            UserName: '',
            OrderID:'',
            Refuse:"" , // 拒单原因
        }
    }
    // render() 方法前运行
    componentWillMount(){

        var SupplierCode=this.props.navigation.state.params.SupplierCode;
        var UserName=this.props.navigation.state.params.UserName;
        var OrderID = this.props.navigation.state.params.OrderID;
        // alert(JSON.stringify(this.props.Data))
        this.setState({
            SupplierCode:SupplierCode,
            UserName:UserName,
            OrderID:OrderID
        });
        this.fetchData(SupplierCode,UserName,OrderID);
    }
    //网络请求
    fetchData(supplierCode,userName,orderID) {
       // var supplierCode=this.props.SupplierCode; var userName=this.props.UserName;var orderID=this.props.OrderID;
       // alert(orderID);
        // alert('Method=OrderList&SupplierCode='+supplierCode+'&UserName='+userName+"&Status="+oStatus);
        //这个是js的访问网络的方法
        fetch(GlobalProps.OrderList,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            /*SupplierCode:25887708
Method:OrderDetail
Status:1
UserName:fushuai*/
            body:'Method=OrderDetail&SupplierCode='+supplierCode+'&UserName='+userName+"&OrderID="+orderID
        })
            .then((response) => response.json())
            .then((responseData) => {
             //  alert('detail    \r\n'+JSON5.stringify(responseData));
                this.setState({
                    //复制数据源
                    dataArray: responseData,
                    isLoading: false,
                });
                //  alert(JSON5.stringify(this.state.dataArray));
            })
            .catch((error) => {
                //  alert(error);
                this.setState({
                    error: true,
                    errorInfo: error
                })
            })
            .done();
    }
    render() {
     //   alert('Detail'+JSON.stringify(this.props.Data));
       //  alert(JSON.stringify(this.state.Data));
        // const { navigate } = this.props.navigation;
        const  _data=this.state.dataArray;
       // alert(JSON5.stringify(_data))
        return (
            <View  >
                <View style={styles.titlestyle}>
                    <Text style={{alignSelf:'center'}} onPress={()=>this.props.navigation.goBack()}>　&lt;返回</Text>
                    <Text style={{ alignSelf:'center'}}>{'订单详情'}</Text>
                    <Text >　　 </Text>
                </View>
            <View style={styles.container}>

                {/*<View style={{ flexDirection: 'row',justifyContent:'space-between'}}>*/}
                {/*</View>*/}
                <View style={styles.groupstyle}>
                    <Text style={styles.orders}>订单号： {_data.OrderID}</Text>
                    <Text style={styles.orders}>预定时间： {_data.AddTime }</Text>
                    <Text style={[styles.hotelroom,styles.orders]}>{_data.HotelNameCN+'('+_data.HotelNameGB+')' }</Text>
                </View>
                <View style={styles.groupstyle}>
                    <View style={{flexDirection: 'row',width:width*0.9,justifyContent:'space-between' }}>
                        <Text style={[styles.orderitem]}>{_data.SellRoomNameCN+'('+_data.SellRoomNameGB+')'}</Text>
                        <Text style={[styles.orderitem]}> {_data.rooms}间</Text>
                    </View>
                    <View style={{flexDirection: 'row',width:width*0.9,justifyContent:'space-between'}}>
                        <Text style={[styles.orderitem]}>{_data.CheckIn} 至 {_data.CheckOut}</Text>
                        <Text style={styles.orderitem}> {_data.rooms}晚</Text>
                    </View>
                    <View style={{flexDirection: 'row',width:width*0.9,justifyContent:'space-between'}}>
                        <Text style={[styles.orderitem]}>{_data.Guests}</Text>
                        <Text style={[styles.orderitem]}> {_data.GuestNumber}人</Text>
                    </View>
                </View>
                {this.renderStatus(_data.Status,_data.OrderID)}
                {/*<View style={[styles.orderinfo,]}>*/}
                    {/*<Text style={[styles.orderstate,{flex:1}]}>未发单到酒店</Text>*/}
                    {/*<Text style={[styles.orderstate,styles.pushorder]}>已发</Text>*/}
                {/*</View>*/}
            </View>
            </View>
        );
    }
    renderStatus(orderStatus,OrderID){
        // if(orderStatus===1){
            return (
                <View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{alignSelf:'center'}}>拒单原因：</Text>
                        <TextInput style={styles.textInputStyle} onChangeText={(text) => { this.state.Refuse = text }} />
                    </View>
                    <View style={{flexDirection: 'row', width:width*0.9,justifyContent:'center'}}>
                        <View style={styles.styleButton}>
                            <Text style ={styles.textsStyle} onPress={()=>this.OrderRefuse(OrderID)} >{'拒 单'}</Text>
                        </View>
                        <View style={styles.styleButton}>
                            <Text style ={styles.textsStyle} onPress={()=>this.OrderConfirm(OrderID)} >{'订 妥'}</Text>
                        </View>

                    </View>
                </View>
            );
        // }

    }
    // 拒单
    OrderRefuse(OrderID){
        var SupplierCode=this.state.SupplierCode;
        var UserName =this.state.UserName;
        var refuse =this.state.Refuse;
        if(refuse===null || refuse===''){
            Alert.alert('',"请填写拒绝原因");
            return;
        }

        fetch(GlobalProps.OrderList,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:'Method=Refuse&SupplierCode='+SupplierCode+'&UserName='+UserName+"&OrderID="+OrderID
        })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    //复制数据源
                    isLoading: false,
                });
                if(responseData.msg===''){
                    Alert.alert('',"拒单成功");
                }
                else  {
                    Alert.alert('',responseData.msg);
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
    //订妥
    OrderConfirm(OrderID){
        var SupplierCode=this.state.SupplierCode;
        var UserName =this.state.UserName;
        fetch(GlobalProps.OrderList,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:'Method=Settled&SupplierCode='+SupplierCode+'&UserName='+UserName+"&OrderID="+OrderID
        })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    //复制数据源
                    isLoading: false,
                });
                if(responseData.msg===''){
                    Alert.alert('',"订妥成功");
                }
                else  {
                    Alert.alert('',responseData.msg);
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



    // componentDidMount() {
    //     return fetch(GlobalProps.LoginUrl)
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //             alert(responseJson);
    //             this.setState({
    //                 isLoading: false
    //             }, function() {    /*do something*/   });
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }




}

const styles = StyleSheet.create({
    groupstyle:{
        borderBottomWidth:1,
        opacity:0.5,
        width:width*0.9,
        paddingTop:5,paddingBottom:10,
    },
    container: {
        width:width,
        paddingTop:5,paddingBottom:10,
        paddingLeft:20,paddingRight:20,

        backgroundColor:'white',
        alignItems: 'flex-start',
    },
    titlestyle:{
        flexDirection: 'row',
        justifyContent:'space-between',
        // alignItems:'flex-start',
        backgroundColor:'blue',
        height:35,

    },
    hotelroom:{
        fontSize:14,
        fontWeight: 'bold',
        flexWrap:'wrap',
    },
    orderinfo:{
        flexDirection: 'row',
    },
    orderitem:{
        height:24,
    },
    orders:{
        height:24,
    },
    textsStyle:{
        alignSelf:'center',
        fontSize:18,
        color:'blue',
        padding:5,
         // backgroundColor:'red'
    },
    textInputStyle:{
        minWidth:width*0.5, height:38, backgroundColor:'white',
        marginBottom:1,
        // textAlign:'left',
        // marginLeft:30,marginRight:30,
    },
   styleButton:{
       borderWidth:1,
       borderRadius:5,
       borderColor:'blue',
       justifyContent:'center',
       alignItems:'center',
       margin:5
   },
});
