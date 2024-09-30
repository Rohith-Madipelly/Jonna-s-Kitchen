import { SafeAreaView, StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react'

import NetInfo from '@react-native-community/netinfo';

import { StatusBar } from 'expo-status-bar';
import OfflineScreen from '../../Screens/ShareScreens/OfflineScreen';

// import NorchCss from '../../Utils/NorchCss'; 


const Wapper = ({ children }) => {
    const [isConnected, setIsConnected] = useState(true);
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });
        return () => {
            unsubscribe();
        };
    }, []);


    if (!isConnected) {
        return (
            <OfflineScreen />
        );
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F7F7" }}>
        {/* <View style={NorchCss.setting}> */}
            <StatusBar
                barStyle={'dark-content'}
                // showHideTransition={'fade'}
                // backgroundColor="#e93288"
                style={{ flex: 1 }}
            />
            {children}
        {/* </View> */}
        </SafeAreaView>
    )
}

export default Wapper

const styles = StyleSheet.create({})