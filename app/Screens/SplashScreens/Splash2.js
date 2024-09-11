import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect } from 'react';

import { Image } from 'expo-image';
import { Asset } from 'expo-asset';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';


const gifAsset = Asset.fromModule(require('../../assets/Images/gif/SplashScreens.gif'));


const Splash2 = () => {
    const loginSelector = useSelector((state) => state.login.isLogin);
    const programRegisteredSelector = useSelector((state) => state.AccountSetUp.AccountData.data);
    console.log("programRegisteredSelector>>> <><><> ", programRegisteredSelector)

    const navigation = useNavigation();
    useEffect(() => {

    }, [loginSelector])

    useFocusEffect(
        useCallback(() => {
            const timer = setTimeout(() => {
                console.log("fcsdv", loginSelector,programRegisteredSelector)
                if (loginSelector) {
                    if (programRegisteredSelector==="true") {
                       
                        navigation.replace("BottomTabScreen");
                        console.log("cs AccountSetupComponent", loginSelector,programRegisteredSelector)
                    }
                    else {
                        console.log("cs <><><><><> WelcomeCopy")
                        
                        navigation.replace("WelcomeCopy");
                    }
                }
                else if (loginSelector == false) {
                    console.log("cs", typeof (loginSelector))
                    navigation.replace("Login");
                }
            }, 2000);
            return () => {
                clearTimeout(timer);
            };
        }, [])
    );


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <Image
                source={gifAsset.localUri || gifAsset.uri}
                style={{ width: '100%', height: '100%' }}
            />

        </View>
    )
}

export default Splash2

const styles = StyleSheet.create({})