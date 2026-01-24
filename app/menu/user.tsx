import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import globalStyles from "../globalStyles";

const UserScreen = () => {
    const [firstname, setFirstname] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [role, setRole] = useState<string>('');

    const fetchDetails = async () => {
        // Get other information
        const data = await AsyncStorage.getItem("userData");
        if (data) {
            const userData = JSON.parse(data);
            setFirstname(userData.firstname);
            setLastname(userData.lastname);
            setPhone(userData.phone);
            setEmail(userData.email);
            setRole(userData.role);
      };
    }

    // Fetch details on component mount
    useEffect(() => {
        fetchDetails();
    }, []);

    return (
    <View style={globalStyles.mainContainer}>
        <View style={globalStyles.menuHeaderContainer}>
            <Text style={globalStyles.info_label}>Firstname : {firstname}</Text>
            <Text style={globalStyles.info_label}>Lastname : {lastname}</Text>
            <Text style={globalStyles.info_label}>Email : {email}</Text>
            <Text style={globalStyles.info_label}>Phone : {phone}</Text>
            <Text style={globalStyles.info_label}>Role : {role}</Text>
        </View>
    </View>
  );
};


export default UserScreen;