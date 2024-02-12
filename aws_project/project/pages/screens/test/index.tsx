import React from 'react';
import {Image, View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Mypage from '../mypage';

const Test = ({navigation}) => {

    return (
        <View
            style={styles.Container}
        >
            <Image source={require('../../../assets/Header.png')}/>
        </View>
    );
};

const styles = StyleSheet.create({
    Container: {
        flex: 1,
            width:50
        },
    text: {
        fontSize: 48,
    }
})

export default Test;