import React, {useState} from "react"
import {StatusBar, StyleSheet, Text, View, Pressable, Image, Modal} from "react-native"
import BottomTabNavigationApp from "./components/BottomTabNavigationApp";
import Cloth from "./cloth";

export default function Closet(){
    const [modalVisible, setModalVisible] = useState(false);
    return (
    <View style={styles.Container}>
        <StatusBar style="auto"/>
        <Pressable
        style={styles.cloth}
            onPressIn={() => {
                setModalVisible(true);
            }}
        >
            <Image source={require("../../../assets/Closet.png")}/>
            <View>
                <Text name="Title">코트</Text>
                <View name="simbols" style={styles.simbols}>
                    <Image source={require("../../../assets/Closet.png")}/>
                    <Image source={require("../../../assets/Closet.png")}/>
                    <Image source={require("../../../assets/Closet.png")}/>
                    <Image source={require("../../../assets/Closet.png")}/>
                </View>
            </View>
        </Pressable>
        <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Cloth></Cloth>
                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>Hide Modal</Text>
                    </Pressable>
                </View>
                </View>
            </Modal>
    </View>
    );
}

const styles = StyleSheet.create({
    Container: {
    flex: 1,
    backgroundColor: "#FFF",
    },
    text: {
    fontSize: 48,
    color: "red"
    },
    cloth: {
        elevation: 10,
        margin: 10,
        flexDirection : "row"
    },
    simbols:{
        flexDirection : "row"
        
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#0057FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})

export default Closet;
