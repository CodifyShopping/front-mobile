import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { Center } from "../../utils/Center";
import { Colors } from "../../styles/index"
import io from 'socket.io-client';

export default function PreFila({ navigation, route }) {

    const { local } = route.params;
    const { sucursal } = route.params;

    const [token1, setToken] = useState(null);

    const handleToken = async () => {
        await AsyncStorage.getItem('token', (err, result) => {
            const pre = result
            const sliced = pre.slice("10", pre.length - 2)
            setToken(sliced)
        })
    }

    const socketEnterLine = async () => {
        handleToken()
        const data = { token: token1, local: local, Sucursal: sucursal }
        const socket = io("http://54.84.31.119:3000");
        socket.emit("enterLine", data);
        socket.on("enterLine", msg => {
            console.log("Entré a cola")
        })
    };

    useEffect(() => {
        handleToken()
    }, [token1])

    return (


        <Center style={styles.container}>

            <Text style={styles.text1}>{local} {sucursal}</Text>
            <Text numberOfLines={2} ellipsizeMode={'head'} style={styles.text2}>Ingresa a la cola virtual y seguí probando</Text>
            <View style={styles.cuadrado}>
                <Image style={styles.image} source={require("../../assets/img/3.png")}></Image>
            </View>
            <TouchableOpacity style={styles.volverBtn} onPress={() => [socketEnterLine(), navigation.navigate("WaitFila", { local: local, sucursal: sucursal })]}>
                <Center>
                    <Text style={styles.text3}>Ingresar en cola</Text>
                </Center>
            </TouchableOpacity>

        </Center>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white"
    },
    text1: {
        color: Colors.BLACK,
        fontFamily: "Montserrat_700Bold",
        fontSize: Typography.xl,
    },
    text2: {
        color: Colors.BLACK,
        fontFamily: "Poppins_400Regular",
        fontSize: Typography.s,
        textAlign: 'center',
        marginTop: "5%",
        marginBottom: "10%",
        marginLeft: "5%",
        marginRight: "5%"

    },
    image: {
        resizeMode: "contain", flex: 1, width: "80%"
    },
    volverBtn: {
        width: "70%",
        height: 80,
        backgroundColor: Colors.RED_MAIN,
        borderRadius: 20,

        shadowColor: Colors.RED_MAIN,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        marginTop: "30%"


    },
    text3: {
        color: Colors.WHITE,
        fontFamily: "Poppins_600SemiBold",
        fontSize: Typography.s,

    },
    cuadrado: {
        height: "30%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "8%",

    }
})