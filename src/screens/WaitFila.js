import React, { useEffect, useState } from 'react';
import { View, Text, Button, ImageBackground, StyleSheet, Image, Dimensions, TouchableOpacity, Component, Alert, AsyncStorage } from 'react-native';
import { Center } from "../helpers/Center";
import LottieView from 'lottie-react-native'
import io from 'socket.io-client';


const WINDOW_WIDTH = Dimensions.get('window').width;

export default function WaitFila({ navigation, route }) {

    const { local } = route.params;

    const [token1, setToken] = useState(null);
    const [msg, setMsg] = useState(null);

    const handleToken = async () => {
        await AsyncStorage.getItem('token', (err, result) => {
            const pre = result
            const sliced = pre.slice("10", pre.length - 2)
            setToken(sliced)
        })

    }

    const socketFunc = async () => {
        const data = { token: token1, local: local }
        const socket = io("http://35.229.106.56:3000");
        socket.emit("viewlineCli", data);
        socket.on("viewlineCli", msg => {

            if (msg == 0) {
                navigation.navigate("FinishFila")

            }
            if (msg == -1) {
                navigation.navigate("Hola")

            }
            if (msg == -2) {
                navigation.navigate("ErrorFila")

            }
            setMsg(msg)
        })
    };


    const salirDeCola = async () => {
        const data = { token: token1, local: local }
        const socket = io("http://35.229.106.56:3000");
        socket.emit("disconnectedCli", data)
        socket.on("disconnectedCli", msg => {
        })
    };

    useEffect(() => {
        const ac = new AbortController();
        handleToken()
        const interval = setInterval(() => {
            socketFunc()
        }, 1000);
        return () => { clearInterval(interval), ac.abort() };

    }, [token1, msg])





    return (

        <Center>
            <Text style={styles.text1}>{local}</Text>
            <LottieView source={require('../assets/animated-icon/shopping.json')} autoPlay={true} loop={true} style={{ height: 300 }} />

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
                    { text: 'Salir', onPress: () => [console.log('Salir Pressed'), navigation.navigate("Hola")] }
                ],
                { cancelable: false }
            ), salirDeCola(),]}>
                <Center>
                    <Text style={styles.text3}>X</Text>
                </Center>
            </TouchableOpacity>

        </Center>

    )
}

const styles = StyleSheet.create({
    text1: {
        color: "black",
        fontFamily: "Montserrat_700Bold",
        fontSize: 34,
        marginBottom: "5%",
        bottom: "3%"
    },
    text2: {
        color: "black",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 22,
        textAlign: 'center',
        top: "5%"

    },
    volverBtn: {
        width: WINDOW_WIDTH / 5,
        height: WINDOW_WIDTH / 5,
        backgroundColor: "#FF464F",
        borderRadius: 60,

        shadowColor: "#FF464F",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        top: "13%"

    },
    text3: {
        color: "white",
        fontWeight: "600",
        fontSize: 24,

    },
})