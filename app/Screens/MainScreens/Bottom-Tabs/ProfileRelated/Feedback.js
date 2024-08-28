import { Image, ImageBackground, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native';
import CustomButton1 from '../../../../Components/UI/Buttons/CustomButton1';



import { Entypo, FontAwesome, SimpleLineIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList } from 'react-native';
import CustomToolKitHeader from '../../../../Components/UI/CustomToolKitHeader';
import { useSelector } from 'react-redux';
import { GET_ALL_FEEDBACKS } from '../../../../Utils/ApiCalls';


const Feedback = ({ navigation }) => {
    let tokenn = useSelector((state) => state.login.token)

    const [feedbacksData, setFeedBacksData] = useState([])


    try {
        if (tokenn != null) {
            tokenn = tokenn.replaceAll('"', '');
        }
    }
    catch (err) {
        console.log("Error in token quotes", err)
        if (err.response.status === 500) {
            console.log("Internal Server Error", err.message)
        }
    }

    useEffect(() => {
        getAllFeedBacks()
    }, [])

    const getAllFeedBacks = async () => {
        try {
            const res = await GET_ALL_FEEDBACKS(tokenn)
            if (res) {
                console.log(">>Test GET_ALL_FEEDBACKS", res.data)
                setFeedBacksData(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const BannerData2 = [
        {}
    ]

    return (
        <>

            <View style={{ flex: 1 }}>
                <ImageBackground
                    source={require('../../../../assets/Images/Background1.png')} // Replace with the actual path to your image
                    style={styles.container}
                >

                    <View style={{ flex: 1 }}>

                        <View style={{ flex: 0.08}}>
                            <CustomToolKitHeader componentName={"Feedback"} />
                        </View>


                        <View style={{ flex: 1}}>
                            <FlatList
                                data={feedbacksData}
                                keyExtractor={item => item.key}
                                style={{ flex: 1, marginTop: 1 }}
                                renderItem={({ item, index }) => (
                                    <View style={{ height: 100, flexDirection: 'row', marginVertical: 10, marginHorizontal: 10 }}>
                                        <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: 'blue', overflow: 'hidden', justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                            <Text style={{ fontSize: 16, color: 'white' }}>
                                                {item?.name?.charAt(0).toUpperCase()}
                                            </Text>
                                        </View>
                                        <View style={{ width: '80%', borderRadius: 10, backgroundColor: 'white', overflow: 'hidden', justifyContent: 'center', alignItems: 'center', marginTop: 16 }}>
                                            <Text> {item.description}</Text>
                                            <Text style={{ fontSize: 30, color: 'red' }}>description</Text>
                                        </View>
                                    </View>)}
                            />


                        </View>







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