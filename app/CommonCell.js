
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


var Dimensions=require('Dimensions');
var {width}= Dimensions.get('window');

var cols =3;
var boxW=100;
var vMargin = (width-cols*boxW)/(cols+1);
var hMargin=25;

// ES6
// noinspection JSAnnotator
export default class CommonCell extends Component<{}> {
    static defaultProps={
        Data:{}
    }
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
      //  alert('CommonCell'+JSON.stringify(this.props.Data));
        const  _data=this.props.Data.item;
        return (
            <View style={styles.container}>
                <Text style={styles.hotelStyle}>{_data.HotelNameCN+'('+_data.HotelNameGB+')' }</Text>
                <Text style={styles.roomStyle}>{_data.SellRoomNameCN+'('+_data.SellRoomNameGB+')'}</Text>
                <View style={styles.orderinfo}>
                    <Text style={styles.orderitem}>{_data.CheckIn} 至 {_data.CheckOut}</Text>
                    <Text style={styles.orderitem}> {_data.rooms}晚</Text>
                    <Text style={[styles.orderitem,{flex:1,}]}> {_data.rooms}间</Text>
                    <Text style={styles.orderitem}>{_data.Guests}</Text>
                </View>
                <View style={[styles.orderinfo,]}>
                    <Text style={{color:'gray',flex:1}}>订单号{_data.OrderID}</Text>
                    <Text style={{color:'orange'}}>CNY{_data.Payments}</Text>
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
        width:width,
        backgroundColor:'white',
        alignItems: 'flex-start',
    },
    hotelStyle:{
        fontSize:14,
        fontWeight: 'bold',
        flexWrap:'wrap',
        color:'blue',
    },
    roomStyle:{
        height:24,
        flexWrap:'wrap',
    },
    orderinfo:{
        height:24,
        flexDirection: 'row',
    },
    orderitem:{
        height:24,
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
