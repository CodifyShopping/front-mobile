import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Center } from "../utils/Center";
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { AuthContext } from "../providers/AuthProvider";
import { Colors } from "../styles/index"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AntDesign } from '@expo/vector-icons';
//import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';




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



export default function Home({ navigation }) {
    const { logout } = useContext(AuthContext);

    //const [LOCAL, setLocal] = useState([]);

    // const fetchLocales = async () => {
    //     axios.get("http://35.229.106.56:3000/returnLocal", { headers: { token: "eyJhbGciOiJIUzI1NiJ9.VW5pcWxv.jeajO8sVCR0886knodmQtHRGbki4W1D1oCrb-yZQ7As" } })
    //         .then((response) => {
    //             //console.log(response.data)
    //             setLocal(response.data)
    //             console.log(LOCAL)

    //         })
    // }

    // useEffect(() => {
    //     fetchLocales()
    // }, []);

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
                    <TouchableOpacity style={{ left: "87.5%", top: "25%", zIndex: 2 }} onPress={() => logout()}>
                        <AntDesign name="logout" size={24} color="white" />
                        {/* <MaterialCommunityIcons
                            name="logout"
                            size={25}
                            color="#fff"
                        /> */}
                    </TouchableOpacity>
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

                        <TouchableOpacity style={styles.Escanear} onPress={() => [navigation.navigate("Qr")]}>
                            <Image style={styles.Icon} source={require("../assets/icons/scanIcon.png")}>
                            </Image>
                            <Text style={styles.textEscanear}>Ver producto</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.Fila} onPress={() => [navigation.navigate("QrFila")]}>
                            <Image style={styles.Icon} source={require("../assets/icons/cola.png")}>
                            </Image>
                            <Text style={styles.textFila}>Fila virtual</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.WishList} onPress={() => navigation.navigate("WishList")}>
                            <Image style={styles.Icon} source={require("../assets/icons/star.png")}></Image>
                            <Text style={styles.textWishlist} >Mi wish list</Text>
                        </TouchableOpacity>

                    </Center>

                    {/* BOTON PARA LOG OUT*/}
                    {/*<Button title="logout" onPress={() => logout()} />*/}



                    {/* SCROLL DE LOCALES CON CODIFY */}
                    {/* <View style={styles.InsideBox22}>
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
                    </View> */}

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
        backgroundColor: Colors.WHITE,

    },
    InsideBox1: {
        position: "relative",
        backgroundColor: Colors.RED_MAIN,
        flex: 1,
        borderBottomRightRadius: 40,
    },
    Codify: {
        color: Colors.WHITE,
        fontSize: 46,
        zIndex: 2,
        position: "absolute",
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
        zIndex: 1
    },
    SquareMid: {
        position: "absolute",
        width: "25%",
        height: "40%",

        left: "45%",
        top: "80%",

        backgroundColor: Colors.RED,
        borderRadius: 25,
        zIndex: 1
    },
    SquareRight: {
        position: "absolute",
        width: "43%",
        height: "70%",

        right: "-10%",
        top: "-15%",

        backgroundColor: Colors.RED,
        borderRadius: 25,
        zIndex: 1
    },


    //content
    box2: {
        flex: 7.75,
        backgroundColor: Colors.RED_MAIN,
        zIndex: 0,


    },
    InsideBox2: {
        backgroundColor: Colors.WHITE,
        flex: 1,
        borderTopLeftRadius: 60
    },
    InsideBox22: {
        backgroundColor: Colors.BLACK,
        flex: 0.6,

    },
    Bienvenido: {
        color: Colors.BLACK,
        fontWeight: "700",
        fontSize: 32,
        zIndex: 1,
        position: "absolute",
        top: "7%",
        left: "10%",
        fontFamily: "Montserrat_600SemiBold"
    },
    Escanear: {
        width: "81%",
        height: 120,
        backgroundColor: Colors.RED,
        borderRadius: 24,
        flexDirection: "row",
        alignItems: "center",

        marginTop: "8%",

        //shadows
        shadowColor: Colors.RED,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

    },
    textEscanear: {
        color: Colors.WHITE,
        fontSize: 24,
        zIndex: 1,
        fontFamily: "Poppins_600SemiBold",
        marginLeft: "8%",


    },
    Fila: {
        width: "81%",
        height: 120,
        backgroundColor: Colors.RED_MAIN,
        borderRadius: 24,
        //top: 25,
        flexDirection: "row",
        alignItems: "center",
        marginTop: "8%",

        //shadows
        shadowColor: Colors.RED_MAIN,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

    },
    textFila: {
        color: Colors.WHITE,
        fontSize: 24,
        zIndex: 1,
        fontFamily: "Poppins_600SemiBold",
        marginLeft: "8%",

    },

    Icon: {
        width: 35,
        height: 35,
        marginLeft: "8%",
    },

    WishList: {
        width: "81%",
        height: 100,
        backgroundColor: Colors.YELLOW,
        borderRadius: 24,
        //top: 40,
        flexDirection: "row",
        alignItems: "center",
        marginTop: "8%",


        //shadows
        shadowColor: Colors.YELLOW,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,


    },
    textWishlist: {
        color: Colors.WHITE,
        fontSize: 24,
        zIndex: 1,
        fontFamily: "Poppins_600SemiBold",
        marginLeft: "8%",

    },
    Comercios: {
        color: Colors.BLACK,
        fontWeight: "700",
        fontSize: 34,
        zIndex: 1,
        position: "absolute",
        left: "10%",
        top: 0
    },
    item: {
        top: 70,
        backgroundColor: Colors.RED_MAIN,
        marginHorizontal: 10,
        width: 90,
        height: 90,
        borderRadius: 24,

        shadowColor: Colors.RED_MAIN,
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
        color: Colors.WHITE
    },

});