import { StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React from 'react'

const CustomToaster = ( Message ) => {
    // console.log("CustomToaster",Message)
    ToastAndroid.show(Message, ToastAndroid.SHORT)
}

export default CustomToaster

const styles = StyleSheet.create({})