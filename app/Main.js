
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
import Icon from 'react-native-vector-icons/FontAwesome';
import { StackNavigator } from 'react-navigation';
// 导入json数据
// var testData = require('./testData.json');
//
import All from './All.js';
import UnConfirm from './UnConfirm.js';
import Mine from './Mine.js';
import Detail from './Detail.js';
// 导航
// const AllView = StackNavigator({
//         All : { screen: All },
//         Detail : { screen: Detail },
//     },{
//     initialRouteName: 'All', // 默认显示界面
//     title:'', headerMode: 'none',
//     }
// )

// import { NavigationActions } from 'react-navigation'
// const resetAction = NavigationActions.reset({
//     index: 0,
//     actions: [
//         NavigationActions.navigate({routeName:'All'})//要跳转到的页面名字
//     ]
// });


// const AllList = () => (
//     <AllView />
// )
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
    static defaultProps={

    }
    state= {
        selectedTab: 'all', SupplierCode:'',UserName:'',OrderStatus:'',
        unConfirmNum:'',
    };
    // render() 方法前运行
    componentWillMount(){
      //  this.props.navigation.dispatch(resetAction);
        this.setState({
            SupplierCode: this.props.navigation.state.params.SupplierCode,
            UserName :this.props.navigation.state.params.UserName
        });
        //需要加载 待处理订单条数
    }
    // render() 方法后运行，如果在此更新了state会再次执行render()方法
    componentDidMount() {

    }


    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>

                {/*<TabNavigator style={{width:deviceW}}*/}
                              {/*tintColor='orange'*/}
                {/*>*/}
                    {/*<TabNavigator.Item*/}
                        {/*title="所有订单"*/}
                    {/*selected={this.state.selectedTab === 'all'}*/}
                    {/*selectedTitleStyle={{color: "#014af0"}}*/}
                    {/*renderIcon={() => <Icon name="home" size={px2dp(15)} color="#666"/>}*/}
                    {/*renderSelectedIcon={() => <Icon name="home" size={px2dp(10)} color="#3496f0"/>}*/}
                    {/*badgeText=""*/}
                    {/*onPress={() => this.renderfun(navigate,'all') }>*/}

                        {/*<StackNavigator Profile={{screen:All,*/}
                            {/*navigationOptions:()=>({*/}
                                {/*SupplierCode:this.state.SupplierCode,UserName:this.state.UserName,*/}
                        {/*})}} headerTitle ='订单列表' />*/}
                     {/*/!*<All SupplierCode={this.state.SupplierCode} UserName={this.state.UserName}/>*!/*/}
                {/*</TabNavigator.Item>*/}
                {/*<TabNavigator.Item*/}
                    {/*selected={this.state.selectedTab === 'UnConfirm'}*/}
                    {/*title="UnConfirm"*/}
                    {/*selectedTitleStyle={{color: "#014af0"}}*/}
                    {/*renderIcon={() => <Icon name="th-list" size={px2dp(15)} color="#666"/>}*/}
                    {/*renderSelectedIcon={() => <Icon name="th-list" size={px2dp(10)} color="#3496f0"/>}*/}
                    {/*badgeText={this.state.unConfirmNum}*/}
                    {/*onPress={() => this.setState({selectedTab: 'UnConfirm'})}>*/}
                    {/*<UnConfirm/>*/}
                {/*</TabNavigator.Item>*/}
                {/*<TabNavigator.Item*/}
                    {/*selected={this.state.selectedTab === 'Mine'}*/}
                    {/*title="Mine"*/}
                    {/*selectedTitleStyle={{color: "#014af0"}}*/}
                    {/*renderIcon={() => <Icon name="user" size={px2dp(15)} color="#666"/>}*/}
                    {/*renderSelectedIcon={() => <Icon name="user" size={px2dp(10)} color="#3496f0"/>}*/}
                    {/*badgeText=""*/}
                    {/*onPress={() => this.setState({selectedTab: 'Mine'})}>*/}

                    {/*<Mine/>*/}
                {/*</TabNavigator.Item>*/}
                {/*</TabNavigator>*/}

            </View>
        );
    }
    renderfun(navigate,selected){
        this.setState({selectedTab: selected})
        //navigate('Mine');
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
