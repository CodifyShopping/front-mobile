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
import { Colors, Typography } from "../../styles/index"
import Modal from 'react-native-modal';




const WINDOW_WIDTH = Dimensions.get('window').width;

console.disableYellowBox = true;
/*
*/

/*
const DATA = [
    {
        id: '0',
        talle: 'XS',
    },
    {
        id: '1',
        talle: 'S',
    },
    {
        id: '2',
        talle: 'M',
    },
    {
        id: '3',
        talle: 'L',
    },
    {
        id: '4',
        talle: 'XL',
    },
    {
        id: '5',
        talle: 'XXL',
    },
];*/

const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        <Center>
            <Text style={styles.talle}>{item.talle}</Text>
        </Center>
    </TouchableOpacity>
);

export default function Producto({ route, navigation }) {
    const [selectedId, setSelectedId] = useState(null);
    const [selectedOutOfStock, setSelectedOOS] = useState(null);
    const [token1, setToken] = useState(null);
    const [wish, setWish] = useState(null);
    const [showPopUp, setPopUp] = useState(false);


    const renderItem = ({ item }) => {
        const backgroundColor = item.talle === selectedId ? '#FF464F' : 'white';

        if (item.cantidad > 0) {
            return (
                <Item
                    item={item}
                    onPress={() => [setSelectedId(item.talle)]}
                    style={{ backgroundColor }}
                />)
        }
        else if (item.cantidad <= 0) {
            return (
                <Item
                    item={item}
                    onPress={() => {
                        [setSelectedOOS(item.talle), setPopUp(true)]
                    }}
                />)
        }


    };

    useEffect(() => {
        handleToken()
    }, [token1])

    const handleToken = async () => {
        await AsyncStorage.getItem('token', (err, result) => {
            const pre = result
            const sliced = pre.slice("10", pre.length - 2)
            console.log(sliced)
            setToken(sliced)
        })

    }

    const sendI = async () => {
        handleToken()
        axios.post('http://54.84.31.119:3000/reqProducto/client',
            {
                //I mayus
                ProductId: id,
                talle: selectedId,
                Sucursal: sucursal


            },
            {
                headers: { token: token1 }

            })

            .then(() => {

                navigation.navigate("Done")
                console.log("funcionó")

            },

                (error) => {
                    console.log(error);
                });

    }

    const addWsihlist = async () => {
        console.log(id)
        await handleToken()
        axios.post('http://54.84.31.119:3000/wishlist/add',
            {
                //I mayus
                ProductId: id,
            },
            {
                headers: { token: token1 }

            })

            .then((response) => {

                console.log(response.data)
                setWish(true)

            },

                (error) => {
                    console.log(error);
                });

    }

    // const deleteWsihlist = async () => {
    //     console.log(id)
    //     await handleToken()
    //     axios.post('http://54.84.31.119:3000/wishlist/delete',
    //         {
    //             //I mayus
    //             ProductId: id
    //         },
    //         {
    //             headers: { token: token1 }

    //         })

    //         .then(() => {

    //             navigation.navigate("WishList")


    //         },

    //             (error) => {
    //                 console.log(error);
    //             });

    // }

    const { talle } = route.params;
    const DATA = talle


    const { nombre } = route.params;
    const { precio } = route.params;
    const { descuento } = route.params;
    const { photo } = route.params;
    const { id } = route.params;
    const { local } = route.params;
    const { sucursal } = route.params;
    const desc = 100 * (1 - (descuento / precio))
    const descResult = Math.floor(desc)

    return (

        <View style={styles.container}>
            <Modal
                backdropOpacity={0.3}
                isVisible={showPopUp}
                onBackdropPress={() => setPopUp(false)}
                style={styles.contentView}
            >
                <View style={styles.content}>
                    <Text style={styles.contentTitle}>No tenemos stock en esta sucursal actualmente</Text>
                    <View style={styles.buttonsModals}>
                        <TouchableOpacity style={{ width: 160, height: "45%", backgroundColor: Colors.GRAY_LIGHT, right: "5%", borderRadius: 14 }} onPress={() => setPopUp(false)}>
                            <Center>
                                <Text style={{ fontFamily: "Poppins_400Regular", fontSize: Typography.xxs, color: Colors.WHITE }}>Entendido</Text>
                            </Center>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: 160, height: "45%", backgroundColor: Colors.RED_MAIN, left: "5%", borderRadius: 14 }} onPress={() => [setPopUp(false), navigation.navigate("Sucursales", { local: local, id: id, sucursal: sucursal, talle: selectedOutOfStock })]}>
                            <Center>
                                <Text style={{ fontFamily: "Poppins_400Regular", fontSize: Typography.xxs, textAlign: "center", color: Colors.WHITE }}>Ver otras sucursales</Text>
                            </Center>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={styles.box1}>

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}>
                    <View style={{ flex: 0.5, marginTop: "10%" }}>
                        <TouchableOpacity style={styles.botonVolver} onPress={() => navigation.navigate("Home")}>
                            <AntDesign name="left" size={32} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 2, marginTop: "10%", justifyContent: "center" }}>
                        <Text style={{
                            fontSize: Typography.s, fontFamily: "Montserrat_600SemiBold", alignSelf: "center"
                        }}>{local} - {sucursal}</Text>

                    </View>
                    <View style={{ flex: 0.5, marginTop: "10%" }}>

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
                <Text style={styles.talles}>Talles disponibles</Text>
                <View style={{ height: "35%", top: -10 }}>

                    <FlatList
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.talle}
                        extraData={selectedId}
                        horizontal
                        contentContainerStyle={{ paddingLeft: 10, paddingRight: 10 }}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

            </View>
            <View style={styles.box4}>

                <Center>
                    <TouchableOpacity style={styles.probar} onPress={() => {
                        selectedId ? ([sendI(), console.log(selectedId)
                        ]) : (Alert.alert(
                            "Cuidado",
                            "No selecionaste una talla",
                            [

                                { text: "Entendido", onPress: () => console.log("OK Pressed") }
                            ],
                            { cancelable: false }
                        ))
                    }}>
                        <Center>
                            <Text style={styles.textProbar}>Probar ahora</Text>
                        </Center>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addWish} onPress={() => addWsihlist()} >
                        <Center >
                            {!wish && (
                                <Text numberOfLines={2} ellipsizeMode={'tail'} style={styles.textAddWish}>Agregar a {'\n'}Wishlist</Text>
                            )

                            }
                            {wish && (
                                <LottieView source={require('../../assets/animated-icon/tick2.json')} autoPlay={true} loop={false} style={{ height: 60 }} />
                            )}


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
        width: WINDOW_WIDTH / 7,
        height: WINDOW_WIDTH / 7,
        borderRadius: 60,
        bottom: "-30%",
        //shadow
        shadowColor: Colors.BLACK,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 9.51,


    },
    talle: {
        fontSize: Typography.xs,
        fontFamily: "Poppins_600SemiBold"
    },
    probar: {
        width: "45%",
        height: "54%",
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
    addWish: {
        width: "45%",
        height: "54%",
        backgroundColor: Colors.YELLOW,
        borderRadius: 24,
        top: "20%",
        position: "absolute",
        left: "4%",
        shadowColor: Colors.YELLOW,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.5,
        shadowRadius: 9.51,

    },
    textAddWish: {
        color: Colors.WHITE,
        fontFamily: "Poppins_600SemiBold",
        fontSize: Typography.xxs,
        textAlign: 'center',
    },

    contentTitle: {
        fontSize: Typography.s,
        top: "10%",
        textAlign: "center",
        fontFamily: "Poppins_600SemiBold",
    },
    contentView: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    content: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 17,
        borderTopLeftRadius: 17,
        height: "35%"
    },
    buttonsModals: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    }


});
