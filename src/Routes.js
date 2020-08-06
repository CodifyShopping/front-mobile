import React, { useState, useEffect, useContext, } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native"
import { ActivityIndicator } from 'react-native';

import Hola from "./Hola";
import Qr from "./Qr";
import QrFila from "./QrFila"
import Producto from "./Producto"
import Views from "./Views"
import WishList from "./WishList"
import Done from "./Done"
import PreFila from "./PreFila"
import WaitFila from "./WaitFila"
import FinishFila from "./FinishFila"

import Welcome from "./Welcome"
import Login from "./Login"
import Register from "./Register"
import { AuthContext } from "./providers/AuthProvider"

import { Center } from "./helpers/Center"

const Stack = createStackNavigator()

export const Routes = ({ }) => {
    const { user, login } = useContext(AuthContext)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AsyncStorage.getItem("token")
            .then(token => {
                if (token) {
                    login();
                }

                setLoading(false)

            })
            .catch(err => {
                console.log(err)
            });
    }, [])

    if (loading) {
        return (
            <Center>
                <ActivityIndicator size="large" />
            </Center>
        )
    }

    return (
        <NavigationContainer>
            {user ?
                (<Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }} >
                    <Stack.Screen name="Hola" component={Hola} />
                    <Stack.Screen name="Qr" component={Qr} />
                    <Stack.Screen name="QrFila" component={QrFila} />
                    <Stack.Screen name="Producto" component={Producto} />
                    <Stack.Screen name="Views" component={Views} />
                    <Stack.Screen name="WishList" component={WishList} />
                    <Stack.Screen name="Done" component={Done} />
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



