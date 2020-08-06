import React, { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, Button, TouchableWithoutFeedback, Keyboard, ImageBackground, StyleSheet, Image, Dimensions, TouchableOpacity, Component, TextInput } from 'react-native';
import { Center } from "./helpers/Center";
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';

export default function Register({ navigation }) {
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const fetchRegister = async () => {
        console.log(email)
        console.log(password)
        axios.post("http://35.229.106.56:3000/auth/client/register", {
            email: email,
            password: password
        })
            .then(() => {
                navigation.navigate("Login")

            },

                (error) => {
                    console.log(error);

                });
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
        }}>

            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={styles.container}
            >

                <View style={styles.box1}>
                    <View style={styles.InsideBox1}>
                        <Center>
                            <View style={styles.SquareLeft}></View>
                            <View style={styles.SquareMid}></View>
                            <View style={styles.SquareRight}></View>
                            <Text style={styles.Bienvenido}>Bienvenido</Text>
                        </Center>
                    </View>
                </View>

                <View style={styles.box2}>
                    <View style={styles.InsideBox2}>
                        <Center>
                            <Text style={styles.Registrarse}>Registrarse</Text>
                            <View style={styles.txtInput}>
                                <Image style={styles.Icon} source={require("./assets/icons/user.png")}></Image>
                                <TextInput
                                    style={{ height: 50, left: "20%", fontSize: 20 }}
                                    placeholder="Nombre"
                                    onChangeText={text => setEmail(text)}

                                />
                            </View>
                            <View style={styles.txtInput}>
                                <Image style={styles.Icon} source={require("./assets/icons/mail.png")}></Image>
                                <TextInput
                                    style={{ height: 50, left: "20%", fontSize: 20 }}
                                    placeholder="Email"
                                    onChangeText={text => setEmail(text)}

                                />
                            </View>
                            <View style={styles.txtInput}>
                                <Image style={styles.Icon} source={require("./assets/icons/Lock.png")}></Image>
                                <TextInput
                                    style={{ height: 50, left: "20%", fontSize: 20 }}
                                    placeholder="Contraseña"
                                    secureTextEntry={true}
                                    onChangeText={text => setPassword(text)}

                                />
                            </View>
                            <TouchableOpacity style={styles.BtnRegister} onPress={() => fetchRegister()}>
                                <Center>
                                    <Text style={styles.txtRegister}>Registrarse</Text>
                                </Center>
                            </TouchableOpacity>
                            <View style={{ top: "8%" }}>
                                <Button title="Ya tengo cuenta" color="grey" onPress={() => { navigation.navigate("Login") }}></Button>
                            </View>
                        </Center>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    box1: {
        flex: 2.5,
        backgroundColor: 'white',
        zIndex: 1

    },
    InsideBox1: {
        position: "relative",
        backgroundColor: "#FF464F",
        flex: 1,



    },
    Bienvenido: {
        color: "white",
        fontWeight: "600",
        fontSize: 46,
        zIndex: 2,

    },

    //cuadrados diseño
    SquareLeft: {
        position: "absolute",
        width: "30%",
        height: "70%",

        left: "-10%",
        top: "30%",

        backgroundColor: "#FF313B",
        borderRadius: 25,

    },
    SquareMid: {
        position: "absolute",
        width: "25%",
        height: "20%",

        left: "45%",
        top: "80%",

        backgroundColor: "#FF313B",
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
        zIndex: -1
    },
    SquareRight: {
        position: "absolute",
        width: "43%",
        height: "70%",

        right: "-10%",
        top: "-15%",

        backgroundColor: "#FF313B",
        borderRadius: 25,

    },

    box2: {
        flex: 7.5,
        backgroundColor: '#FF464F'


    },
    InsideBox2: {
        backgroundColor: "white",
        flex: 1,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        zIndex: 2
    },
    Registrarse: {
        color: "black",
        fontWeight: "700",
        fontSize: 40,
        zIndex: 2,
        bottom: "9%"

    },
    txtInput: {
        width: "85%",
        height: 60,
        borderColor: "#FF464F",
        borderWidth: 3,
        borderRadius: 14,
        top: 10,
        justifyContent: "center",
        // marginBottom: "5%",
        marginBottom: "6%",


    },
    Icon: {
        width: 25,
        height: 25,
        position: "absolute",
        left: "5%"

    },
    BtnRegister: {
        width: "85%",
        height: 80,
        backgroundColor: "#FF464F",
        borderRadius: 18,
        top: 10,

        //shadows
        shadowColor: "#FF464F",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
        top: "5%"
    },
    txtRegister: {
        color: "white",
        fontWeight: "600",
        fontSize: 24,
        zIndex: 1,

    },
})