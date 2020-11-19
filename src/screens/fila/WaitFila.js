import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button, ImageBackground, StyleSheet, Image, Dimensions, TouchableOpacity, Component, Alert, AsyncStorage } from 'react-native';
import { Center } from "../../utils/Center";
import LottieView from 'lottie-react-native'
import io from 'socket.io-client';
import { Colors, Typography } from "../../styles/index"
import { useFocusEffect } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';


const WINDOW_WIDTH = Dimensions.get('window').width;

export default function WaitFila({ navigation, route }) {

    const { local } = route.params;
    const { sucursal } = route.params;
    const { cajaNum } = route.params;

    const [token1, setToken] = useState(null);
    const [msg, setMsg] = useState(null);

    const [isActive, setActive] = useState(false);

    const handleToken = async () => {
        await AsyncStorage.getItem('token', (err, result) => {
            const pre = JSON.parse(result)
            setToken(pre.token)
        })

    }

    const socketFunc = async () => {
        const data = { token: token1, local: local, Sucursal: sucursal, Caja: cajaNum }
        const socket = io("http://54.84.31.119:3000");
        socket.emit("viewlineCli", data);
        socket.on("viewlineCli", msg => {
            console.log(msg)
            setMsg(msg)
            if (msg == 0) {
                navigation.navigate("FinishFila", { cajaNum: cajaNum })
            }
            if (msg == -1) {
                navigation.navigate("Home")
            }
            if (msg == -2) {
                navigation.navigate("ErrorFila")
            }

        })

    };

    const salirDeCola = async () => {
        const data = { token: token1, local: local, Sucursal: sucursal, Caja: cajaNum }
        const socket = io("http://54.84.31.119:3000");
        socket.emit("disconnectedCli", data)
        socket.on("disconnectedCli", msg => {
            console.log(msg)
            navigation.navigate("Home")
        })
    };

    useFocusEffect(
        useCallback(() => {
            handleToken()
            const interval = setInterval(() => {
                socketFunc()
            }, 1000);
            const socket = io("http://54.84.31.119:3000");
            return () => {
                clearInterval(interval);
                socket.disconnect();
                console.log("unmounted");
            };
        }, [token1, msg])
    );

    return (

        <Center>
            <Text style={styles.text1}>{local} {sucursal}</Text>
            <LottieView source={require('../../assets/animated-icon/shopping.json')} autoPlay={true} loop={true} style={{ height: 300 }} />

            {(msg == null || msg == "error") && (<Text style={styles.text2}>Ingresando...</Text>)}
            {(msg != null && msg != "error") && (<Text style={styles.text2}>Estas numero {msg} en la fila</Text>)}
            <TouchableOpacity style={styles.volverBtn} onPress={() => [Alert.alert(
                'Querés salir de la cola?',
                'Perderás tu lugar',
                [
                    {
                        text: 'Cancelar',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel'
                    },
                    { text: 'Salir', onPress: () => [console.log('Salir Pressed'), salirDeCola()] }
                ],
                { cancelable: false }
            )]}>
                <Center>
                    <Text style={styles.text3}>
                        <AntDesign name="close" size={24} color="white" />
                    </Text>
                </Center>
            </TouchableOpacity>

        </Center>

    )
}

const styles = StyleSheet.create({
    text1: {
        color: Colors.BLACK,
        fontFamily: "Montserrat_700Bold",
        fontSize: Typography.xl,
        marginBottom: "5%",
        bottom: "3%"
    },
    text2: {
        color: Colors.BLACK,
        fontFamily: "Poppins_600SemiBold",
        fontSize: Typography.s,
        textAlign: 'center',
        top: "5%"

    },
    volverBtn: {
        width: WINDOW_WIDTH / 5,
        height: WINDOW_WIDTH / 5,
        backgroundColor: Colors.RED_MAIN,
        borderRadius: 60,

        shadowColor: Colors.RED_MAIN,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        top: "13%"

    },
    text3: {
        color: Colors.WHITE,
        fontWeight: "600",
        fontSize: Typography.m,

    },
})