import React, { useState, useEffect } from 'react';
import { View, Text, Button, ImageBackground, StyleSheet, Image, Dimensions, TouchableOpacity, Component, TextInput } from 'react-native';
import { Center } from "./Center";
import axios from 'axios';

export default function Register({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const fetchRegister = async () => {
        console.log(email)
        console.log(password)
        axios.post("http://35.229.106.56:3000/auth/client/register", {
            email: email,
            password: password
        })
            .then(() => {
                navigation.navigate("Login")

            },

                (error) => {
                    console.log(error);

                });
    }

    return (
        <Center>
            <Text>Register</Text>
            <TextInput
                style={{ height: 40, width: 100 }}
                placeholder="email"
                onChangeText={text => setEmail(text)}

            />
            <TextInput
                style={{ height: 40, width: 100 }}
                placeholder="password"
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}

            />
            <Button title="Register" onPress={() => { fetchRegister(); }}></Button>
            <Button title="go to login" onPress={() => { navigation.navigate("Login") }}></Button>
        </Center>
    );
}