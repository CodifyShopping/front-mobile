import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import { Center } from "../../utils/Center";
import LottieView from 'lottie-react-native'
import { Colors, Typography } from "../../styles/index"

export default function FinishFila({ navigation }) {

    return (

        <Center>
            <Text style={styles.text1}>Hubo un error</Text>
            <LottieView source={require('../../assets/animated-icon/sad.json')} autoPlay={true} loop={false} style={styles.Lottie} />

            <Text style={styles.text2}>Intentá nuevamente</Text>
            <TouchableOpacity style={styles.volverBtn} onPress={() => navigation.navigate("Home")}>
                <Center>
                    <Text style={styles.text3}>Entendido</Text>
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
        marginBottom: "5%"
    },
    text2: {
        color: Colors.BLACK,
        fontFamily: "Poppins_600SemiBold",
        fontSize: Typography.s,
        marginTop: "8%",
        textAlign: 'center',


    },
    Lottie: {
        height: 250
    },
    volverBtn: {
        width: "80%",
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
        top: "10%"

    },
    text3: {
        color: Colors.WHITE,
        fontFamily: "Poppins_600SemiBold",
        fontSize: Typography.m,

    },
})