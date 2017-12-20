
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
import moment from 'moment';

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
                    <Text style={styles.orderitem}>{moment(_data.CheckIn).format('MM-DD')} 至 {moment(_data.CheckOut).format('MM-DD')}</Text>
                    <Text style={styles.orderitem}> {moment(_data.CheckOut).diff(moment(_data.CheckIn), 'days')}晚</Text>
                    <Text style={[styles.orderitem,{flex:1,}]}> {_data.Rooms}间</Text>
                </View>
                <Text style={[styles.orderitem,{flexWrap:'wrap'}]}>{_data.Guests}</Text>
                <View style={[styles.orderinfo,]}>
                    <Text style={{color:'#000000',flex:1}}>订单号{_data.OrderID}</Text>
                    <Text style={{color:'orange'}}>CNY{_data.Payments}</Text>
                </View>
                <View>
                    <Text>{moment(_data.AddTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
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
         backgroundColor:'#ffffff',
        alignItems: 'flex-start',
    },
    hotelStyle:{
        fontSize:14,
        fontWeight: 'bold',
        flexWrap:'wrap',
        color:'#cc0000',
    },
    roomStyle:{
        marginTop:5,
        fontSize:14,
        flexWrap:'wrap',
        color:'#000000'
    },
    orderinfo:{
        marginTop:10,
        flexDirection: 'row',
    },
    orderitem:{
        fontSize:12,
        color:'#000000',
    },
    orders:{

    },
    textInputStyle:{
        minWidth:width-70, height:38, backgroundColor:'white',
        marginBottom:1,
        textAlign:'center',marginLeft:30,marginRight:30,
    },
});
