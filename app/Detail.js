
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
        SupplierCode:'',
        UserName: '',
        OrderID:''
    }
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            //网络请求状态
            error: false,
            errorInfo: "",
            dataArray:{}
        }
    }
    // render() 方法前运行
    componentWillMount(){
        // alert(JSON.stringify(this.props.Data))
        // this.setState({
        //     Data: this.props.navigation.state.params.Data,
        // });
        this.fetchData();
    }
    //网络请求
    fetchData() {
        var supplierCode=this.props.SupplierCode; var userName=this.props.UserName;var orderID=this.props.OrderID;
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
               //  alert('detail'+JSON5.stringify(responseData));
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
        //const  _data=this.props.Data.item;
        return (
            <View style={styles.container}>
                {/*<Text style={styles.hotelroom}>{_data.HotelNameCN+'('+_data.HotelNameGB+')' }</Text>*/}
                {/*<Text style={styles.hotelroom}>{_data.CheckIn+'('+_data.CheckOut+')'}</Text>*/}
                {/*<View style={styles.orderinfo}>*/}
                    {/*<Text style={styles.orderitem}>{_data.CheckIn} 至 {_data.CheckOut}</Text>*/}
                    {/*<Text style={styles.orderitem}> {_data.rooms}晚</Text>*/}
                    {/*<Text style={[styles.orderitem,{flex:1,}]}> {_data.rooms}间</Text>*/}
                    {/*<Text style={styles.orderitem}>{_data.Guests}</Text>*/}
                {/*</View>*/}
                {/*<View style={[styles.orderinfo,]}>*/}
                    {/*<Text style={{color:'gray',flex:1}}>订单号{_data.OrderID}</Text>*/}
                    {/*<Text style={{color:'orange'}}>CNY{_data.Payments}</Text>*/}
                {/*</View>*/}
                <View style={[styles.orderinfo,]}>
                    <Text style={[styles.orderstate,{flex:1}]}>未发单到酒店</Text>
                    <Text style={[styles.orderstate,styles.pushorder]}>已发</Text>
                </View>
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