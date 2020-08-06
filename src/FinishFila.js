import React, { useEffect } from 'react';
import { View, Text, Button, ImageBackground, StyleSheet, Image, Dimensions, TouchableOpacity, Component, Alert } from 'react-native';
import { Center } from "./helpers/Center";
import LottieView from 'lottie-react-native'

export default function FinishFila({ navigation }) {

    return (

        <Center>
            <Text style={styles.producto}>Es tu turno!</Text>
            <LottieView source={require('./assets/animated-icon/done.json')} autoPlay={true} loop={false} style={{ height: 300 }} />

            <Text style={styles.text2}>Acercate a la caja y pagá</Text>
            <TouchableOpacity style={styles.volverBtn} onPress={() => navigation.navigate("Hola")}>
                <Center>
                    <Text style={styles.text3}>Listo</Text>
                </Center>
            </TouchableOpacity>

        </Center>

    )
}

const styles = StyleSheet.create({
    producto: {
        color: "black",
        fontWeight: "800",
        fontSize: 34,
        marginBottom: "5%"
    },
    text2: {
        color: "black",
        fontWeight: "600",
        fontSize: 22,
        marginTop: "8%",
        textAlign: 'center',


    },
    volverBtn: {
        width: "80%",
        height: 80,
        backgroundColor: "#FF464F",
        borderRadius: 20,

        shadowColor: "#FF464F",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        top: "10%"

    },
    text3: {
        color: "white",
        fontWeight: "600",
        fontSize: 24,

    },
})