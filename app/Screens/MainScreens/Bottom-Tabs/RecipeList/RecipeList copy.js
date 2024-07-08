import { Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native';
import CustomButton1 from '../../../../Components/UI/Buttons/CustomButton1';



import { Entypo, FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import { FlatList } from 'react-native';
import CustomToolKitHeader from '../../../../Components/UI/CustomToolKitHeader';
import CarouselsBasic from '../../../../Components/UI/CarouselsBasic/CarouselsBasic';

const RecipeList = ({ navigation }) => {

    const [SearchData, setSearchData] = useState("")

    const handleApiCall = () => {

    }
    const DATA12 = [
        {
            "image": require('../../../../assets/Images/Home/HomeBanner1.png'),
            onPress: () => { console.log("sd") }
        },
        {
            "image": require('../../../../assets/Images/Home/HomeBanner1.png'),
            onPress: () => { console.log("sd") }
        }, {
            "image": require('../../../../assets/Images/Home/HomeBanner1.png'),
            onPress: () => { console.log("sd") }
        },
    ];

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


                        <ScrollView style={{ flex: 0.95, marginTop: 20 }}>


                            <View style={{ flex: 0.2, paddingHorizontal: 22 }}>
                                <View style={{
                                    backgroundColor: '#FFF2E6',
                                    borderWidth: 0.2,
                                    borderColor: 'black',
                                    borderRadius: 20,
                                    paddingLeft: 15,
                                    flex: 1,
                                    flexDirection: 'row',
                                    // justifyContent:'space-between',
                                    alignItems: 'center'
                                }}>

                                    <TextInput name={"Search"}
                                        placeholder="Search Here"
                                        value={SearchData}
                                        onChangeText={text => setSearchData(text)}

                                        onSubmitEditing={handleApiCall}

                                        style={{
                                            flex: 0.85,
                                            height: 45,
                                            borderRadius: 20,

                                        }}
                                    />
                                    <TouchableOpacity style={{ flex: 0.15 }} onPress={() => { console.log("dsdsd") }}>
                                        <Image style={{ width: 24, height: 24, }}
                                            source={require("../../../../assets/Images/Search.png")}
                                            resizeMode={"contain"} />
                                    </TouchableOpacity>

                                </View>
                            </View>


                            {SearchData !== "" ? <View style={{ flex: 0.2 }}>
                                <Text style={{ color: '#003E20', fontSize: 24, fontWeight: 700, fontFamily: 'BalooTamma2', lineHeight: 40, marginHorizontal: 18 }}>Top Search</Text>
                                <Text style={{ color: '#FE7B07', fontSize: 16, fontWeight: 700, fontFamily: 'BalooTamma2', lineHeight: 40, marginBottom: -7, marginHorizontal: 18 }}>{SearchData}</Text>
                                <CarouselsBasic
                                    DATA={DATA12}
                                    // autoScroll={true} 
                                    showIndicators={false}
                                    ContainerWidth={250}
                                // scrollTime={25000} 
                                />
                            </View> : <View></View>}


                            <View style={{ flex: 0.2 }}>
                                <Text style={{ color: '#003E20', fontSize: 24, fontWeight: 700, fontFamily: 'BalooTamma2', lineHeight: 40, marginHorizontal: 18 }}>Categories</Text>
                            </View>

                            <View style={{ flex: 0.8 }}>
                                <View>
                                    <Text style={{ color: '#FE7B07', fontSize: 16, fontWeight: 700, fontFamily: 'BalooTamma2', lineHeight: 40, marginBottom: -7, marginHorizontal: 18 }}>Breakfast Recipe Videos</Text>
                                    <CarouselsBasic
                                        DATA={DATA12}
                                        // autoScroll={true} 
                                        showIndicators={false}
                                        ContainerWidth={250}
                                    // scrollTime={25000} 
                                    />
                                </View>

                                <View>
                                    <Text style={{ color: '#FE7B07', fontSize: 16, fontWeight: 700, fontFamily: 'BalooTamma2', lineHeight: 40, marginBottom: -7, marginHorizontal: 18 }}>Lunch Recipe Videos</Text>
                                    <CarouselsBasic
                                        DATA={DATA12}
                                        // autoScroll={true} 
                                        showIndicators={false}
                                        ContainerWidth={250}
                                    // scrollTime={25000} 
                                    />
                                </View>
                                <View>
                                    <Text style={{ color: '#FE7B07', fontSize: 16, fontWeight: 700, fontFamily: 'BalooTamma2', lineHeight: 40, marginBottom: -7, marginHorizontal: 18 }}>Dinner Recipe Videos</Text>
                                    <CarouselsBasic
                                        DATA={DATA12}
                                        // autoScroll={true} 
                                        showIndicators={false}
                                        ContainerWidth={250}
                                    // scrollTime={25000} 
                                    />
                                </View>
                                {/* <View style={{height:250}}>

                                </View> */}

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