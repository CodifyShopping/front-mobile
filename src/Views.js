import React from 'react';
import { View, Text, Button, ImageBackground, StyleSheet, Image, Dimensions, TouchableOpacity, Component } from 'react-native';
import { Center } from "./Center";
import { AntDesign } from '@expo/vector-icons';
import Lightbox from 'react-native-lightbox';
import { FlatList } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';


const WINDOW_WIDTH = Dimensions.get('window').width;


const DATA = [
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
];

function Item({ id, talle, selected, onSelect }) {
    return (
        <TouchableOpacity
            onPress={() => onSelect(id)}
            style={[
                styles.item,
                { borderColor: selected ? '#FF464F' : 'gray', backgroundColor: selected ? '#FFA7AB' : 'white' },
            ]}
        ><Center>
                <Text style={styles.talle}>{talle}</Text>
            </Center>
        </TouchableOpacity>
    );
}

export default function Views({ route, navigation }) {
    const [selected, setSelected] = React.useState(new Map());

    const onSelect = React.useCallback(
        id => {
            const newSelected = new Map(selected);
            newSelected.set(id, !selected.get(id));

            setSelected(newSelected);
            console.log(newSelected)
        },
        [selected],

    );

    const { nombre } = route.params;
    const { precio } = route.params;
    const { photo } = route.params;


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
                <Text style={styles.talles}>Talles dispoibles</Text>


                <FlatList
                    data={DATA}
                    horizontal
                    contentContainerStyle={{ paddingLeft: 10, paddingRight: 10 }}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Item
                            id={item.id}
                            talle={item.talle}
                            selected={!!selected.get(item.id)}
                            onSelect={onSelect}
                        />
                    )}
                    keyExtractor={item => item.id}
                    extraData={selected}
                />



            </View>
            <View style={styles.box4}>
                <Center>
                    <TouchableOpacity style={styles.probar} onPress={() => navigation.navigate("Done")}>
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
        borderColor: "grey",
        borderWidth: 3,
        marginHorizontal: 10,
        width: WINDOW_WIDTH / 7,
        height: WINDOW_WIDTH / 7,
        borderRadius: 60,
        top: "240%"
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
        shadowOpacity: 0.43,
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
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 15,
    },
    textAddWish: {
        color: "white",
        fontWeight: "600",
        fontSize: 20,
    },


});
