import React, { useState, useEffect, useCallback } from 'react';
import { View, AsyncStorage, TouchableOpacity, Dimensions, Text, Image, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Center } from "../../utils/Center";
import axios from 'axios';
//import { useIsFocused } from "@react-navigation/native";
import { SwipeListView } from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Skeleton2 } from '../../components/Skeleton2.js';
import { Colors, Typography } from "../../styles/index"
import { useFocusEffect } from '@react-navigation/native';

const WINDOW_WIDTH = Dimensions.get('window').width;


// const DATA = [
//     {
//         id: '0',
//         nombre: 'Zapatilla nike 270',
//         precio:'200',
//         local:'Nike',
//         foto:require('./assets/img/short.jpeg')
//     },
//     {
//         id: '1',
//         nombre: 'Zapatilla nike 270',
//         precio:'200',
//         local:'Nike',
//         foto:require('./assets/img/short.jpeg')
//     },
//     {
//         id: '2',
//         nombre: 'Zapatilla nike 270',
//         precio:'200',
//         local:'Nike',
//         foto:require('./assets/img/short.jpeg')
//     },
//     {
//         id: '4',
//         nombre: 'Zapatilla nike 270',
//         precio:'200',
//         local:'Nike',
//         foto:require('./assets/img/short.jpeg')
//     },
//     {
//         id: '3',
//         nombre: 'Zapatilla nike 270',
//         precio:'200',
//         local:'Nike',
//         foto:require('./assets/img/short.jpeg')
//     },
// ];



export default function WishList({ navigation }) {

    const pressHandler = (_id, Nombre, Precio, Photo, Local, Descuento) => {
        navigation.navigate("ProductoWish", { nombre: Nombre, precio: Precio, descuento: Descuento, photo: Photo, id: _id, local: Local })
        setLoading(true)
    }

    const Item = ({ item, onPress }) => (

        <View style={styles.rowFront}>
            <TouchableOpacity onPress={onPress} style={[styles.rowFrontVisible]}>
                <View style={{
                    flex: 1,
                    alignItems: "center",
                    flexDirection: "row",
                }}
                >

                    <View style={{ height: "80%", width: "40%", left: "8%" }}>
                        <Center>

                            <Image style={{ resizeMode: "contain", width: "100%", height: "100%", borderRadius: 14, zIndex: 1 }} source={//data.item.foto
                                { uri: `data:image/gif;base64,${item.Photo}` }
                            } />
                        </Center>
                    </View>
                    <View style={{ left: "20%", width: "50%" }}>
                        <Text numberOfLines={2} ellipsizeMode={'head'} style={styles.txt1}>{item.Nombre}</Text>
                        <Text style={styles.txt2}>${item.Descuento === 0 ? item.Precio : Math.floor((item.Precio / 100) * (100 - item.Descuento))}</Text>
                        <Text style={styles.txt3}>{item.Local}</Text>
                    </View>
                </View>

            </TouchableOpacity>
        </View>

    );

    const renderItem = ({ item }) => {
        return (
            <Item
                item={item}
                onPress={() => pressHandler(item._id, item.Nombre, item.Precio, item.Photo, item.Local, item.Descuento)}
            />)

    };

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow()
        }
    };

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey)
        const newData = [...DATA]
        const prevIndex = DATA.findIndex(item => item._id === rowKey)
        newData.splice(prevIndex, 1)
        setDATA(newData)

    };

    const HiddenItemWithActions = ({ item }, rowMap) => {
        return (
            <View style={styles.rowBack}>
                <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={() => { [deleteRow(rowMap, item._id), deleteWsihlist(item._id)] }}>
                    <MaterialCommunityIcons
                        name="trash-can-outline"
                        size={25}
                        color="#fff"
                        style={styles.trash}
                    />
                </TouchableOpacity>
            </View>
        )

    }

    const renderHiddenItem = ({ item }, rowMap) => {
        return (
            <HiddenItemWithActions
                item={item}
                rowMap={rowMap}
                onClose={() => closeRow(rowMap, item.key)}

            />
        )
    }


    //const [selectedId, setSelectedId] = useState(null);
    const [token1, setToken] = useState(null);
    const [DATA, setDATA] = useState(null);
    const [isLoading, setLoading] = useState(true);

    //const isFocused = useIsFocused(); 

    const handleToken = async () => {
        await AsyncStorage.getItem('token', (err, result) => {
            const pre = JSON.parse(result)
            setToken(pre.token)

        })

    }

    useFocusEffect(
        useCallback(() => {
            let isActive = true

            const fetchProd = async () => {

                handleToken()
                console.log(token1)

                if (token1 != null) {
                    axios.post('http://54.84.31.119:3000/wishlist/show',
                        {},
                        {
                            headers: { token: token1 },
                        })

                        .then(response => {
                            console.log("FETCH SUCCESSFUL")
                            if (isActive) {
                                setDATA(response.data)
                                setLoading(false)
                            }


                        },

                            (error) => {
                                console.log(error.response.data);

                            });
                }

            }

            fetchProd()

            return () => {
                isActive = false;
                console.log("unmounted")
            };
        }, [token1])
    );

    const deleteWsihlist = async (ID) => {
        console.log(ID)
        await handleToken()
        axios.post('http://54.84.31.119:3000/wishlist/delete',
            {
                //I mayus
                ProductId: ID
            },
            {
                headers: { token: token1 }

            })

            .then(() => {

                console.log("Eliminado correctamente")


            },

                (error) => {
                    console.log(error);
                });

    }

    return (

        <View style={styles.container}>
            <TouchableOpacity style={styles.botonVolver} onPress={() => { navigation.navigate("Home") }}>
                <AntDesign name="left" size={32} color="white" />
            </TouchableOpacity>
            <Text style={styles.whishTxt}>Wish List</Text>

            <View style={{ top: "5%", height: "72%", width: "100%" }}>
                {(!isLoading && DATA == "No products in wishlist") && (
                    <Center>
                        <Text>Tu wish list esta vacia</Text>
                    </Center>
                )}
                {(!isLoading && DATA != "No products in wishlist" && DATA != null) && (
                    <SwipeListView

                        data={DATA}
                        renderItem={renderItem}
                        renderHiddenItem={renderHiddenItem}
                        showsVerticalScrollIndicator={false}
                        rightOpenValue={-75}
                        disableRightSwipe={true}
                        keyExtractor={(item) => item._id}
                    />)}
                {isLoading && (<View style={{ alignItems: "center" }}><Skeleton2 /></View>)}


            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.YELLOW,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    whishTxt: {
        color: Colors.WHITE,
        fontWeight: "800",
        fontSize: Typography.xl,
        bottom: "0%",
        fontFamily: "Montserrat_700Bold",
    },
    botonVolver: {

        right: "40%",
        bottom: "3%"


    },
    txt1: {
        fontSize: Typography.xs,
        bottom: "5%",
        fontFamily: "Poppins_600SemiBold"

    },
    txt2: {
        fontSize: Typography.xs,
        bottom: "2%",
        fontFamily: "Poppins_400Regular",

    },
    txt3: {
        fontSize: Typography.xs,
        fontFamily: "Poppins_400Regular",
    },
    rowFront: {
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        height: 200,
        margin: 5,
        marginBottom: 5,
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    rowFrontVisible: {
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        height: 200,
        padding: 10,
        marginBottom: 15,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: Colors.RED_MAIN,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        margin: 5,
        borderRadius: 10,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,

    },
    backRightBtnRight: {
        backgroundColor: Colors.RED_MAIN,
        right: 0,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,

    },

});