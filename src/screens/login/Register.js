import React, { useState, useEffect, useContext } from 'react';
import { View, Alert, Text, KeyboardAvoidingView, Button, TouchableWithoutFeedback, Keyboard, ImageBackground, StyleSheet, Image, Dimensions, TouchableOpacity, Component, TextInput } from 'react-native';
import { Center } from "../../utils/Center";
import axios from 'axios';
import { AuthContext } from '../../providers/AuthProvider';
import { Colors, Typography } from "../../styles/index"

export default function Register({ navigation }) {
    const { login } = useContext(AuthContext)

    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const fetchRegister = async () => {
        console.log(nombre)
        console.log(email)
        console.log(password)
        axios.post("http://54.84.31.119:3000/auth/client/register", {
            Nombre: nombre,
            email: email,
            password: password
        })
            .then(() => {
                fetchLogin(email, password)

            },

                (error) => {

                    console.log(error.response.data)
                    if (error.response.data == "\"password\" is not allowed to be empty") {
                        Alert.alert(
                            "Hay campos sin completar",
                            [

                                { text: "Entendido" }
                            ],
                            { cancelable: false }
                        )
                    }
                    if (error.response.data == "\"email\" is not allowed to be empty") {
                        Alert.alert(
                            "Hay campos sin completar",
                            [

                                { text: "Entendido" }
                            ],
                            { cancelable: false }
                        )
                    }
                    if (error.response.data == "\"Nombre\" is not allowed to be empty") {
                        Alert.alert(
                            "Hay campos sin completar",
                            [

                                { text: "Entendido" }
                            ],
                            { cancelable: false }
                        )
                    }
                    if (error.response.data == "\"email\" must be a valid email") {
                        Alert.alert(
                            "Mail invalido",
                            "Intentá con otro mail",
                            [

                                { text: "Entendido" }
                            ],
                            { cancelable: false }
                        )
                    }
                    if (error.response.data == "\"password\" length must be at least 6 characters long") {
                        Alert.alert(
                            "La contraseña debe ser mayor a 6 caracteres",
                            [

                                { text: "Entendido" }
                            ],
                            { cancelable: false }
                        )
                    }
                    if (error.response.data == "Email already exists") {
                        Alert.alert(
                            "Este mail ya esta en uso",
                            "Intentá con otro mail",
                            [

                                { text: "Entendido" }
                            ],
                            { cancelable: false }
                        )
                    }

                });
    }

    const fetchLogin = async (email, password) => {
        axios.post("http://54.84.31.119:3000/auth/client/login", {
            email: email,
            password: password
        })
            .then((response) => {
                login(response.data)
            },

                (error) => {
                    console.log(error);
                    Alert.alert(
                        "Error al registrarse",
                        "Intentá de nuevo",
                        [

                            { text: "Entendido", onPress: () => console.log("OK Pressed") }
                        ],
                        { cancelable: false }
                    )

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
                                <Image style={styles.Icon} source={require("../../assets/icons/user.png")}></Image>
                                <TextInput
                                    style={{ height: 50, left: "20%", fontSize: Typography.xs, fontFamily: "Poppins_400Regular", width: "75%" }}
                                    placeholder="Nombre completo"
                                    onChangeText={text => setNombre(text)}

                                />
                            </View>
                            <View style={styles.txtInput}>
                                <Image style={styles.Icon} source={require("../../assets/icons/mail.png")}></Image>
                                <TextInput
                                    style={{ height: 50, left: "20%", fontSize: Typography.xs, fontFamily: "Poppins_400Regular", width: "75%" }}
                                    placeholder="Email"
                                    onChangeText={text => setEmail(text)}

                                />
                            </View>
                            <View style={styles.txtInput}>
                                <Image style={styles.Icon} source={require("../../assets/icons/Lock.png")}></Image>
                                <TextInput
                                    style={{ height: 50, left: "20%", fontSize: Typography.m, fontFamily: "Poppins_400Regular", width: "75%" }}
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
        backgroundColor: Colors.WHITE,
        zIndex: 1

    },
    InsideBox1: {
        position: "relative",
        backgroundColor: Colors.RED_MAIN,
        flex: 1,



    },
    Bienvenido: {
        color: Colors.WHITE,
        fontSize: Typography.huge,
        zIndex: 2,
        fontFamily: "Montserrat_700Bold"
    },

    //cuadrados diseño
    SquareLeft: {
        position: "absolute",
        width: "30%",
        height: "70%",

        left: "-10%",
        top: "30%",

        backgroundColor: Colors.RED,
        borderRadius: 25,

    },
    SquareMid: {
        position: "absolute",
        width: "25%",
        height: "20%",

        left: "45%",
        top: "80%",

        backgroundColor: Colors.RED,
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

        backgroundColor: Colors.RED,
        borderRadius: 25,

    },

    box2: {
        flex: 7.5,
        backgroundColor: Colors.RED_MAIN


    },
    InsideBox2: {
        backgroundColor: Colors.WHITE,
        flex: 1,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        zIndex: 2
    },
    Registrarse: {
        color: Colors.BLACK,
        fontSize: Typography.xl,
        zIndex: 2,
        bottom: "9%",
        fontFamily: "Montserrat_700Bold"

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
        fontFamily: "Poppins_400Regular"

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
        backgroundColor: Colors.RED_MAIN,
        borderRadius: 18,
        top: 10,

        //shadows
        shadowColor: Colors.RED_MAIN,
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
        color: Colors.WHITE,
        fontSize: Typography.m,
        zIndex: 1,
        fontFamily: "Poppins_600SemiBold"

    },
})