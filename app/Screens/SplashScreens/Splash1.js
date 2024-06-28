import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react';

import { Image } from 'expo-image';
import { Asset } from 'expo-asset';
import { useNavigation } from '@react-navigation/native';


const gifAsset = Asset.fromModule(require('../../assets/Images/gif/SplashScreens.gif'));

const Splash1 = () => {

    const navigation = useNavigation();
    useEffect(() => {
        // Set a timer to navigate to the next screen after 10 seconds (10000 milliseconds)
        const timer = setTimeout(() => {
            navigation.navigate("Splash2");
        },3000);

        // Clear the timer if the component is unmounted
        return () => clearTimeout(timer);
    }, []);
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'#F7F7F7' }}>

            <Image
                source={gifAsset.localUri || gifAsset.uri}
                style={{ width: '100%',height:200,marginTop:100 }}
            />

        </View>
    )
}

export default Splash1

const styles = StyleSheet.create({})