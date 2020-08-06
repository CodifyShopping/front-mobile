import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import { Center } from "./helpers/Center";

export default function WishList({ navigation }) {
    return (
        <Center>
            <Text>Proximamente</Text>
            <Button title="volver" onPress={() => { navigation.goBack() }}> </Button>
        </Center>
    );
}

const styles = StyleSheet.create({

});
