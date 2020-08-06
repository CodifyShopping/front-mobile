import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import Lightbox from 'react-native-lightbox';
import { AntDesign } from '@expo/vector-icons';

import { Center } from "./helpers/Center";

const WINDOW_WIDTH = Dimensions.get('window').width;

//NO SE USA POR AHORA. SE USA VIEWS
const DATA = [
    //     {

    //         "id": "s",
    //         cantidad: "0",
    //         "talle": 'S',
    //     },
    //     {
    //         id: "m",
    //         cantidad: '2',
    //         "talle": 'M',
    //     },
    //     {
    //         id: 3,
    //         cantidad: '2',
    //         talle: 'L',
    //     },
    //     {
    //         id: 4,
    //         cantidad: '4',
    //         talle: 'XL',
    //     },
    //     {
    //         id: 5,
    //         cantidad: '5',
    //         talle: 'XXL',
    //     },
];

const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        <Center>
            <Text style={styles.title}>{item.talle}</Text>
        </Center>
    </TouchableOpacity>
);


export default function Producto({ route, navigation }) {
    const [selectedId, setSelectedId] = useState(null);

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? '#FFA7AB' : 'white';
        const borderColor = item.id === selectedId ? '#FF464F' : 'gray';

        if (item.cantidad > 0) {
            return (
                <Item
                    item={item}
                    onPress={() => [setSelectedId(item.id)]}
                    style={{ backgroundColor, borderColor }}
                />)
        }
        else if (item.cantidad <= 0) {
            return (
                <Item
                    item={item}
                    style={{ backgroundColor: "grey" }}

                />)
        }
    };


    const { talle } = route.params;


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

            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
                horizontal
            />

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
    },
    item: {
        backgroundColor: 'white',
        borderColor: "grey",
        borderWidth: 3,
        marginHorizontal: 10,
        width: WINDOW_WIDTH / 7,
        height: WINDOW_WIDTH / 7,
        borderRadius: 60,
        top: "240%"
    },
    title: {
        fontSize: 20,
    },


});