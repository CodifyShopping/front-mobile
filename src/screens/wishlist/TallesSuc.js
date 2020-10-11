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
import { Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';

const WINDOW_WIDTH = Dimensions.get('window').width;

export default function TallesSuc({ navigation, route }) {

    const Item = ({ item }) => (
        <Center>
            <View style={styles.rowFrontVisible}>
                <View style={{
                    flex: 1,
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
                >
                    <View style={{
                        alignItems: "center",
                    }}>
                        <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: Typography.xxs }}>{item.talle}</Text>
                    </View>
                </View>
            </View>
        </Center>

    )

    const renderItem = ({ item }) => {
        if (item.cantidad > 0) {
            return (
                <Item
                    item={item}
                />)
        }


    };

    const isFocused = useIsFocused();

    const { sucursal } = route.params;
    const { local } = route.params;
    const { talle } = route.params;
    const DATA = talle

    useEffect(() => {

    }, [isFocused])


    return (

        <View style={styles.container}>
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: "40%" }}>
                <TouchableOpacity style={styles.botonVolver} onPress={() => { navigation.goBack() }}>
                    <AntDesign name="left" size={32} color="black" />
                </TouchableOpacity>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image style={{ resizeMode: "contain", width: 100, height: 70, marginBottom: "5%", marginTop: "5%" }} source={require("../../assets/icons/shop.png")}></Image>
                <Text style={styles.sucTxt}>{local} - {sucursal}</Text>
                <Text style={{ color: Colors.BLACK, fontFamily: "Poppins_400Regular", fontSize: Typography.s }}>Galería el Solar, Arce 946 CABA</Text>
                <Text style={{ color: Colors.BLACK, fontFamily: "Poppins_600SemiBold", fontSize: Typography.xs, top: "10%" }}>Talles disponibles</Text>
            </View>
            <View style={{ marginTop: "8%", height: "72%", width: "100%", justifyContent: "center" }}>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                />
            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    sucTxt: {
        color: Colors.BLACK,
        fontSize: Typography.xl,
        fontFamily: "Montserrat_700Bold",
    },
    botonVolver: {

        marginRight: "85%",

    },
    txt1: {
        fontSize: Typography.xs,
        fontFamily: "Poppins_600SemiBold"

    },
    rowFrontVisible: {
        backgroundColor: Colors.WHITE,
        borderColor: Colors.RED_MAIN,
        borderWidth: 2,
        borderRadius: 14,
        height: 60,
        width: "90%",
        marginBottom: "5%"
    },

});