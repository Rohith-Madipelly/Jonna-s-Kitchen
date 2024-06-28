import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const BackTable = () => {
    return (
        <View>
            <View style={{ backgroundColor: 'white', width: '100%', borderRadius: 20 }}>
                <View style={[styles.overlayContainer]}>
                    <View style={[styles.topCenterImage]}>
                        <Image style={{ width: '80%', height: 200, }} source={require("../assets/Images/Home/BannerBack01.png")} resizeMode="contain" />
                    </View>
                    <View style={[styles.bottomLeftImage]}>
                        <Image style={{ width: '80%', height: 200, }}  source={require("../assets/Images/Vector 1.png")} resizeMode="contain" />
                    </View>

                

                </View>

                <Text>BackTable</Text>
            </View>
        </View>
    )
}

export default BackTable

const styles = StyleSheet.create({

    overlayContainer: {
        width: '100%',
        height: '50%',
        position: 'relative', // Needed for absolute positioning of child elements
    },
    topCenterImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        marginTop: 0,
        top: -7.5, // Adjust this value to move the image up or down
        // left: '50%',
        // transform: [{ translateX: -75 }], // Center the image horizontally
        alignItems: 'center',
    },
    bottomLeftImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor:'red',
        bottom: 20, // Adjust this value to move the image up or down
        left: 20, // Adjust this value to move the image left or right
    },
})