
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,TouchableOpacity
,FlatList
,ListView
,ActivityIndicator
,ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

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
                <ScrollView>
                    <View style={styles.orderItems}>
                        <CommonCell/>
                    </View>
                    <View style={styles.orderItems}>
                        <CommonCell/>
                    </View>
                    <View style={styles.orderItems}>
                        <CommonCell/>
                    </View>
                    <View style={styles.orderItems}>
                        <CommonCell/>
                    </View>
                    <View style={styles.orderItems}>
                        <CommonCell/>
                    </View>
                </ScrollView>
            </View>
        );
    }

    componentDidMount() {
        return fetch(GlobalProps.LoginUrl)
            .then((response) => response.json())
            .then((responseJson) => {
           // alert(responseJson);
              //  let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    isLoading: false,
                    //dataSource: ds.cloneWithRows(responseJson.movies),
                }, function() {
                    // do something with new state
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    dealWithData()
    {

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
