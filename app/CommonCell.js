
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

var GlobalProps = require('../globalProps.json');

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

    }
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }
    render() {
        return (
            <View style={styles.container} >
                <Text style={styles.hotelroom}>新加坡丽思卡尔顿美年酒店(The Ritz-Carlton, Millenia Singapore)</Text>
                <Text style={styles.hotelroom}>豪华房（含早）(双床)(特价)(内宾)</Text>
                <View style={styles.orderinfo}>
                    <Text style={styles.orderitem}>2017-12-11至2017-12-13</Text>
                    <Text style={styles.orderitem}>2晚</Text>
                    <Text style={[styles.orderitem,{flex:1,}]}>1间</Text>
                    <Text style={styles.orderitem}>fushuai</Text>
                </View>
                <View style={[styles.orderinfo,]}>
                    <Text style={{color:'gray',flex:1}}>订单号{'2324242342'}</Text>
                    <Text style={{color:'orange'}}>CNY{'345'}</Text>
                </View>
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
        padding:10,

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
