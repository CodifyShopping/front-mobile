import React from 'react';
import { View, Text, Button, ImageBackground, StyleSheet, Image, Dimensions, TouchableOpacity, Component } from 'react-native';
import { Center } from "./Center";
import LottieView from 'lottie-react-native'

export default function Done({ navigation }) {
    return (

        <Center>

            <LottieView source={require('./assets/animated-icon/done.json')} autoPlay={true} loop={false} style={{ height: 300 }} />
            <Text style={styles.producto}>Producto solicitado</Text>
            <Text style={styles.text2}>Dentro de poco te lo estaran trayendo</Text>
            <TouchableOpacity style={styles.volverBtn} onPress={() => navigation.navigate("Hola")}>
                <Center>
                    <Text style={styles.text3}>Volver a Home</Text>
                </Center>
            </TouchableOpacity>

        </Center>

    )
}

const styles = StyleSheet.create({
    producto: {
        color: "black",
        fontWeight: "600",
        fontSize: 30,
    },
    text2: {
        color: "black",
        fontWeight: "400",
        fontSize: 20,

    },
    volverBtn: {
        width: "60%",
        height: 80,
        backgroundColor: "#FF464F",
        borderRadius: 24,

        shadowColor: "#FF464F",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
        top: "16%",

    },
    text3: {
        color: "white",
        fontWeight: "600",
        fontSize: 20,

    },
})