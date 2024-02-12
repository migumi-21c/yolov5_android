import React from "react"
import {StatusBar, StyleSheet, Text, View, Button, Image, Modal} from "react-native"
import "react-native-gesture-handler";
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import { Amplify, Auth } from 'aws-amplify';
// import amplifyconfig from './amplifyconfiguration.json';
// Amplify.configure(amplifyconfig);

// import { generateClient } from "aws-amplify/api";
// import { createMyCloset } from './graphql/mutations';

// const client = generateClient()

import BottomTabNavigationApp from "./components/BottomTabNavigationApp";
import Cus_Modal from "./components/Modal";
const Stack = createStackNavigator();

export default function App(){
  const newMyCloset = await client.graphql({
    query: createMyCloset,
    variables: {
        input: {
    "title": "Lorem ipsum dolor sit amet",
    "laundry_icon": /* Provide a LaundryIcon instance here */,
    "how_to_laundry": "Lorem ipsum dolor sit amet",
    "caution": "Lorem ipsum dolor sit amet",
    "memo": "Lorem ipsum dolor sit amet",
    "userId": "a3f4095e-39de-43d2-baf4-f8c16f0f6f4d",
    "image":  /* Provide init commands */,
    "date": "1970-01-01Z"
  }
    }
});
  return (
    

    <>
      <Image source={require('./assets/Header.png')}/>
      <BottomTabNavigationApp></BottomTabNavigationApp>
    </>
    
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 48,
  },
  view:{
    width:50,
  }
})

export default App;