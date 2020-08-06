

import React from 'react'
import { Text, View } from 'react-native'
import Swiper from 'react-native-swiper'
import { TouchableOpacity, StyleSheet, Image } from 'react-native'
import { Center } from "./helpers/Center"

const styles = StyleSheet.create({
    wrapper: {},
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF313B'
    },

    text: {
        color: '#fff',
        fontSize: 42,
        fontWeight: 'bold',
        bottom: "5%"
    },
    cuadrado: {
        height: "55%",
        width: "87%",
        backgroundColor: "white",
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center"
    }
    , continuar: {
        width: "60%",
        height: "9%",
        backgroundColor: "#fff",
        borderRadius: 16,
        top: "5%",

    },
    textContinuar: {
        color: '#FF313B',
        fontSize: 24,
        fontWeight: 'bold',

    },
})

export default function Welcome({ navigation }) {
    const swiperRef = React.useRef(null);
    const next = () => {
        if (!!swiperRef) {
            swiperRef.current.scrollBy(1);
        }
    };
    return (
        <Swiper ref={swiperRef} style={styles.wrapper} showsButtons={false} loop={false}>
            <View testID="1" style={styles.slide}>
                <Text style={styles.text}>Codify</Text>
                <View style={styles.cuadrado}>
                    <Image style={{ resizeMode: "contain", width: "80%", bottom: "5%" }} source={require("./assets/img/1.png")}></Image>
                    <Text style={{ textAlign: "center", fontSize: 28, fontWeight: "700", top: "6%" }}>Bienvenido a Codify</Text>
                    <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "400", top: "8%" }}>Comprar en los locales nunca{"\n"}habia sido tan facil</Text>

                </View>
                <TouchableOpacity style={styles.continuar} onPress={() => { next() }}>
                    <Center>
                        <Text style={styles.textContinuar}>Continuar</Text>
                    </Center>
                </TouchableOpacity>
            </View>
            <View testID="2" style={styles.slide}>
                <Text style={styles.text}>Codify</Text>
                <View style={styles.cuadrado}>
                    <Image style={{ resizeMode: "contain", width: "80%", bottom: "5%" }} source={require("./assets/img/2.png")}></Image>
                    <Text style={{ textAlign: "center", fontSize: 28, fontWeight: "700", top: "6%" }}>Escaneá y listo</Text>
                    <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "400", top: "8%" }}>Elegí la prenda que mas te{"\n"}gusta y pagá desde la app</Text>

                </View>
                <TouchableOpacity style={styles.continuar} onPress={() => { next() }}>
                    <Center>
                        <Text style={styles.textContinuar}>Continuar</Text>
                    </Center>
                </TouchableOpacity>
            </View>
            <View testID="3" style={styles.slide}>
                <Text style={styles.text}>Codify</Text>
                <View style={styles.cuadrado}>
                    <Image style={{ resizeMode: "contain", width: "80%", bottom: "5%" }} source={require("./assets/img/3.png")}></Image>
                    <Text style={{ textAlign: "center", fontSize: 28, fontWeight: "700", top: "6%" }}>No mas colas</Text>
                    <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "400", top: "8%" }}>Al momento de pagar{"\n"}podes ingresar en una fila virtual</Text>
                </View>
                <TouchableOpacity style={styles.continuar} onPress={() => { navigation.navigate("Register") }}>
                    <Center>
                        <Text style={styles.textContinuar}>Listo</Text>
                    </Center>
                </TouchableOpacity>
            </View>
        </Swiper>
    )
}