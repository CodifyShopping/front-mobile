import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Button, ImageBackground, StyleSheet, Image, Dimensions, TouchableOpacity, Component, TextInput } from 'react-native';
import { Center } from "./Center";
import { AuthContext } from './providers/AuthProvider';
import axios from 'axios';

export default function Login({ navigation }) {
    const { login } = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const fetchLogin = async () => {
        console.log(email)
        console.log(password)
        axios.post("http://35.229.106.56:3000/auth/client/login", {
            email: email,
            password: password
        })
            .then((response) => {
                console.log(response.data)
                loginHandle(response.data)

            },

                (error) => {
                    console.log(error);

                });
    }

    const loginHandle = (token) => {
        login(token)
    }

    return (
        <Center>
            <Text>Login</Text>
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
            <Button title="log me in" onPress={() => { fetchLogin(); }}></Button>
            <Button title="go to register" onPress={() => { navigation.navigate("Register") }}></Button>
        </Center>
    );
}