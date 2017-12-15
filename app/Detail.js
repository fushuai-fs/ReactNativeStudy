
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
            OrderID:''
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
             //    alert('detail    \r\n'+JSON5.stringify(responseData));
                this.setState({
                    //复制数据源
                    dataArray: responseData,
                    isLoading: false,
                });
                //  alert(JSON5.stringify(this.state.dataArray));
            })
            .catch((error) => {
                  alert(error);
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
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row',justifyContent:'space-between'}}>
                    <Text onPress={()=>this.props.navigation.goBack()}>&lt;返回　　</Text>
                    <Text>{'订单详情'}</Text>
                </View>
                <View style={{ flexDirection: 'row',justifyContent:'space-between'}}>
                    <Text>订单号：　{_data.OrderID}</Text>
                    <Text>{_data.AddTime }</Text>
                </View>
                <Text style={styles.hotelroom}>{_data.HotelNameCN+'('+_data.HotelNameGB+')' }</Text>
                <Text style={styles.hotelroom}>{_data.SellRoomNameCN+'('+_data.SellRoomNameGB+')'}</Text>
                <Text style={styles.hotelroom}>{_data.Guests}</Text>
                <View style={styles.orderinfo}>
                    <Text style={styles.orderitem}>{_data.CheckIn} 至 {_data.CheckOut}</Text>
                    <Text style={styles.orderitem}> {_data.rooms}晚</Text>
                    <Text style={[styles.orderitem]}> {_data.rooms}间</Text>
                    <Text style={[styles.orderitem]}> {_data.GuestNumber}人</Text>
                </View>
                <Text>备注：{_data.Remark}</Text>
                <View>
                    <Text style={{color:'orange'}}>房费：　CNY{_data.Payments}</Text>
                </View>
                <View>
                    <Text>订单状态　{_data.Status}</Text>
                </View>
                {/*<View style={[styles.orderinfo,]}>*/}
                    {/*<Text style={[styles.orderstate,{flex:1}]}>未发单到酒店</Text>*/}
                    {/*<Text style={[styles.orderstate,styles.pushorder]}>已发</Text>*/}
                {/*</View>*/}
            </View>
        );
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
    container: {
        paddingTop:10,paddingBottom:10,
        paddingLeft:25,paddingRight:10,

        backgroundColor:'white',
        alignItems: 'flex-start',
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
        fontSize:10,
    },
    orders:{

    },
    textInputStyle:{
        minWidth:width-70, height:38, backgroundColor:'white',
        marginBottom:1,
        textAlign:'center',marginLeft:30,marginRight:30,
    },
});
