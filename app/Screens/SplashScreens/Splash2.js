import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect } from 'react';

import { Image } from 'expo-image';
import { Asset } from 'expo-asset';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';


const gifAsset = Asset.fromModule(require('../../assets/Images/gif/SplashScreens.gif'));


const Splash2 = () => {
    const loginSelector = useSelector((state) => state.login.isLogin);
    console.log(loginSelector)

    const navigation = useNavigation();
    useEffect(() => {

    }, [loginSelector])
    // useEffect(() => {
    //     console.log("Asalu nuvu unnava")
    //     // Set a timer to navigate to the next screen after 10 seconds (10000 milliseconds)
    //     const timer = setTimeout(() => {
    //         console.log("Asalu nuvu unnava", loginSelector)



    //         if (loginSelector) {
    //             if (PageCountSelector >= 10) {
    //                 navigation.navigate("BottomTabScreen");
    //             }

    //         }
    //         else {
    //             // navigation.navigate("Login");
    //         }

    //     }, 2500);

    //     // Clear the timer if the component is unmounted
    //     return () => clearTimeout(timer);
    // }, []);




    useFocusEffect(
        useCallback(() => {
            const timer = setTimeout(() => {
                // console.log("fcsdv", loginSelector)
                if (loginSelector) {
                        console.log("cs AccountSetupComponent", loginSelector)
                        navigation.navigate("BottomTabScreen");
                    }
                else if (loginSelector == false) {
                    console.log("cs", typeof (loginSelector))
                    navigation.navigate("Login");
                }
            }, 2000);
            return () => {
                clearTimeout(timer);
            };
        }, [])
    );


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>

            <Image
                source={gifAsset.localUri || gifAsset.uri}
                style={{ width: '100%', height: '100%' }}
            />

        </View>
    )
}

export default Splash2

const styles = StyleSheet.create({})