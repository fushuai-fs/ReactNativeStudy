
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    Image
} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
// 导入json数据
var testData = require('./testData.json');

var Dimensions=require('Dimensions');
var {width}= Dimensions.get('window');

var cols =3;
var boxW=100;
var vMargin = (width-cols*boxW)/(cols+1);
var hMargin=25;


// noinspection JSAnnotator
export default class AppDemo2 extends Component<{}> {
    render() {
        return (
            <View style={styles.container}>
                {this.renderAllTest()}
            </View>
        );
    }

    renderAllTest(){
        var allData=[];
        for(var i=0;i<testData.data.length;i++){
            var data =testData.data[i];
            allData.push(
                <View key={i} style={styles.outViewStyle}>
                    <Image source={{uri: data.icon}} style={styles.imagesStyle}/>
                    <Text style={styles.titlesStyle}>
                        {data.title}
                    </Text>
                </View>
            );
        }
        //返回
        return allData;
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection:'row',
        // justifyContent: 'center',
        // alignItems: 'center',
        //backgroundColor: '#F5FCFF',
        flexWrap:'wrap'
    },
    outViewStyle:{
        backgroundColor:'blue',alignItems: 'center',
        width:boxW,height:boxW,
        marginLeft:vMargin,marginTop:hMargin,
    },
    imagesStyle:{
        width:80,height:80,
    },
    titlesStyle:{

    }
});
