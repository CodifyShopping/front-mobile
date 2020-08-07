import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Button, ImageBackground, StyleSheet, Image, Dimensions, TouchableOpacity, Component, AsyncStorage } from 'react-native';
import { Center } from "./helpers/Center";
import { AntDesign } from '@expo/vector-icons';
import Lightbox from 'react-native-lightbox';
import { FlatList } from 'react-native-gesture-handler';
// import { color } from 'react-native-reanimated';
import axios from 'axios';


const WINDOW_WIDTH = Dimensions.get('window').width;

//console.disableYellowBox = true;
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

export default function Views({ route, navigation }) {
    const [selectedId, setSelectedId] = useState(null);
    const [token, setToken] = useState(null);

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
                    style={{ backgroundColor: "grey" }}
                    onPress={() => {
                        Alert.alert(
                            "Sin Stock",
                            "No tenemos stock en este talle",
                            [

                                { text: "Entendido", onPress: () => console.log("OK Pressed") }
                            ],
                            { cancelable: false }
                        )
                    }}
                />)
        }


    };


    const handleToken = async () => {
        AsyncStorage.getItem('token', (err, result) => {
            console.log(result);
        })

    }


    const sendI = async () => {
        handleToken()
        axios.post('http://35.229.106.56:3000/reqProducto',
            {
                Productid: id,
                talle: selectedId


            },
            {
                headers: { token: "eyJhbGciOiJIUzI1NiJ9.NWYyY2JiZDRlYmRmYTczMmEwY2I0NjYz.SLIRjhAvAWNRkhT6w7Iko0cZHRdM_DOW6QKnEnY5D44" }

            })

            .then(() => {

                navigation.navigate("Done")

            },

                (error) => {
                    console.log(error);
                });

    }


    //const talle = selectedTalle
    const { talle } = route.params;
    //console.log(JSON.stringify(talle))
    const DATA = talle
    console.log(DATA)
    //const NAME = JSON.stringify({ talle })
    // const F = NAME.slice("10", NAME.length - 2)
    // console.log(F)

    const { nombre } = route.params;
    const { precio } = route.params;
    const { photo } = route.params;
    const { id } = route.params;

    return (

        <View style={styles.container}>
            <View style={styles.box1}>
                <TouchableOpacity style={styles.botonVolver} onPress={() => { navigation.navigate("Qr") }}>
                    <AntDesign name="left" size={32} color="black" />
                </TouchableOpacity>
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
                <Text style={styles.price}>${JSON.stringify(precio)}</Text>
                <Text style={styles.talles}>Talles disponibles</Text>

                <View style={{ position: "absolute", bottom: "5%", height: 90 }}>

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
                    <TouchableOpacity style={styles.addWish} onPress={() => navigation.navigate("WishList")} >
                        <Center >
                            <Text style={styles.textAddWish}>Agregar a{"\n"}  Wishlist</Text>
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
        alignItems: "center",
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
        flex: 3.5,
        justifyContent: "center",

    },
    box4: {
        flex: 2.25,
        justifyContent: "center",
    },

    botonVolver: {
        position: 'absolute',
        zIndex: 1,
        left: "3%",
        bottom: 0

    },

    square: {
        width: WINDOW_WIDTH / 1.3,
        height: WINDOW_WIDTH / 1.3,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 10,
    },
    lightbox: {
        top: "2%",
        position: "absolute"
    },
    producto: {
        color: "black",
        fontWeight: "600",
        fontSize: 32,
        top: "5%",
        marginLeft: "5%",
        marginRight: "5%",
        position: "absolute"
    },
    price: {
        color: "#FF575F",
        fontWeight: "700",
        fontSize: 28,
        marginLeft: "5%",
        marginRight: "5%",
        top: "27.5%",
        position: "absolute"
    },
    talles: {
        color: "black",
        fontWeight: "500",
        fontSize: 20,
        marginLeft: "5%",
        marginRight: "5%",
        top: "50%",
        position: "absolute"
    },
    item: {
        backgroundColor: 'white',
        //borderColor: "grey",
        //borderWidth: 3,
        marginHorizontal: 10,
        width: WINDOW_WIDTH / 7,
        height: WINDOW_WIDTH / 7,
        borderRadius: 60,
        bottom: "-25%",
        //shadow
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 9.51,

        elevation: 15,

    },
    talle: {
        fontSize: 20,
    },
    probar: {
        width: "45%",
        height: 80,
        backgroundColor: "#FF464F",
        borderRadius: 24,
        left: "4%",
        top: "20%",
        position: "absolute",
        shadowColor: "#FF464F",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.5,
        shadowRadius: 9.51,

        elevation: 15,
    },
    textProbar: {
        color: "white",
        fontWeight: "600",
        fontSize: 20,
    },
    addWish: {
        width: "45%",
        height: 80,
        backgroundColor: "#FFC542",
        borderRadius: 24,
        top: "20%",
        position: "absolute",
        right: "4%",
        shadowColor: "#FFC542",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.5,
        shadowRadius: 9.51,

        elevation: 15,
    },
    textAddWish: {
        color: "white",
        fontWeight: "600",
        fontSize: 20,
    },


});
