import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Button, StyleSheet, Image, Dimensions, TouchableOpacity, Share, Component, AsyncStorage } from 'react-native';
import { Center } from "../../utils/Center";
import { AntDesign } from '@expo/vector-icons';
import Lightbox from 'react-native-lightbox';
import { FlatList } from 'react-native-gesture-handler';
// import { color } from 'react-native-reanimated';
import axios from 'axios';
import LottieView from 'lottie-react-native'
//import { Constants } from 'expo-barcode-scanner';
import { Colors } from "../../styles/index"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';

const DATA = [
    "Belgrano", "Abasto", "Solar"
];


const WINDOW_WIDTH = Dimensions.get('window').width;

console.disableYellowBox = true;



export default function ProductoWish({ route, navigation }) {
    const [selectedId, setSelectedId] = useState(null);
    const [token1, setToken] = useState(null);
    const [DATA, setDATA] = useState(null);


    const Item = ({ item, onPress }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item]}>
            <View style={{ justifyContent: "center", alignContent: "center", textAlign: 'center' }}>
                <View style={{ flexDirection: "row", marginTop: "8%" }}>

                    <Image style={{ resizeMode: "contain", width: "20%", height: "100%", marginLeft: "8%" }} source={require("../../assets/icons/shop.png")}></Image>

                    <View>
                        <Text style={styles.talle}>{local}{"\n"}{item}</Text>
                    </View>
                </View>
            </View>

        </TouchableOpacity>
    );

    const renderItem = ({ item }) => {

        return (
            <Item
                item={item}
                onPress={() => verStock(item)}
            />)

    };

    useEffect(() => {
        handleToken()
        verSuc()
    }, [token1])

    const handleToken = async () => {
        await AsyncStorage.getItem('token', (err, result) => {
            const pre = result
            const sliced = pre.slice("10", pre.length - 2)
            console.log(sliced)
            setToken(sliced)
        })

    }

    const deleteWsihlist = async () => {
        console.log(id)
        await handleToken()
        axios.post('http://54.84.31.119:3000/wishlist/delete',
            {
                //I mayus
                ProductId: id
            },
            {
                headers: { token: token1 }

            })

            .then(() => {

                navigation.navigate("WishList")


            },

                (error) => {
                    console.log(error);
                    Alert.alert(
                        "Error al eliminar el producto",
                        "Intentá de nuevo",
                        [
                            {
                                text: "Ok",
                            }
                        ],
                        { cancelable: false }
                    )
                });

    }

    const verSuc = async () => {
        axios.post("http://54.84.31.119:3000/returnProdSuc/Sucursal",
            {
                NombreLocal: local
            }, {
            headers: { token: token1 }
        }
        ).then((response) => {

            setDATA(response.data)


        },

            (error) => {
                console.log(error);
            });
    }

    const verStock = async (data) => {
        console.log(data)
        axios.post('http://54.84.31.119:3000/returnProdCli',
            {
                id: id,
                Sucursal: data
            })

            .then(response => {

                console.log(response.data.Stock)
                navigation.navigate("TallesSuc", { local: local, sucursal: data, talle: response.data.Stock })

            },

                (error) => {
                    console.log(error);
                    Alert.alert(
                        "No hay stock en esta sucursal",
                        "Intentá en otro local",
                        [
                            {
                                text: "Ok",
                            }
                        ],
                        { cancelable: false }
                    )
                });
    }


    const { nombre } = route.params;
    const { precio } = route.params;
    const { descuento } = route.params;
    const { photo } = route.params;
    const { id } = route.params;
    const { local } = route.params;
    const desc = 100 * (1 - (descuento / precio))
    const descResult = Math.floor(desc)

    return (

        <View style={styles.container}>
            <View style={styles.box1}>

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}>
                    <View style={{ flex: 0.5, marginTop: "10%" }}>
                        <TouchableOpacity style={styles.botonVolver} onPress={() => navigation.goBack()}>
                            <AntDesign name="left" size={32} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 2, marginTop: "10%", justifyContent: "center" }}>

                        <Text style={{
                            fontSize: Typography.s, fontFamily: "Montserrat_600SemiBold", alignSelf: "center"
                        }}>{local}</Text>

                    </View>
                    <View style={{ flex: 0.5, marginTop: "10%" }}>

                        <TouchableOpacity onPress={() => [(Alert.alert(
                            "Borrar este producto de tu wishlist?",
                            "Este producto ya no se encontrará en tu wishlist",
                            [
                                {
                                    text: "Cancelar",
                                    onPress: () => console.log("Cancel Pressed"),
                                    style: "cancel"
                                },
                                { text: "Borrar", onPress: () => deleteWsihlist() }
                            ],
                            { cancelable: false }
                        ))]} >
                            <MaterialCommunityIcons
                                name="trash-can-outline"
                                size={32}
                                color="red"
                            />
                        </TouchableOpacity>


                    </View>
                </View>
            </View>
            <View style={styles.box2}>

                <Lightbox springConfig={{ tension: 100, friction: 8 }}
                    style={styles.lightbox}
                    underlayColor="white" >
                    <Image
                        style={styles.square}

                        source={{ uri: `data:image/gif;base64,${photo}` }}
                    />
                </Lightbox>



            </View>
            <View style={styles.box3}>

                <Text style={styles.producto}>{nombre}</Text>

                {(descuento != 0) ? <Text style={styles.price}>
                    <Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', textDecorationColor: "grey", color: "grey", fontSize: Typography.s, fontFamily: "Poppins_400Regular" }}>${JSON.stringify(precio)}</Text>
                    <Text style={{ color: "#FF575F", fontSize: Typography.xl, lineHeight: 35 }}>{"\n"}${descuento}</Text>
                    <Text style={{ color: "black", fontSize: Typography.s }}>  {descResult}% OFF</Text>

                </Text>
                    :
                    <Text style={styles.priceSinDesc}>${JSON.stringify(precio)}</Text>
                }
                <Text style={styles.talles}>Sucursales</Text>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={(item) => item}
                    extraData={selectedId}
                    horizontal
                    contentContainerStyle={{ paddingLeft: 10, paddingRight: 10 }}
                    showsHorizontalScrollIndicator={false}
                />

            </View>
            <View style={styles.box4}>


                <Center>

                    <TouchableOpacity style={styles.eliminar} onPress={() => {
                        Share.share({
                            url: `data:image/jpeg;base64,${photo}`, // use image/jpeg instead of image/jpg
                            message: `Mirá el producto de ${local} que tengo en mi wishlist de Codify!`,
                            media: "twitter"
                        });
                    }}>
                        <Center>
                            <Text style={styles.textProbar}>Compartir</Text>
                        </Center>
                    </TouchableOpacity>
                </Center>


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
        flex: 1.25,
        justifyContent: "center",


    },
    //content
    box2: {
        flex: 4,
        alignItems: "center",
        justifyContent: "center",

    },
    //footer
    box3: {
        flex: 3.75,
        flexDirection: "column",

    },
    box4: {
        flex: 2,
        justifyContent: "center",
    },

    botonVolver: {
        zIndex: 1,
        marginLeft: "20%",

    },

    square: {
        width: WINDOW_WIDTH / 1.25,
        height: WINDOW_WIDTH / 1.3,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        resizeMode: "stretch"
    },
    lightbox: {
        top: "2%",
        position: "absolute"
    },
    producto: {
        color: Colors.BLACK,
        fontFamily: "Montserrat_600SemiBold",
        fontSize: Typography.l,
        marginTop: "5%",
        marginLeft: "5%",
        marginRight: "5%",


    },
    price: {
        color: Colors.BLACK,
        fontFamily: "Poppins_600SemiBold",
        fontSize: Typography.l,
        marginLeft: "5%",
        marginRight: "5%",
        marginTop: "3%",


    },
    priceSinDesc: {
        color: Colors.BLACK,
        fontFamily: "Poppins_600SemiBold",
        fontSize: Typography.l,
        marginLeft: "5%",
        marginRight: "5%",
        marginTop: "5%",


    },
    talles: {
        color: Colors.BLACK,
        fontFamily: "Poppins_400Regular",
        fontSize: Typography.xs,
        marginLeft: "5%",
        marginRight: "5%",
        marginTop: "2%",


    },

    item: {
        backgroundColor: Colors.WHITE,
        //borderColor: "grey",
        //borderWidth: 3,
        marginHorizontal: 10,
        width: WINDOW_WIDTH / 2,
        height: WINDOW_WIDTH / 5,
        borderRadius: 14,
        marginTop: "8%",

        //shadow
        shadowColor: Colors.BLACK,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 9.51,


    },
    talle: {
        fontSize: Typography.xxs,
        fontFamily: "Poppins_600SemiBold",
        marginLeft: "15%"
    },
    probar: {
        width: "45%",
        height: 80,
        backgroundColor: Colors.RED_MAIN,
        borderRadius: 24,
        right: "4%",
        top: "20%",
        position: "absolute",
        shadowColor: Colors.RED_MAIN,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.5,
        shadowRadius: 9.51,

    },
    textProbar: {
        color: Colors.WHITE,
        fontFamily: "Poppins_600SemiBold",
        fontSize: Typography.xxs,
    },
    textAddWish: {
        color: Colors.WHITE,
        fontFamily: "Poppins_600SemiBold",
        fontSize: Typography.xxs,
        textAlign: 'center',
    },
    eliminar: {
        width: "90%",
        height: 80,
        backgroundColor: Colors.RED_MAIN,
        borderRadius: 24,
        top: "20%",
        position: "absolute",
        shadowColor: Colors.RED_MAIN,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.5,
        shadowRadius: 9.51,
    },

});
