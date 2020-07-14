import React from 'react';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native"

import Hola from "./Hola";
import Qr from "./Qr";
import Producto from "./Producto"
import Views from "./Views"
import WishList from "./WishList"
import Done from "./Done"

const Stack = createStackNavigator()

export const Routes = ({ }) => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }} >
                <Stack.Screen name="Hola" component={Hola} />
                <Stack.Screen name="Qr" component={Qr} />
                <Stack.Screen name="Producto" component={Producto} />
                <Stack.Screen name="Views" component={Views} />
                <Stack.Screen name="WishList" component={WishList} />
                <Stack.Screen name="Done" component={Done} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}



