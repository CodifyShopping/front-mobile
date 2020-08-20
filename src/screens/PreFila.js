import React from 'react';
import { View, Text, Button, ImageBackground, StyleSheet, Image, Dimensions, TouchableOpacity, Component } from 'react-native';
import { Center } from "../helpers/Center";

export default function PreFila({ navigation }) {

    return (

        <Center style={{ backgroundColor: "white" }}>

            <Text style={styles.text1}>Zara Alcorta</Text>
            <Text numberOfLines={2} ellipsizeMode={'head'} style={styles.text2}>Ingresa a la cola virtual y seguí probando</Text>
            <View style={styles.cuadrado}>
                <Image style={{ resizeMode: "contain", flex: 1, width: "80%" }} source={require("../assets/img/3.png")}></Image>
            </View>
            <TouchableOpacity style={styles.volverBtn} onPress={() => navigation.navigate("WaitFila")}>
                <Center>
                    <Text style={styles.text3}>Ingresar en cola</Text>
                </Center>
            </TouchableOpacity>

        </Center>

    )
}

const styles = StyleSheet.create({
    text1: {
        color: "black",
        fontFamily: "Montserrat_700Bold",
        fontSize: 32,
    },
    text2: {
        color: "black",
        fontFamily: "Poppins_400Regular",
        fontSize: 22,
        textAlign: 'center',
        marginTop: "5%",
        marginBottom: "10%",
        marginLeft: "5%",
        marginRight: "5%"

    },
    volverBtn: {
        width: "70%",
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

        marginTop: "30%"


    },
    text3: {
        color: "white",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 22,


    },
    cuadrado: {
        height: "30%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "8%",

    }
})