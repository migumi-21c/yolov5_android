import React, {useState} from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet, Modal,Pressable} from 'react-native';
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Mypage from '../mypage';
import Cus_Modal from '../../../components/Modal';

const Stack = createStackNavigator();

const Home = ({navigation}) => {
  return (
    <View>
      <Text>홈</Text>
      <Mypage></Mypage>
    </View>
  );
};



export default Home;