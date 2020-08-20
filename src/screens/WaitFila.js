import React, { useEffect } from 'react';
import { View, Text, Button, ImageBackground, StyleSheet, Image, Dimensions, TouchableOpacity, Component, Alert } from 'react-native';
import { Center } from "../helpers/Center";
import LottieView from 'lottie-react-native'


const WINDOW_WIDTH = Dimensions.get('window').width;

export default function WaitFila({ navigation }) {

    useEffect(() => {
        let timer = setInterval(() => navigation.navigate("FinishFila"), 5000);

        return () => clearInterval(timer)

    }, [])

    return (

        <Center>
            <Text style={styles.text1}>Zara Alcorta</Text>
            <LottieView source={require('../assets/animated-icon/shopping.json')} autoPlay={true} loop={true} style={{ height: 300 }} />

            <Text style={styles.text2}>15 minutos restantes...</Text>
            <TouchableOpacity style={styles.volverBtn} onPress={() => Alert.alert(
                'Queres alir de la cola?',
                'Perderas tu lugar',
                [
                    {
                        text: 'Cancelar',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel'
                    },
                    { text: 'Salir', onPress: () => [console.log('Salir Pressed'), navigation.navigate("Hola")] }
                ],
                { cancelable: false }
            )}>
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