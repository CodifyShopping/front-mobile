import React, { useContext, useState, useEffect } from 'react';
import { View, Alert, Text, Button, ImageBackground, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, StyleSheet, Image, Dimensions, TouchableOpacity, Component, TextInput } from 'react-native';
import { Center } from "../helpers/Center";
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';


export default function Login({ navigation }) {
    const { login } = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const fetchLogin = async () => {
        console.log(email)
        console.log(password)
        axios.post("http://35.229.106.56:3000/auth/client/login", {
            email: email,
            password: password
        })
            .then((response) => {
                console.log(response.data)
                const token = (response.data)
                login(token)
            },

                (error) => {
                    console.log(error);
                    Alert.alert(
                        "Error al iniciar sesion",
                        "Tu mail o contraseña no son correctos",
                        [

                            { text: "Entendido", onPress: () => console.log("OK Pressed") }
                        ],
                        { cancelable: false }
                    )

                });
    }



    // const loginHandle = (token) => {
    //     login(token)
    // }

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
                            <Text style={styles.Iniciar}>Iniciar sesion</Text>
                            <View style={styles.txtInput}>
                                <Image style={styles.Icon} source={require("../assets/icons/mail.png")}></Image>
                                <TextInput
                                    style={{ height: 50, left: "20%", fontSize: 20, width: "80%", fontFamily: "Poppins_400Regular" }}
                                    placeholder="Email"
                                    onChangeText={text => setEmail(text)}
                                />
                            </View>
                            <View style={styles.txtInput}>
                                <Image style={styles.Icon} source={require("../assets/icons/Lock.png")}></Image>
                                <TextInput
                                    style={{ height: 50, left: "20%", fontSize: 20, width: "80%", fontFamily: "Poppins_400Regular" }}
                                    placeholder="Contraseña"
                                    secureTextEntry={true}
                                    onChangeText={text => setPassword(text)}

                                />
                            </View>

                            <TouchableOpacity style={styles.BtnRegister} onPress={() => fetchLogin()}>
                                <Center>
                                    <Text style={styles.txtRegister}>Iniciar sesion</Text>
                                </Center>
                            </TouchableOpacity>
                            <View style={{ top: "8%" }}>
                                <Button title="No tengo cuenta, registrarme" color="grey" titleStyle={{ fontFamily: "Poppins_400Regular" }} onPress={() => { navigation.navigate("Register") }}></Button>
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
        flex: 3.5,
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
        fontSize: 44,
        zIndex: 2,
        fontFamily: "Montserrat_700Bold"
    },

    //cuadrados diseño
    SquareLeft: {
        position: "absolute",
        width: "30%",
        height: "50%",

        left: "-10%",
        top: "30%",

        backgroundColor: "#FF313B",
        borderRadius: 25,
        zIndex: 1
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
        zIndex: 1
    },

    box2: {
        flex: 6.5,
        backgroundColor: '#FF464F',
        zIndex: 0,


    },
    InsideBox2: {
        backgroundColor: "white",
        flex: 1,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    Iniciar: {
        color: "black",
        fontSize: 36,
        zIndex: 2,
        bottom: "10.8%",
        fontFamily: "Montserrat_700Bold"

    },
    txtInput: {
        width: "85%",
        height: 62,
        borderColor: "#FF464F",
        borderWidth: 3,
        borderRadius: 14,
        top: 10,
        justifyContent: "center",
        marginBottom: "7%",
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
        fontSize: 24,
        zIndex: 1,
        fontFamily: "Poppins_600SemiBold"

    },
})