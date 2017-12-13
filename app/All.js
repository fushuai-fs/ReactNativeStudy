
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,TouchableOpacity
,FlatList
,ActivityIndicator
,ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
var JSON5 = require('json5');
var GlobalProps = require('../globalProps.json');

var Dimensions=require('Dimensions');
var {width}= Dimensions.get('window');

var cols =3;
var boxW=100;
var vMargin = (width-cols*boxW)/(cols+1);
var hMargin=25;


import  CommonCell from './CommonCell.js';
// ES6
// noinspection JSAnnotator
export default class All extends Component<{}> {
    static defaultProps={
        SupplierCode:'',
        UserName: '',
        OrderStatus:''
    }
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            //网络请求状态
            error: false,
            errorInfo: "",
            dataArray: null,
            dataStrArr:''
        }
    }
    componentWillMount(){
        alert('componentWillMount');
        alert(JSON5.stringify(this.props))

    }
    componentDidMount() {

        //请求数据
        //  this.fetchData();
    }


    //网络请求
    fetchData() {
        var supplierCode=this.props.SupplierCode; var userName=this.props.UserName;var oStatus=this.props.OrderStatus;
        // alert('Method=OrderList&SupplierCode='+supplierCode+'&UserName='+userName+"&Status="+oStatus);
        //这个是js的访问网络的方法
        fetch(GlobalProps.OrderList,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            /*SupplierCode:25887708
Method:OrderList
Status:1
UserName:fushuai*/
            body:'Method=OrderList&SupplierCode='+supplierCode+'&UserName='+userName+"&Status="+oStatus
        })
            .then((response) => response.json())
            .then((responseData) => {
              //  alert(JSON5.stringify(responseData.rows));
                this.setState({
                    //复制数据源
                    dataStrArr:JSON5.stringify(responseData.rows),
                    dataArray: responseData.rows,
                    isLoading: false,
                });
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
    //加载等待的view
    renderLoadingView() {
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    animating={true}
                    style={[styles.gray, {height: 80}]}
                    color='red'
                    size="large"
                />
            </View>
        );
    }

    //加载失败view
    renderErrorView(error) {
        return (
            <View style={styles.container}>
                <Text>
                    Fail: {error}
                </Text>
            </View>
        );
    }
    //返回itemView
    renderItemView=(item)=> {
        return (
        <CommonCell Data={item}/>
        );
    }
    renderData() {
       // alert(this.state.dataStrArr);
        return (
            <View style={styles.container} >
            <ScrollView >
                <FlatList  ref='FlatList'
                           data = {this.state.dataArray} //数据源
                           renderItem = {(item) => this.renderItemView(item)} //每一行render
                           keyExtractor={this.keyExtractor}  //使用json中的title动态绑定key
                     />
            </ScrollView>
            </View>
        );
    }
    //使用json中的title动态绑定key
    keyExtractor(item: Object, index: number) {
        return item.OrderID
    }

    render() {

        //第一次加载等待的view
        if (this.state.isLoading && !this.state.error) {
            return this.renderLoadingView();
        } else if (this.state.error) {
            //请求失败view
            return this.renderErrorView(this.state.errorInfo);
        }
        //加载数据
        return this.renderData();
        // return (
        //     {/*<View style={styles.container} >*/}
        //         {/*<ScrollView>*/}
        //             {/*<View style={styles.orderItems}>*/}
        //                 {/*<CommonCell/>*/}
        //             {/*</View>*/}
        //             {/*<View style={styles.orderItems}>*/}
        //                 {/*<CommonCell/>*/}
        //             {/*</View>*/}
        //             {/*<View style={styles.orderItems}>*/}
        //                 {/*<CommonCell/>*/}
        //             {/*</View>*/}
        //             {/*<View style={styles.orderItems}>*/}
        //                 {/*<CommonCell/>*/}
        //             {/*</View>*/}
        //             {/*<View style={styles.orderItems}>*/}
        //                 {/*<CommonCell/>*/}
        //             {/*</View>*/}
        //         {/*</ScrollView>*/}
        //     // </View>
        // );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#dddddd',
        alignItems: 'center',
    },
    orderItems:{
        paddingBottom:5,
    },
    textInputStyle:{
        minWidth:width-70, height:38, backgroundColor:'white',
        marginBottom:1,
        textAlign:'center',marginLeft:30,marginRight:30,
    },
});
