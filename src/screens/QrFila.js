import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { AntDesign } from '@expo/vector-icons';
import axios from "axios"
import { Center } from '../helpers/Center';



export default function QrFila({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    //es para devolver diferentes botones en el caso de que haya error o no al concetarse al server
    const [correcto, setCorrecto] = useState(false);
    const [incorrecto, setIncorrecto] = useState(false);

    const [local, setLocal] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const fetchProduct = async (data) => {

        axios.post('http://35.229.106.56:3000/returnProdCli',
            {
                id: data
            },
            {
                headers: { token: "eyJhbGciOiJIUzI1NiJ9.VW5pcWxv.jeajO8sVCR0886knodmQtHRGbki4W1D1oCrb-yZQ7As" },




            })
            .then((response) => {
                setLocal(response.data.Local)
                setCorrecto(true)

            },

                (error) => {
                    console.log(error);
                    setIncorrecto(true)
                });
    }

    //Pass Array as second argument

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        fetchProduct(data);
        console.log(data)

    };

    //PERMISO A LA CAMARA
    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }



    const { Width } = Dimensions.get("screen");

    // functionOne = () => {
    //     setScanned(false);
    // }
    // functionTwo = () => {

    // }
    // //creo q no funciona. se usaria si se usa el boton que aparece luego de que se escanea el qr
    // functionCombined = () => {
    //     this.functionOne();
    //     this.functionTwo();
    // }

    return (

        <View
            style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>

            <Text style={styles.text1}>
                Escanea el codigo QR
            </Text>

            <TouchableOpacity style={styles.botonCerrar} onPress={() => { navigation.navigate("Hola") }}>
                <AntDesign name="close" size={32} color="white" />
            </TouchableOpacity>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />

            <View style={styles.container}>

                <View style={styles.zone} />
            </View>

            {/* 
            BOTON QUE APARECE DESPUES DE ESCANEAR EL QR*/
                correcto && (
                    <TouchableOpacity style={styles.boton1} onPress={() => [navigation.navigate("PreFila", { local: local }), setScanned(false), setCorrecto(false)]} >
                        <Center>
                            <Text style={styles.text2}>Siguiente</Text>
                        </Center>
                    </TouchableOpacity>
                )}
            {/* 
            BOTON QUE APARECE DESPUES DE ESCANEAR EL QR*/
                incorrecto && (
                    <TouchableOpacity style={styles.boton1} onPress={() => [setScanned(false), setIncorrecto(false)]} >
                        <Center>
                            <Text style={styles.text2}>ERROR: intente nuevamente</Text>
                        </Center>
                    </TouchableOpacity>
                )}


        </View>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    zone: {

        flex: 0.70,
        borderColor: "#FF464F",

        borderRightWidth: 8,
        borderBottomWidth: 8,
        borderLeftWidth: 8,
        borderTopWidth: 8,
        aspectRatio: 1,
        borderRadius: 25,
        marginTop: "17.5%"

    },
    boton1: {
        position: 'absolute',
        zIndex: 1,
        bottom: "10%",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        width: "70%",
        height: "6,5%",
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 1, height: 0 },
        shadowRadius: 5,
        borderRadius: 30,
        backgroundColor: '#ffffff',

    },
    botonCerrar: {
        position: 'absolute',
        zIndex: 1,
        top: "8%",
        left: "3%"
    },
    text1: {
        position: 'absolute',
        zIndex: 1,
        top: "32%",

        color: "white",
        fontSize: 24,
        fontFamily: "Poppins_600SemiBold",
    },
    text2: {
        color: "black",
        position: "absolute",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 18
    }


});