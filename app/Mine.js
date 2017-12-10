
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,TouchableOpacity
    ,FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

// 导入json数据
// var testData = require('./testData.json');

var Dimensions=require('Dimensions');
var {width}= Dimensions.get('window');

var cols =3;
var boxW=100;
var vMargin = (width-cols*boxW)/(cols+1);
var hMargin=25;

// ES6
// noinspection JSAnnotator
export default class Mine extends Component<{}> {

    render() {
        return (
            <View style={styles.container} >
                <Text style={styles.welcome}>
                    Mine123355
                </Text>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#dddddd',
        alignItems: 'center',
    },
    textInputStyle:{
        minWidth:width-70, height:38, backgroundColor:'white',
        marginBottom:1,
        textAlign:'center',marginLeft:30,marginRight:30,
    },
});
