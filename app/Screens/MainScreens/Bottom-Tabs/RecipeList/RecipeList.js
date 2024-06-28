import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native';
import CustomButton1 from '../../../../Components/UI/Buttons/CustomButton1';



import { Entypo, FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import { FlatList } from 'react-native';
import CustomToolKitHeader from '../../../../Components/UI/CustomToolKitHeader';

const RecipeList = ({ navigation }) => {

    return (
        <>

            <View style={{ flex: 1 }}>
                <ImageBackground
                    source={require('../../../../assets/Images/Background1.png')} // Replace with the actual path to your image
                    style={styles.container}
                >

                    <View style={{ flex: 1 }}>

                        <View style={{ flex: 0.08 }}>
                            <CustomToolKitHeader componentName={"Recipe’s"} />
                        </View>


                        <ScrollView style={{ flex: 0.95, paddingHorizontal: 18, marginTop: 20 }}>

                            <View style={{ flex: 0.2 }}>
                                <Text style={{ color: '#003E20', fontSize: 24, fontWeight: 700, fontFamily: 'BalooTamma2', lineHeight: 40 }}>Categories</Text>
                            </View>

                            <View style={{ flex: 0.8 }}>
                                <View>
                                    <Text style={{ color: '#FE7B07', fontSize: 16, fontWeight: 700, fontFamily: 'BalooTamma2', lineHeight: 40,marginBottom:-7 }}>Breakfast Recipe Videos</Text>
                                    <Image style={{ width: '100%', height: 167 }} source={require("../../../../assets/Images/Categories.png")} resizeMode="contain" />
                                </View>
                                <View>
                                    <Text style={{ color: '#FE7B07', fontSize: 16, fontWeight: 700, fontFamily: 'BalooTamma2', lineHeight: 40,marginBottom:-7 }}>Lunch Recipe Videos</Text>
                                    <Image style={{ width: '100%', height: 167 }} source={require("../../../../assets/Images/Categories.png")} resizeMode="contain" />
                                </View>
                                <View>
                                    <Text style={{ color: '#FE7B07', fontSize: 16, fontWeight: 700, fontFamily: 'BalooTamma2', lineHeight: 40 ,marginBottom:-7}}>Dinner Recipe Videos</Text>
                                    <Image style={{ width: '100%', height: 167 }} source={require("../../../../assets/Images/Categories.png")} resizeMode="contain" />
                                </View>

                            </View>
                        </ScrollView>




                    </View>
                </ImageBackground>
            </View>
        </>
    )
}

export default RecipeList

const styles = StyleSheet.create({
    container: {
        flex: 1
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