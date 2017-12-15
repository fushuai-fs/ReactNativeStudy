
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

import { StackNavigator } from 'react-navigation';

//导入页面（或导入组件）
import  CommonCell from './CommonCell.js';
import Detail from "./Detail";


// ES6
// noinspection JSAnnotator
  export  default class AllList extends Component<{}> {
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
            dataStrArr:'',
            tag:'',
            OrderID:'',
            SupplierCode:'',
            UserName: '',
            OrderStatus:'',
        }
    }
      // render() 方法前运行
      componentWillMount(){
          //  this.props.navigation.dispatch(resetAction);
         // alert(JSON5.stringify(this.props.navigation.state.params));
       //   alert(JSON5.stringify(this.props.navigation.state.params));
          this.setState({
              SupplierCode: this.props.navigation.state.params.SupplierCode,
              UserName :this.props.navigation.state.params.UserName,
              // isLoading:false
          });

          var supplierCode=this.props.navigation.state.params.SupplierCode;
          var userName=this.props.navigation.state.params.UserName;
          var oStatus='';
          // alert('Method=OrderList&SupplierCode='+supplierCode+'&UserName='+userName+"&Status="+oStatus);
          //请求数据
           this.fetchData(supplierCode,userName,oStatus);
          //需要加载 待处理订单条数
      }

    componentDidMount() {

    }


    //网络请求
    fetchData(supplierCode,userName,oStatus) {
     //   var supplierCode=this.state.SupplierCode; var userName=this.state.UserName;var oStatus=this.state.OrderStatus;
        // var supplierCode=this.props.SupplierCode; var userName=this.props.UserName;var oStatus=this.props.OrderStatus;
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
            <TouchableOpacity onPress={()=>this.cellAction(item)}>
                <CommonCell Data={item}/>
            </TouchableOpacity>
        );
    }
    //点击某行
    cellAction =(item)=>{
        if(item.index < this.state.dataArray.length - 1){
            this.setState({
               // tag:'Detail',
                OrderID:item.item.OrderID
            })
            this.props.navigation.navigate("Detail",{SupplierCode:this.state.SupplierCode,UserName:this.state.UserName,OrderID:item.item.OrderID});
          //  alert(item.item.OrderID);
           // DeviceEventEmitter.emit('left',item.index); //发监听
          //  alert(JSON5.stringify(item.item));
          //   this.props.navigation.navigate('Detail',{Data:item.item});
        //    navigate.navigate('Detail',{Data:item.item});
        }

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

      // renderDetail(SupplierCode,UserName,OrderID) {
      //     // alert(this.props.SupplierCode)// alert(SupplierCode+'--'+UserName+'--'+this.state.OrderID);
      //     return (
      //         <ScrollView >
      //             <View style={styles.container} >
      //                 <Detail SupplierCode={SupplierCode} UserName={UserName} OrderID={OrderID}/>
      //             </View>
      //         </ScrollView>
      //     );
      // }


    render() {

          // return(
          //     <View>
          //         <Text onPress={()=>{
          //             this.props.navigation.navigate("Detail");
          //         }}>点击跳转</Text>
          //     </View>
          // );
        //const { navigate } = this.props.navigation;
        //第一次加载等待的view
        if (this.state.isLoading && !this.state.error) {
            return this.renderLoadingView();
        } else if (this.state.error) {
            //请求失败view
            return this.renderErrorView(this.state.errorInfo);
        }
        // else if(this.state.tag==='Detail') {
        //     // 加载详情页面  使用 this.state.OrderID
        //
        //     return this.renderDetail(this.props.SupplierCode,this.props.UserName,this.state.OrderID);
        // }

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

