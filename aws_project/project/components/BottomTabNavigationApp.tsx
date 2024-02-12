import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, Image, View, StyleSheet, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Home from '../pages/screens/home';
import Save from '../pages/screens/save';
import Tips from '../pages/screens/tips';
import Closet from '../pages/screens/closet';
import Symbols from '../pages/screens/symbols';
import Mypage from '../pages/screens/mypage';


const Tab = createBottomTabNavigator();

function BottomTabNavigationApp() {
    return (
        <NavigationContainer>
            <Tab.Navigator 
                initialRouteName="Home"
                screenOptions={({ route }) => ({
                    tabBarStyle: {
                        height:60,
                    },
                    headerStyle:{
                        backgroundColor:'#1472FF',
                    },
                    headerLeft: ({ tintColor }) => (
                        <Image
                            source={require('../assets/Bubble.png')}
                        />
                    ),
                    headerRight: ({ tintColor }) => (
                        <Icon
                            name = 'home'
                            size = {30}
                            style = {{ marginRight: 11}}
                            color = {tintColor}
                            onPress = {() => navigation.navigate('Mypage')}
                        />
                    ),
                })}
            >
                <Tab.Screen
                    name="Save"
                    component={Save}
                    options={{
                        tabBarShowLabel: false,
                        headerShown: false,
                        title: '검색결과 저장',
                        tabBarIcon: ({color, size}) => (
                            <Image source={require('../assets/Save.png')}/>
                        )
                    }}
                />
                <Tab.Screen
                    name="Washing_symbol"
                    component={Symbols}
                    options={{
                        tabBarShowLabel: false,
                        headerShown: false,
                    title: '세탁기호',
                    tabBarIcon: ({color, size}) => (
                        <Image source={require('../assets/Washing_symbol.png')} style={styles.Logo}/>
                    )
                    }}
                />
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarShowLabel: false,
                        headerBackground(props) {
                            <image source={require('../assets/Header.png')} style={styles.Logo}/>
                        },
                        headerTitle: () => (
                            <View>
                                <Text>세탁코치</Text>
                            </View>
                        ),
                    title: '홈',
                    tabBarIcon: ({color, size}) => (
                        <Image source={require('../assets/Home.png')} style={styles.Logo}/>
                    )
                    }}
                />

                <Tab.Screen
                    name="Tips"
                    component={Tips}
                    options={{
                        tabBarShowLabel: false,
                        headerShown: false,
                        title: '세탁꿀팁',
                        tabBarIcon: ({color, size}) => (
                            <Image 
                                source={require('../assets/Tips.png')} 
                                style={styles.Logo}
                            />
                        )
                    }}
                />
                <Tab.Screen
                    name="Closet"
                    component={Closet}
                    options={{
                        tabBarShowLabel: false,
                        headerShown: false,
                    title: '나의옷장',
                    tabBarIcon: ({color, size}) => (
                        <Image source={require('../assets/Closet.png')} style={styles.Logo}/>
                    )
                    }}
                />
        </Tab.Navigator>
    </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
    },
    Logo: {
        width: 35,
        height: 30,
    }
});

export default BottomTabNavigationApp;