import React, { useState, useEffect } from 'react';
import { View, FlatList, AsyncStorage, TouchableOpacity, Dimensions, Text, Image, Button, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Center } from "../helpers/Center";
import axios from 'axios';
import { Skeleton } from '../components/Skeleton'


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


const Item = ({ item, onPress, style }) => (


    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        <View style={{
            flex: 1,
            alignItems: "center",

            flexDirection: "row",
        }}
        >

            <View style={{ height: "76%", width: "38%", left: "8%", borderRadius: 14 }}>
                <Center>

                    <Image style={{ resizeMode: "contain", width: "100%" }} source={require('../assets/img/short.jpeg')
                        // { uri: `data:image/gif;base64,${item.Photo}` } 
                    } />
                </Center>
            </View>
            <View style={{ left: "15%", width: "50%" }}>
                <Text numberOfLines={2} ellipsizeMode={'head'} style={styles.txt1}>{item.Nombre}</Text>
                <Text style={styles.txt2}>${item.Precio}</Text>
                <Text style={styles.txt3}>{item.Local}</Text>
            </View>
        </View>

    </TouchableOpacity>
);

export default function WishList({ navigation }) {


    const renderItem = ({ item }) => {
        return (
            <Item
                item={item}
                onPress={() => [setSelectedId(item._id), console.log(selectedId)]}
                style={{ backgroundColor: "white" }}
            />)

    };

    const [selectedId, setSelectedId] = useState(null);
    const [token1, setToken] = useState(null);
    const [DATA, setDATA] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {

        fetchProd()
    }, [token1])

    const handleToken = async () => {
        await AsyncStorage.getItem('token', (err, result) => {
            const pre = result
            const sliced = pre.slice("10", pre.length - 2)
            setToken(sliced)
        })

    }

    const fetchProd = async () => {

        handleToken()
        console.log(token1)

        if (token1 != null) {
            axios.post('http://35.229.106.56:3000/wishlist/show',
                {},
                {
                    headers: { token: token1 },
                })

                .then(response => {
                    console.log("FETCH SUCCESSFUL")
                    setDATA(response.data)
                    setLoading(false)

                },

                    (error) => {
                        console.log(error);

                    });
        }

    }

    return (

        <View style={styles.container}>
            <TouchableOpacity style={styles.botonVolver} onPress={() => { navigation.navigate("Hola") }}>
                <AntDesign name="left" size={32} color="white" />
            </TouchableOpacity>
            <Text style={styles.whishTxt}>Whish List</Text>

            <View style={{ top: "5%", height: "72%" }}>
                {!isLoading && (<FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                    extraData={selectedId}
                    showsVerticalScrollIndicator={false}
                />)}
                {isLoading && (<Skeleton />)}


            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFC542",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    whishTxt: {
        color: "white",
        fontWeight: "800",
        fontSize: 34,
        bottom: "0%",
        fontFamily: "Montserrat_700Bold",
    },
    botonVolver: {

        right: "40%",
        bottom: "3%"


    },
    item: {
        backgroundColor: 'white',
        //borderColor: "grey",
        //borderWidth: 3,
        marginVertical: 10,
        width: WINDOW_WIDTH * 0.9,
        height: WINDOW_WIDTH / 2,
        borderRadius: 18,

    },
    txt1: {
        fontSize: 20,
        bottom: "5%",
        fontFamily: "Poppins_600SemiBold"

    },
    txt2: {
        fontSize: 20,
        bottom: "2%",
        fontFamily: "Poppins_400Regular",

    },
    txt3: {
        fontSize: 20,
        fontFamily: "Poppins_400Regular",
    },
});