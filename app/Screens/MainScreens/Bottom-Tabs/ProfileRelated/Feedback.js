import { Image, ImageBackground, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native';
import CustomButton1 from '../../../../Components/UI/Buttons/CustomButton1';



import { Entypo, FontAwesome, SimpleLineIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList } from 'react-native';
import CustomToolKitHeader from '../../../../Components/UI/CustomToolKitHeader';


const Feedback = ({ navigation }) => {



    const BannerData2 = [
        {}
    ]

    return (
        <>

            <View style={{ flex: 1,paddingTop:20 }}>
                <ImageBackground
                    source={require('../../../../assets/Images/Background1.png')} // Replace with the actual path to your image
                    style={styles.container}
                >

                    <View style={{ flex: 0.95 }}>

                        <View style={{ flex: 0.08 }}>
                            <CustomToolKitHeader componentName={"Feedback"} />
                        </View>


                        <ScrollView style={{ flex: 0.95, marginTop: 20 }}>


                        </ScrollView>




                    </View>
                    <View style={{ flex: 0.05 }}>

                        {/* <Text>Hello</Text> */}
                    </View>
                </ImageBackground>
            </View>
        </>
    )
}

export default Feedback

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerCard: {
        // padding: 10,

        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 10,
        marginHorizontal: 10,


        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
            },
            android: {
                elevation: 2,
            },
        }),


    },
    UpperBox: {
        flex: 0.6
    },
    ContentBox: {
        flex: 0.4,
        backgroundColor: '#F6F8FE',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        overflow: 'hidden',



        paddingTop: 36,
        paddingHorizontal: 17
    }
})