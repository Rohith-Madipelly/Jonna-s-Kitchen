import { Platform, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React from 'react'
import Toast from 'react-native-toast-message'

const CustomToaster = (Message="No Message", descriptionMessage, type = "success") => {
    if (Platform.OS === 'ios') {
        console.log("CustomToaster platform ios", Message)
        //props type of react-native-toast-message > success,info,error

        // position > top (Default) or bottom 
        // visibilityTime >4000 (Default)

        // topOffset> 40 (D)
        Toast.show({
            type: type,
            text1: Message,
            text2: descriptionMessage,
        },);
    }
    else if (Platform.OS === 'android') {
        // ToastAndroid.show(Message, ToastAndroid.SHORT)

        Toast.show({
            type: type,
            text1: Message,
            text2: descriptionMessage,
        },);
    }
    else {
        console.log("CustomToaster platform other", Message)
    }
}

export default CustomToaster

const styles = StyleSheet.create({})


// using this with 
//  CustomToaster("Message","description","type")