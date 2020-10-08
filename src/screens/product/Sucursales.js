import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, TouchableOpacity, Dimensions, Text, Image, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Center } from "../../utils/Center";
import axios from 'axios';
import { useIsFocused } from "@react-navigation/native";
import { SwipeListView } from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Skeleton2 } from '../../components/Skeleton2.js';
import { Colors } from "../../styles/index"
import { FlatList } from 'react-native-gesture-handler';

const WINDOW_WIDTH = Dimensions.get('window').width;

export default function Sucursales({ navigation, route }) {

    const Item = ({ item }) => (

        <View style={styles.rowFrontVisible}>
            <View style={{
                flex: 1,
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center"
            }}
            >
                <View style={{
                    alignItems: "center",
                    padding: "5%"
                }}>
                    <Text numberOfLines={2} ellipsizeMode={'head'} style={styles.txt1}>{local} - {item} </Text>
                    <Text style={styles.txt2}>Articulo disponible</Text>
                    <Text style={styles.txt3}>Galería el Solar, Arce 946 CABA</Text>
                </View>
            </View>
        </View>

    )

    const renderItem = ({ item }) => {
        return (
            <Item
                item={item}
            />)

    };

    const [DATA, setDATA] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [token, setToken] = useState(null);

    const isFocused = useIsFocused();

    const { id } = route.params;
    const { talle } = route.params;
    const { sucursal } = route.params;
    const { local } = route.params;

    useEffect(() => {
        fetchSucursales()
        console.log(token)
    }, [token, isFocused])

    const handleToken = async () => {
        await AsyncStorage.getItem('token', (err, result) => {
            const pre = JSON.parse(result)
            setToken(pre.token)
        })

    }
    const fetchSucursales = async () => {
        handleToken()
        if (token != null) {
            axios.post('http://35.229.106.56:3000/returnProdSuc',
                {
                    id: id,
                    Sucursal: sucursal,
                    talle: talle
                },
                {
                    headers: { token: token }
                })

                .then(response => {

                    setDATA(response.data)
                    setLoading(false)
                    console.log(response.data)

                },

                    (error) => {
                        console.log(error);
                    });
        }
    }


    return (

        <View style={styles.container}>
            <TouchableOpacity style={styles.botonVolver} onPress={() => { navigation.goBack() }}>
                <AntDesign name="left" size={32} color="white" />
            </TouchableOpacity>
            <Text style={styles.sucTxt}>Sucursales</Text>
            <Text style={{ color: Colors.WHITE, fontFamily: "Poppins_400Regular", fontSize: 22, top: "1%" }}>Talle: {talle}</Text>

            <View style={{ marginTop: "8%", height: "72%", width: "100%" }}>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item}
                />
            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.RED_MAIN,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    sucTxt: {
        color: Colors.WHITE,
        fontSize: 28,
        fontFamily: "Montserrat_700Bold",
    },
    botonVolver: {

        right: "40%",
    },
    txt1: {
        fontSize: 20,
        fontFamily: "Poppins_600SemiBold"

    },
    txt2: {
        fontSize: 20,
        fontFamily: "Poppins_400Regular",
        color: Colors.GREEN_LIGHT

    },
    txt3: {
        fontSize: 20,
        fontFamily: "Poppins_400Regular",
        textAlign: "center"
    },
    rowFrontVisible: {
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        height: 160,
        margin: 5,
        marginBottom: "5%"
    },

});