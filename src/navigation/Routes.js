import React, { useState, useEffect, useContext, } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native"
import { ActivityIndicator } from 'react-native';

import Home from "../screens/Home";
import Qr from "../screens/product/Qr";
import QrFila from "../screens/fila/QrFila"
import Producto from "../screens/product/Producto"
import Sucursales from "../screens/product/Sucursales"
import WishList from "../screens/wishlist/WishList"
import ProductoWish from "../screens/wishlist/ProductoWish"
import TallesSuc from "../screens/wishlist/TallesSuc"
import Done from "../screens/product/Done"
import ErrorFila from "../screens/fila/ErrorFila"
import PreFila from "../screens/fila/PreFila"
import WaitFila from "../screens/fila/WaitFila"
import FinishFila from "../screens/fila/FinishFila"

import Welcome from "../screens/login/Welcome"
import Login from "../screens/login/Login"
import Register from "../screens/login/Register"

import { AuthContext } from "../providers/AuthProvider"

import { Center } from "../utils/Center"

//fonts
import { useFonts, Montserrat_700Bold, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { AppLoading } from 'expo';

const Stack = createStackNavigator()

export const Routes = ({ }) => {
    const { user, getToken
    } = useContext(AuthContext)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AsyncStorage.getItem("token")
            .then(token => {
                if (token) {
                    //nuevo cambio
                    console.log(token)
                    getToken();
                }

                setLoading(false)

            })
            .catch(err => {
                console.log(err)
            });
    }, [])

    let [fontsLoaded] = useFonts({
        Montserrat_700Bold, Montserrat_600SemiBold, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold
    });

    if (loading) {
        return (
            <Center>
                <ActivityIndicator size="large" />
            </Center>
        )
    }

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <NavigationContainer>
            {user ?
                (<Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }} >
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Qr" component={Qr} />
                    <Stack.Screen name="QrFila" component={QrFila} />
                    <Stack.Screen name="Producto" component={Producto} />
                    <Stack.Screen name="Sucursales" component={Sucursales} />
                    <Stack.Screen name="WishList" component={WishList} />
                    <Stack.Screen name="ProductoWish" component={ProductoWish} />
                    <Stack.Screen name="TallesSuc" component={TallesSuc} />
                    <Stack.Screen name="Done" component={Done} />
                    <Stack.Screen name="ErrorFila" component={ErrorFila} />
                    <Stack.Screen name="PreFila" component={PreFila} />
                    <Stack.Screen name="WaitFila" component={WaitFila} />
                    <Stack.Screen name="FinishFila" component={FinishFila} />
                </Stack.Navigator>) :
                (<Stack.Navigator screenOptions={{ header: () => null }} initalRouteNanme="Welcome">
                    <Stack.Screen name="Welcome" component={Welcome} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Register" component={Register} />
                </Stack.Navigator>)}
        </NavigationContainer>
    );
}



