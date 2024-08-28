import { Alert, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native';
import CustomButton1 from '../../../../Components/UI/Buttons/CustomButton1';



import { Entypo, FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import { FlatList } from 'react-native';
import CustomToolKitHeader from '../../../../Components/UI/CustomToolKitHeader';
import CarouselsBasic from '../../../../Components/UI/CarouselsBasic copy/CarouselsBasic';
import SkeletonLoader from '../../../../Components/UI/Skeletons/SkeletonLoader';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';
import { get_all_recipies_by_category_API, getAllRecipieServiceByKeyWord22, getRecipieByKeyWord_API } from '../../../../Utils/ApiCalls';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoadingImage from '../../../../Components/UI/ImageConatiners/LoadingImage';

const RecipeList = ({ navigation }) => {

    const [searchKeyWord, setSearchKeyWord] = useState("")
    const [searchData, setSearchData] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const [BreakfastData, setBreakFastData] = useState()
    const [lunchRecipeData, setLunchRecipeData] = useState()
    const [dinnerRecipeData, setDinnerRecipeData] = useState()
    const [NOData, setNOData] = useState()

    let tokenn = useSelector((state) => state.login.token);


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



    const handleApiCall = async () => {
        try {
            const res = await getAllRecipieServiceByKeyWord22(searchKeyWord, tokenn)
            if (res) {
                // console.log(res.data)
                setSearchData(res.data)
            }
        } catch (error) {
            console.log("Error in APi Call in RecipeList >", error.response)
            if (error.response) {
                if (error.response.status === 400) {
                    console.log("Error With 400", error.response.data)
                    setSearchData([])
                    setNOData(error.response.data.message)
                }
                else if (error.response.status === 401) {
                    console.log("Error With 401", error.response.data)
                }
                else if (error.response.status === 403) {
                    console.log("Error With 403", error.response.data.message)
                }
                else if (error.response.status === 404) {
                    console.log("Error With 404", error.response.data.message)
                }
                else if (error.response.status === 500) {
                    console.log("Internal Server Error", error.message)
                }
                else if (error.response.status === 503) {
                    console.log("Internal Server Error", error.message)
                    Alert.alert("Internal Server Error", error.message)
                  }
                else {
                    console.log("An error occurred response.>>", error)
                }
            }
            else if (error.code === 'ECONNABORTED') {
                console.log('Request timed out. Please try again later.');
            }
            else if (error.request) {
                console.log("No Response Received From the Server.")
                if (error.request.status === 0) {
                    Alert.alert("No Network Found", "Please Check your Internet Connection")
                }
            }
            else {
                console.log("Error in Setting up the Request.")
            }
        }
        finally {
            console.log
        }

    }

    // First API call 
    useEffect(() => {
        const AllRecipie = async () => {
            try {
                const res = await get_all_recipies_by_category_API(tokenn)
                setBreakFastData(res.data.catogeryRecipie.breakFastRecipe)
                setLunchRecipeData(res.data.catogeryRecipie.lunchRecipe)
                setDinnerRecipeData(res.data.catogeryRecipie.dinnerRecipe)

                setTimeout(() => {
                    // setData(['Item 1', 'Item 2', 'Item 3']);
                    setIsLoading(false);
                }, 5000); 
            }catch (error) {
                // console.log(error)
                console.log("dme")
                if (error.response) {
                  if (error.response.status === 400) {
                    console.log("Error With 400.", error.response.data)
                  }
                  else if (error.response.status === 401) {
                    console.log("Error With 401.", error.response.data)
                  }
                  else if (error.response.status === 403) {
                    console.log("error.response.status login", error.response.data.message)
                  }
                  else if (error.response.status === 404) {
                    console.log("error.response.status login", error.response.data.message)
                  }
                  else if (error.response.status === 500) {
                    console.log("Internal Server Error", error.message)
                  }
                  else if (error.response.status === 503) {
                    console.log("Internal Server Error", error.message)
                    Alert.alert("Internal Server Error", error.message)
                  }
                  else {
                    console.log("An error occurred response.>>", error.message)
                    Alert.alert("An error occurred response", error.message)
          
                  }
                }
                else if (error.code === 'ECONNABORTED') {
                  console.log('Request timed out. Please try again later.');
                }
                else if (error.request) {
                  console.log("No Response Received From the Server.")
                  if (error.request.status === 0) {
                    Alert.alert("No Network Found", "Please Check your Internet Connection")
                  }
                }
                else {
                  console.log("Error in Setting up the Request.", error)
                }
              }
            finally{
           
            }
        }
        AllRecipie()
    }, [])


    // useEffect(() => {
    //     setTimeout(() => {
    //         // setData(['Item 1', 'Item 2', 'Item 3']);
    //         setIsLoading(false);
    //     }, 5000); // Simulate a 3-second loading time
    // }, []);


    // Debouncing in React use this for input api call like search box
    useEffect(() => {
        // let timeOut = setTimeout(() => {
           
            handleApiCall()
        // }, 500);

        // return () => clearTimeout(timeOut)
    }, [searchKeyWord])

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
            <StatusBar
                animated={true}
                // backgroundColor="#F7F7F7"
                barStyle={'dark-content'}
            />

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
                                <KeyboardAwareScrollView keyboardVerticalOffset={100} style={{ width: '100%', flex: 1 }}>

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
                                            value={searchKeyWord}
                                            onChangeText={text => setSearchKeyWord(text)}

                                            onSubmitEditing={handleApiCall}
                                            // onSubmitEditing={()=>{console.log("onenter in keybroad")}}

                                            style={{
                                                flex: 0.85,
                                                height: 45,
                                                borderRadius: 20,

                                            }}
                                        />
                                        <TouchableOpacity style={{ flex: 0.15 }} onPress={() => { handleApiCall() }}>
                                            <Image style={{ width: 24, height: 24, }}
                                                source={require("../../../../assets/Images/Search.png")}
                                                resizeMode={"contain"} />
                                        </TouchableOpacity>

                                    </View>
                                </KeyboardAwareScrollView>
                            </View>


                            {searchKeyWord !== "" ? <View style={{ flex: 0.2 }}>
                                <Text style={{ color: '#003E20', fontSize: 24, fontWeight: 700, fontFamily: 'BalooTamma2', lineHeight: 40, marginHorizontal: 18 }}>Search Results</Text>
                                <Text style={{ color: '#FE7B07', fontSize: 16, fontWeight: 700, fontFamily: 'BalooTamma2', lineHeight: 40, marginBottom: -7, marginHorizontal: 18 }}>{searchKeyWord}</Text>
                                {/* <CarouselsBasic DATA={DATA12} autoScroll={true} showIndicators={false} ContainerWidth={250} scrollTime={25000} /> */}
                                {NOData ?
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        {/* <Text>{NOData}</Text> */}
                                        <Text style={{ color: '#FE7B07', fontSize: 16, fontWeight: 700, fontFamily: 'BalooTamma2', lineHeight: 40, marginBottom: -7, marginHorizontal: 18 }}>
                                            {NOData}
                                        </Text>

                                    </View> :
                                    <>
                                        {searchData.map((data, index) => (
                                            <View key={index}>
                                                <LoadingImage
                                                    source={{ uri: data.recipieImage }}
                                                    style={{ width: '100%', height: 170, borderRadius: 15 }}
                                                    loaderColor="#ff0000" // Optional: change loader color
                                                    resizeMode="contain"
                                                />
                                                {/* <Text>He</Text> */}
                                            </View>
                                        ))}</>}
                            </View> :
                                <View>
                                </View>}


                            <View style={{ flex: 0.2 }}>

                                {!isLoading ? (
                                    <Text style={{ color: '#003E20', fontSize: 24, fontWeight: 700, fontFamily: 'BalooTamma2', lineHeight: 40, marginHorizontal: 18 }}>Categories</Text>
                                ) : (
                                    <View style={{ marginHorizontal: 18, marginTop: 10 }}>
                                        <SkeletonLoader width={300} height={24} borderRadius={5} />
                                    </View>
                                )}
                            </View>

                            <View style={{ flex: 0.8 }}>
                                <View>
                                    <Text style={{ color: '#FE7B07', fontSize: 16, fontWeight: 700, fontFamily: 'BalooTamma2', lineHeight: 40, marginBottom: -7, marginHorizontal: 18 }}>Breakfast Recipe Videos</Text>

                                    {!isLoading ? (
                                        <CarouselsBasic
                                            DATA={BreakfastData}
                                            autoScroll={true}
                                            showIndicators={false}
                                            ContainerWidth={250}
                                        // scrollTime={25000} 
                                        />
                                    ) : (
                                        <View style={{ marginHorizontal: 18, marginTop: 10 }}>
                                            <SkeletonLoader width={250} height={160} borderRadius={5} />
                                        </View>
                                    )}
                                </View>

                                <View>
                                    <Text style={{ color: '#FE7B07', fontSize: 16, fontWeight: 700, fontFamily: 'BalooTamma2', lineHeight: 40, marginBottom: -7, marginHorizontal: 18 }}>Lunch Recipe Videos</Text>
                                    {!isLoading ? (
                                        <CarouselsBasic
                                            DATA={lunchRecipeData}
                                            autoScroll={true}
                                            showIndicators={false}
                                            ContainerWidth={250}
                                        // scrollTime={25000} 
                                        />
                                    ) : (
                                        <View style={{ marginHorizontal: 18, marginTop: 10 }}>
                                            <SkeletonLoader width={250} height={160} borderRadius={5} />
                                        </View>
                                    )}
                                </View>
                                <View>
                                    <Text style={{ color: '#FE7B07', fontSize: 16, fontWeight: 700, fontFamily: 'BalooTamma2', lineHeight: 40, marginBottom: -7, marginHorizontal: 18 }}>Dinner Recipe Videos</Text>
                                    {!isLoading ? (
                                        <CarouselsBasic
                                            DATA={dinnerRecipeData}
                                            autoScroll={true}
                                            showIndicators={false}
                                            ContainerWidth={250}
                                        // scrollTime={25000} 
                                        />
                                    ) : (
                                        <View style={{ marginHorizontal: 18, marginTop: 10 }}>

                                            <SkeletonLoader width={250} height={160} borderRadius={5} />
                                        </View>
                                    )}
                                </View>
                                <View style={{ height: 50 }}>

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