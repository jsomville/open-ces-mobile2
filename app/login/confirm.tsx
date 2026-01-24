import React from "react";
import { Alert, Image, Linking, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";

import { useState } from 'react';

import globalStyles from "../globalStyles";

import { router } from "expo-router";

const appLogo = require('../../assets/images/logo.png');

const RegisterScreen = () => {
    const [code, setCode] = useState('');

    const handleConfirm = async () => {
        console.log('Handle Confirm');

        // Field Validation HERE

        try {       

            router.push("/login");
            
        } catch (error) {
            console.error('Registration error:', error);
            Alert.alert('Registration Error', 'An error occurred during Registration. Please try again.');
        }
    };

    return (
        <View style={globalStyles.mainContainer}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <View>
                <View >
                    <Text style={globalStyles.label}>Enter the code you recieved by email</Text>
                    <TextInput
                        placeholder="Enter your code"
                        style={globalStyles.input}
                        value={code}
                        onChangeText={setCode}
                        autoCapitalize="none"
                        keyboardType="default"
                    />
                    
                </View>

                <View style={globalStyles.actionButtonContainer}>
                    <TouchableOpacity
                        style={globalStyles.roundedButton}
                        onPress={() => { handleConfirm(); }}
                    >
                        <Text>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View >
    );
}
export default RegisterScreen;