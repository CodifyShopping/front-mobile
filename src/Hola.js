import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Center } from "./Center";
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';




// const DATA = [
//     {
//         id: '1',
//         local: 'Nike',
//     },
//     {
//         id: '2',
//         local: 'Adidas',
//     },
//     {
//         id: '3',
//         local: 'Zara',
//     },
//     {
//         id: '4',
//         local: 'Easy',
//     },

// ];



export default function Hola({ navigation }) {

    const [LOCAL, setLocal] = useState([]);

    fetchLocales = async () => {
        axios.get("http://35.229.106.56:3000/returnLocal", { headers: { token: "eyJhbGciOiJIUzI1NiJ9.VW5pcWxv.jeajO8sVCR0886knodmQtHRGbki4W1D1oCrb-yZQ7As" } })
            .then((response) => {
                //console.log(response.data)
                setLocal(response.data)
                console.log(LOCAL)

            })
    }

    useEffect(() => {
        fetchLocales()
    }, []);

    function Item({ NombreLocal }) {

        return (
            <View style={styles.item}>
                <Center>
                    <Text style={styles.title}>{NombreLocal.toUpperCase()}</Text>
                </Center>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.box1}>
                <View style={styles.InsideBox1}>
                    <Center>
                        <View style={styles.SquareLeft}></View>
                        <View style={styles.SquareMid}></View>
                        <View style={styles.SquareRight}></View>
                        <Text style={styles.Codify}>Codify</Text>
                    </Center>
                </View>

            </View>

            <View style={styles.box2}>

                <View style={styles.InsideBox2}>
                    <Center>
                        <Text style={styles.Bienvenido}>Comprar</Text>
                        {/* <Text style={styles.text2}>Listo para comprar?</Text> */}

                        <TouchableOpacity style={styles.Escanear} onPress={() => [navigation.navigate("Qr")]}>
                            <Center>
                                <Text style={styles.textEscanear}>Escanear QR</Text>
                                <Image style={styles.Icon} source={require("./assets/icons/scanIcon.png")}>
                                </Image>
                            </Center>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.WishList} onPress={() => navigation.navigate("WishList")}>
                            <Center>
                                <Text style={styles.textWishlist} >Mi wish list</Text>
                                <Image style={styles.Icon} source={require("./assets/icons/star.png")}></Image>
                            </Center>
                        </TouchableOpacity>

                    </Center>

                    <View style={styles.InsideBox22}>
                        <Center>
                            <Text style={styles.Comercios}>Comercios</Text>
                            <FlatList
                                data={LOCAL}
                                renderItem={({ item }) => <Item NombreLocal={item.NombreLocal} />}
                                keyExtractor={item => item._id}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingLeft: 30, paddingRight: 30, }}
                            />
                        </Center>
                    </View>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },

    box1: {
        flex: 2.25,
        backgroundColor: 'white',

    },
    InsideBox1: {
        position: "relative",
        backgroundColor: "#FF464F",
        flex: 1,
        borderBottomRightRadius: 40,



    },
    Codify: {
        color: "white",
        fontWeight: "600",
        fontSize: 52,
        zIndex: 2,
        position: "absolute"
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
        zIndex: 1
    },
    SquareMid: {
        position: "absolute",
        width: "25%",
        height: "40%",

        left: "45%",
        top: "80%",

        backgroundColor: "#FF313B",
        borderRadius: 25,
        zIndex: 1
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


    //content
    box2: {
        flex: 7.75,
        backgroundColor: '#FF464F',
        zIndex: 0,


    },
    InsideBox2: {
        backgroundColor: "white",
        flex: 1,
        borderTopLeftRadius: 60
    },
    InsideBox22: {
        backgroundColor: "white",
        flex: 0.6,

    },
    Bienvenido: {
        color: "black",
        fontWeight: "700",
        fontSize: 38,
        zIndex: 1,
        position: "absolute",

        top: "7%",
        left: "10%"
    },
    text2: {
        color: "#BFBFBF",
        fontWeight: "400",
        fontSize: 24,
        zIndex: 1,
        position: "absolute",

        top: "20%",
        left: "10%"

    },
    Escanear: {
        width: "81%",
        height: 120,
        backgroundColor: "#FF464F",
        borderRadius: 24,
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
    },
    textEscanear: {
        color: "white",
        fontWeight: "600",
        fontSize: 24,
        zIndex: 1,

    },

    Icon: {
        width: 35,
        height: 35,
        position: "absolute",
        left: 30,
    },

    WishList: {
        width: "81%",
        height: 100,
        backgroundColor: "#FFC542",
        borderRadius: 24,
        top: 40,
        //shadows
        shadowColor: "#FFC542",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,

    },
    textWishlist: {
        color: "white",
        fontWeight: "600",
        fontSize: 24,
        zIndex: 1,

    },
    Comercios: {
        color: "black",
        fontWeight: "700",
        fontSize: 38,
        zIndex: 1,
        position: "absolute",
        left: "10%",
        top: 0
    },
    item: {
        top: 70,
        backgroundColor: '#FF464F',
        marginHorizontal: 10,
        width: 90,
        height: 90,
        borderRadius: 24,

        shadowColor: "#FF464F",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,

    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "white"
    },






});
