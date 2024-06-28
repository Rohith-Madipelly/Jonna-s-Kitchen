import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Title = ({ TitleName, style }) => {

    return (
        <View>
            <Text style={[styles.TitleStyle, style]}>{TitleName}</Text>
        </View>
    )
}

export default Title

const styles = StyleSheet.create({
    TitleStyle: {
        // fontFamily: 'Inter-Bold',
        fontFamily: 'DMSans-Regular',
        fontSize: 30,
        fontWeight: '700',
        lineHeight: 33.89,
        letterSpacing: 0.0036,
        textAlign: 'left',
        color: '#07005B',
    }
})