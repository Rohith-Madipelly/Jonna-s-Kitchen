import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MyPrograms = () => {
    return (
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
            <View style={{ marginTop: 15, alignItems: 'center' }}>
                <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 700, fontSize: 20, textDecorationLine: 'underline' }}>My Diet Plan</Text>
            </View>


            <View style={{ marginTop: 15, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 500, fontSize: 20, color: '#00000080', textAlign: "center" }}>No Data found</Text>
            </View>

        </View>
    )
}

export default MyPrograms

const styles = StyleSheet.create({

})