import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput, Image, ImageBackground, ActivityIndicator } from 'react-native';
import { Center } from "./Center"

export default function Welcome({ navigation }) {
    return (
        <Center>
            <Text>Welcome</Text>
            <Button title="Login" onPress={() => { navigation.navigate("Login") }} />
            <Button title="Register" onPress={() => { navigation.navigate("Register") }} />
        </Center>
    )
}