
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    ScrollView,
    RefreshControl,
    ToastAndroid
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

//导入页面（或导入组件）
import  CommonCell from './CommonCell.js';
import Detail from "./Detail";

// ES6
// noinspection JSAnnotator
export default class UnConfirm extends Component<{}> {
    static navigationOptions = {
        title: '待确认订单',    //设置navigator的title
        showLabel:'123'
    }
    static defaultProps={
    OrderStatus:1,
        IsManual:1
}
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            //网络请求状态
            error: false,
            errorInfo: "",
            dataArray: null,
            dataStrArr:'',
            tag:'',
            OrderID:'',
            SupplierCode:'',
            UserName: '',
            OrderStatus:'',
            refreshing: false,
        }
    }
    // render() 方法前运行
    componentWillMount(){
        this.setState({
            SupplierCode: this.props.navigation.state.params.SupplierCode,
            UserName :this.props.navigation.state.params.UserName,
        });

        var supplierCode=this.props.navigation.state.params.SupplierCode;
        var userName=this.props.navigation.state.params.UserName;
        var oStatus=this.props.OrderStatus;
         // alert('Method=OrderList&SupplierCode='+supplierCode+'&UserName='+userName+"&Status="+oStatus);
        //请求数据
        this.fetchData(supplierCode,userName,oStatus);
        //需要加载 待处理订单条数
    }
    // 下拉 刷新
    _onRefresh() {
        this.setState({refreshing: true});

        var supplierCode=this.state.SupplierCode;
        var userName=this.state.UserName;
        var oStatus=this.props.IsManual;
        this.fetchData(supplierCode,userName,oStatus);

    }
    //网络请求
    fetchData(supplierCode,userName,oStatus) {
        // alert('Method=OrderList&SupplierCode='+supplierCode+'&UserName='+userName+"&Status="+oStatus);
        //这个是js的访问网络的方法
        fetch(GlobalProps.OrderList,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:'Method=OrderList&SupplierCode='+supplierCode+'&UserName='+userName+'&Status='+oStatus+'&IsManual='+this.props.IsManual
        })
            .then((response) => response.json())
            .then((responseData) => {
                // alert(JSON5.stringify(responseData.rows));
                this.setState({
                    //复制数据源
                    // dataStrArr:JSON5.stringify(responseData),
                    dataArray: responseData.rows,
                    isLoading: false,
                    refreshing: false,
                });
                //  alert(JSON5.stringify(this.state.dataArray));
            })

            .catch((error) => {
                // alert(error);
                this.setState({
                    error: true,
                    errorInfo: error
                })
                ToastAndroid.show(error,ToastAndroid.SHORT);
            })
            .done();
    }
    //加载等待的view   ActivityIndicator组件？？？？？？？？？？？？？？？
    renderLoadingView() {
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    animating={true}
                    style={[{flex:1,justifyContent:'center',height: 180}]}
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
    //返回itemView   FlatList每行数据
    renderItemView=(item)=> {
        // alert(JSON5.stringify(item));
        return (
            <View  style={{
                borderBottomWidth:1,
            }} >
                <TouchableOpacity onPress={()=>this.cellAction(item)}>
                    <CommonCell Data={item}/>
                </TouchableOpacity>
            </View>
        );
    }
    //点击某行
    cellAction =(item)=>{
       // alert(JSON5.stringify(item));
       //  if(item.item < this.state.dataArray.length - 1){
       //      this.setState({
       //          // tag:'Detail',
       //          OrderID:item.item.OrderID
       //      })
       //     //  alert(item.item.OrderID);
       //      // DeviceEventEmitter.emit('left',item.index); //发监听
       //      //  alert(JSON5.stringify(item.item));
       //      //   this.props.navigation.navigate('Detail',{Data:item.item});
       //      //    navigate.navigate('Detail',{Data:item.item});
       //  }
        this.props.navigation.navigate("Detail",{SupplierCode:this.state.SupplierCode,UserName:this.state.UserName,OrderID:item.item.OrderID});

    }
    renderData() {

        if(typeof(JSON5.stringify(this.state.dataArray))==='undefined'){
            return (
                <View style={styles.container} >
                    <ScrollView style={{flex:1}} refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={()=>this._onRefresh()}
                        />
                    }>
                        <Text>
                            暂无订单，下拉刷新......
                        </Text>
                    </ScrollView>
                </View>
            );

        }


        // alert(JSON5.stringify(this.state.dataArray));

        // alert(this.state.dataStrArr);
        return (
            <View style={{ flex: 1,
                alignItems: 'center',}}>
                <ScrollView style={{flex:1}} refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={()=>this._onRefresh()}
                    />
                }>
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

