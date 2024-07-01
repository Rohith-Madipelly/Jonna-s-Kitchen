import { Image, ImageBackground, ScrollView, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native';
import CustomButton1 from '../../../../Components/UI/Buttons/CustomButton1';



import { Entypo, FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import { FlatList } from 'react-native';

const MorePage = () => {

    const navigation = useNavigation();
    const MorePageBtns = [
        { title: 'About Us', logo: require("../../../../assets/Images/MoreIcons/About Us.png"), onPress: () => navigation.navigate('AboutUs') },
        { title: 'Healthy life style programs', logo: require("../../../../assets/Images/MoreIcons/Healthy life style programs.png"), onPress: () => navigation.navigate('Healthylifestyleprograms') },
        { title: 'Testimonials', logo: require("../../../../assets/Images/MoreIcons/Testimonials.png"), onPress: () => navigation.navigate('Testimonials') },
        { title: 'FAQ', logo: require("../../../../assets/Images/MoreIcons/FAQ.png"), onPress: () => navigation.navigate('FAQ') },
        { title: 'Articles', logo: require("../../../../assets/Images/MoreIcons/Articles.png"), onPress: () => navigation.navigate('Articles') },
        { title: 'Job', logo: require("../../../../assets/Images/MoreIcons/Job.png"), onPress: () => navigation.navigate('Job') },
    ]






    return (
        <>
            <View style={{
                flex: 1,
                // backgroundColor:'pink'
            }}>

                <ImageBackground
                    source={require('../../../../assets/Images/Background1.png')} // Replace with the actual path to your image
                    style={styles.container}
                >
                    <View style={{ flex: 1, alignItems: 'center', marginTop: 25 }}>
                        <FlatList
                            data={MorePageBtns}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <CustomButton1
                                    boxWidth={'92%'}
                                    onPress={item.onPress}
                                    textStyling={{ marginBottom: -5 }}
                                    btnContainerprops={{ borderRadius: 10, paddingHorizontal: 20 }}
                                    leftIcon={ <Image style={{ width: 24, height: 24, }}
                                    source={item.logo}
                                    resizeMode={"contain"} />}

                                    RightIcon={ <Image style={{ width: 15, height: 15, }}
                                    source={require("../../../../assets/Images/ArrowWhite.png")}
                                    resizeMode={"contain"} />}
                                    // bgColor={`${!isValid ? "#026F3B" : "#38B14D"}`}
                                    bgColor={"#FE7B07"}
                                    style={{ marginTop: 50 }}>{item.title}</CustomButton1>
                            )}
                        />
                    </View>
                </ImageBackground>
            </View>
        </>

    )
}

export default MorePage

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