
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
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/FontAwesome'
// 导入json数据
// var testData = require('./testData.json');
//
import All from './All.js';
import UnConfirm from './UnConfirm.js';
import Mine from './Mine.js';

// var All = require('./All');
// var UnConfirm = require('./UnConfirm');
var Dimensions=require('Dimensions');

// var {width}= Dimensions.get('window');
//
// var cols =3;
// var boxW=100;
// var vMargin = (width-cols*boxW)/(cols+1);
// var hMargin=25;

const deviceW = Dimensions.get('window').width

const basePx = 375

function px2dp(px) {
    return px *  deviceW / basePx
}
// ES6
// noinspection JSAnnotator
export default  class Main extends Component<{}> {

    state= {
        selectedTab: 'all'
    };

    render() {
        return (
            <View style={styles.container}>
                <TabNavigator style={{width:deviceW}}
                              tintColor='orange'
                >
                    <TabNavigator.Item
                    selected={this.state.selectedTab === 'all'}
                    title="所有订单"
                    selectedTitleStyle={{color: "#014af0"}}
                    renderIcon={() => <Icon name="home" size={px2dp(15)} color="#666"/>}
                    renderSelectedIcon={() => <Icon name="home" size={px2dp(10)} color="#3496f0"/>}
                    badgeText="1"
                    onPress={() => this.setState({selectedTab: 'all'})}>
                   <All/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'UnConfirm'}
                    title="UnConfirm"
                    selectedTitleStyle={{color: "#014af0"}}
                    renderIcon={() => <Icon name="th-list" size={px2dp(15)} color="#666"/>}
                    renderSelectedIcon={() => <Icon name="th-list" size={px2dp(10)} color="#3496f0"/>}
                    badgeText="1"
                    onPress={() => this.setState({selectedTab: 'UnConfirm'})}>
                    <UnConfirm/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'Mine'}
                    title="Mine"
                    selectedTitleStyle={{color: "#014af0"}}
                    renderIcon={() => <Icon name="user" size={px2dp(15)} color="#666"/>}
                    renderSelectedIcon={() => <Icon name="user" size={px2dp(10)} color="#3496f0"/>}
                    badgeText="1"
                    onPress={() => this.setState({selectedTab: 'Mine'})}>

                    <Mine/>
                </TabNavigator.Item>
                </TabNavigator>

            </View>
        );
    }


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
         alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
