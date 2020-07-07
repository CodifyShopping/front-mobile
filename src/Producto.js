import React from 'react';
import { View, Text, Button, ImageBackground, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import Lightbox from 'react-native-lightbox';
import { AntDesign } from '@expo/vector-icons';

import { Center } from "./Center";

const WINDOW_WIDTH = Dimensions.get('window').width;

//NO SE USA POR AHORA. SE USA VIEWS

export default function Producto({ navigation }) {

    return (
        <Center>
            {/* <View style={(styles.viewFoto)}>
                <ImageBackground style={(styles.imagen)} imageStyle={{ borderRadius: 10 }} source={require("./assets/img/remera-azul.jpg")}></ImageBackground>
            </View> */}

            <TouchableOpacity style={styles.addWish} onPress={() => navigation.navigate("WishList")} >
                <Text style={styles.textAddWish}>Agregar a wishlist</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonVolver} onPress={() => { navigation.navigate("Qr") }}>
                <AntDesign name="left" size={32} color="white" />
            </TouchableOpacity>


            <Lightbox springConfig={{ tension: 100, friction: 8 }} style={{ bottom: "7%" }} underlayColor="white" >
                <Image
                    style={styles.square}
                    resizeMode="contain"
                    source={require("./assets/img/shoe3.jpg")}
                />
            </Lightbox>

            <Text style={styles.producto}>Remera azul</Text>
            <Text style={styles.descripcion}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</Text>

            <TouchableOpacity style={styles.boton1} onPress={() => navigation.navigate("Views")} >
                <Text style={styles.text2}>Volver a escanear</Text>
            </TouchableOpacity>

        </Center>

    )

}

const styles = StyleSheet.create({
    producto: {
        color: "black",
        fontWeight: "600",
        fontSize: 32,


    },
    descripcion: {
        color: "black",
        fontWeight: "400",
        fontSize: 16,
        marginLeft: "5%",
        marginRight: "5%",

    },
    imagen: {
        width: "100%",
        height: "100%",
        zIndex: 1,


    },
    square: {
        width: WINDOW_WIDTH / 1.25,
        height: WINDOW_WIDTH / 1.25,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        //bottom: "20%"

    },
    text2: {
        color: "black",
        fontWeight: "600",
        fontSize: 18
    },
    boton1: {
        zIndex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "70%",
        height: "6,5%",
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 1, height: 0 },
        shadowRadius: 5,
        borderRadius: 30,
        backgroundColor: '#ffffff',
        position: 'absolute',
        bottom: "8%"
    },
    addWish: {
        zIndex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
        height: "5%",
        position: 'absolute',
        top: "8%",
        right: "10%",
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 1, height: 0 },
        shadowRadius: 5,
        borderRadius: 30,
        backgroundColor: '#ffffff',
    },
    botonVolver: {
        position: 'absolute',
        zIndex: 1,
        top: "8%",
        left: "3%"
    },
    textAddWish: {
        color: "grey",
        fontWeight: "500",
        fontSize: 16
    }


});