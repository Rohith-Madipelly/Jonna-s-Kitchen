import { Button, Dimensions, Image, ImageBackground, Animated, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View, TouchableOpacity } from "react-native";


import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";

import { useDispatch } from "react-redux";
import { RegisterYupSchema } from "../../FormikYupSchema/RegisterYupSchema";
import CustomTextInput3 from "../../Components/UI/Inputs/CustomTextInput3";
import CustomButton1 from "../../Components/UI/Buttons/CustomButton1";
import { scrollToBottom, scrollToTop } from "../../Utils/Scrolls";
import { Entypo, FontAwesome, SimpleLineIcons } from "@expo/vector-icons";

import CarouselsBasic from "../../Components/UI/CarouselsBasic/CarouselsBasic";
import SkeletonLoader from "../../Components/UI/Skeletons/SkeletonLoader";


// import { re } from "../../../../FormikYupSchema/AccountSetUpSchema/AccountPersonal1";


const { width } = Dimensions.get('screen');

const Welcome = () => {
    const navigation = useNavigation();

    const [errorFormAPI, seterrorFormAPI] = useState("")

    const dispatch = useDispatch();
    const scrollViewRef = useRef(null);

    const [expanded, setExpanded] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animation, {
            toValue: expanded ? 1 : 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [expanded]);

    const toggleExpand = () => {
        setExpanded(prevExpanded => !prevExpanded);
    };

    const buttonOpacity = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    const buttonTranslateY1 = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [-30, 0],
    });

    const buttonTranslateY2 = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [-60, 0],
    });

    const buttonTranslateY3 = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [-90, 0],
    });

    const TransformationData = [
        { id: 1, label: '1', image: require("../../assets/Images/Carousels/WelcomeTransformation1.png") },
        { id: 2, label: '1', image: require("../../assets/Images/Carousels/WelcomeTransformation1.png") },
    ]

    const PregnancyStoriesData = [
        { id: 1, label: '1', image: require("../../assets/Images/Carousels/Successful Pregnancy Stories.png") },
        { id: 2, label: '1', image: require("../../assets/Images/Carousels/Successful Pregnancy Stories.png") },
    ]



    return (
        <ImageBackground
            source={require('../../assets/Images/Background1.png')} // Replace with the actual path to your image
            style={{
                flex: 1,
                // backgroundColor:'pink'
            }}>

            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                ref={scrollViewRef}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        // behavior={Platform.OS === "ios" ? 100:0}
                        keyboardVerticalOffset={5000}
                        style={{ width: '100%', flex: 1 }}
                    >
                        <View style={{ flex: 1 }}>

                            <View style={{ marginTop: 10, flex: 0.9 }}>


                                <View style={{ marginHorizontal: 20, }}>
                                    <Text style={{
                                        fontWeight: '400', fontFamily: 'BalooTamma2-Bold', fontSize: 24,
                                        color: '#FE7B07',
                                        marginBottom: -10
                                    }}>Jonnas Kitchen</Text>

                                    <Text style={{
                                        fontWeight: '400',
                                        fontFamily: 'BalooTamma2-Bold', fontSize: 24,
                                        color: '#177137'
                                    }}>Healthy lifestyle programs</Text>
                                    <View style={{ flex: 1 }}>
                                        <Text style={[styles.TextFamilyA1, { fontWeight: '400', fontSize: 14 },]}>
                                            Our plans are purely based on home cooking.
                                        </Text>

                                        <Text style={[styles.TextFamilyA1, { fontWeight: '400', fontSize: 14, marginTop: -1 },]}>
                                            I believe the Mantra <Text style={[{ fontWeight: '700', fontSize: 14 }, styles.TextFamilyA2]}>
                                                “LET FOOD BE YOUR MEDICINE” </Text>
                                            and <Text style={[{ fontWeight: '700', fontSize: 14 }, styles.TextFamilyA2]}> “KITCHEN BE YOUR HOSPITAL”.
                                            </Text>
                                        </Text>

                                    </View>
                                </View>

                                {/* Transformation */}
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 8 }}>
                                    <Text style={[{
                                        fontWeight: '600', fontSize: 18,
                                        color: '#FE7B07',
                                        marginBottom: 3,
                                    }, styles.TextFamilyA2,]}>Transformation</Text>

                                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 10, }}>
                                    {/* <SkeletonLoader width={300} height={240} borderRadius={5} /> */}
                                        <CarouselsBasic DATA={TransformationData} autoScroll={true} showIndicators={false} containerHeight={191} />
                                    </View>


                                </View>

                                {/* Successful Pregnancy Stories */}
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 8 }}>
                                    <Text style={[{
                                        fontWeight: '600', fontSize: 18,
                                        color: '#FE7B07',
                                        marginBottom: 3
                                    }, styles.TextFamilyA2,]}>Successful Pregnancy Stories</Text>

                                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 10, }}>
                                        <CarouselsBasic DATA={PregnancyStoriesData} autoScroll={true} showIndicators={false} containerHeight={159} />
                                    </View>
                                </View>

                            </View>

                            <View style={{ flex: 0.1, alignItems: 'center', marginHorizontal: 20, }}>
                                <CustomButton1
                                    boxWidth={'92%'}
                                    // onPress={item.onPress}
                                    textStyling={{ marginBottom: -5 }}

                                    // onPress={() => { navigation.navigate("Register") }}
                                    onPress={() => { expanded ? scrollToTop(scrollViewRef) : scrollToBottom(scrollViewRef); toggleExpand(); }}

                                    btnContainerprops={{ borderRadius: 10, paddingHorizontal: 20 }}
                                    leftIcon={<Entypo
                                        // style={styles.icon}
                                        name={'login'} size={18} color={'white'} />}

                                    // RightIcon={<SimpleLineIcons
                                    //     // style={styles.icon}

                                    //     name={'arrow-right'} size={18} color={'white'} />}
                                    // leftIcon={<Image style={{ width: 24, height: 24, }}
                                    //     source={item.logo}
                                    //     resizeMode={"contain"} />}

                                    RightIcon={<Image style={{ width: 15, height: 15, }}
                                        source={require("../../assets/Images/ArrowWhite.png")}
                                        resizeMode={"contain"} />}
                                    // bgColor={`${!isValid ? "#026F3B" : "#38B14D"}`}
                                    bgColor={"#FE7B07"}
                                    style={{ marginTop: 50 }}>Healthy life style programs</CustomButton1>


                                <Animated.View
                                    style={[
                                        { position: 'relative', top: 0 },
                                        { opacity: buttonOpacity, transform: [{ translateY: buttonTranslateY1 }], }
                                    ]}
                                >
                                    <CustomButton1
                                        boxWidth={'92%'}
                                        // onPress={item.onPress}
                                        textStyling={{ marginBottom: -5 }}
                                        onPress={() => { scrollToBottom(scrollViewRef); toggleExpand(); }}
                                        btnContainerprops={{ borderRadius: 10, paddingHorizontal: 20 }}

                                        leftIcon={<Image style={{ width: 20, height: 20, }}
                                            source={require("../../assets/Images/Programs.png")}
                                            resizeMode={"contain"} />}


                                        RightIcon={<Image style={{ width: 15, height: 15, }}
                                            source={require("../../assets/Images/ArrowWhite.png")}
                                            resizeMode={"contain"} />}
                                        // bgColor={`${!isValid ? "#026F3B" : "#38B14D"}`}
                                        bgColor={"#FE7B07"}
                                        style={{ marginTop: 50 }}>Program 01</CustomButton1>
                                </Animated.View>

                                <Animated.View
                                    style={[
                                        { position: 'relative', top: 0 },
                                        { opacity: buttonOpacity, transform: [{ translateY: buttonTranslateY2 }], }
                                    ]}
                                >
                                    <CustomButton1
                                        boxWidth={'92%'}
                                        // onPress={item.onPress}
                                        textStyling={{ marginBottom: -5 }}
                                        onPress={() => { scrollToBottom(scrollViewRef); toggleExpand(); }}
                                        btnContainerprops={{ borderRadius: 10, paddingHorizontal: 20 }}
                                        leftIcon={<Image style={{ width: 20, height: 20, }}
                                            source={require("../../assets/Images/Programs.png")}
                                            resizeMode={"contain"} />}
                                        RightIcon={<Image style={{ width: 15, height: 15, }}
                                            source={require("../../assets/Images/ArrowWhite.png")}
                                            resizeMode={"contain"} />}
                                        // bgColor={`${!isValid ? "#026F3B" : "#38B14D"}`}
                                        bgColor={"#FE7B07"}
                                        style={{ marginTop: 50 }}>Program 02</CustomButton1>
                                </Animated.View>

                                <Animated.View
                                    style={[
                                        { position: 'relative', top: 0 },
                                        { opacity: buttonOpacity, transform: [{ translateY: buttonTranslateY3 }], }
                                    ]}
                                >
                                    <CustomButton1
                                        boxWidth={'92%'}
                                        // onPress={item.onPress}
                                        textStyling={{ marginBottom: -5 }}
                                        onPress={() => { scrollToBottom(scrollViewRef); toggleExpand(); }}
                                        btnContainerprops={{ borderRadius: 10, paddingHorizontal: 20 }}
                                        leftIcon={<Image style={{ width: 20, height: 20, }}
                                            source={require("../../assets/Images/Programs.png")}
                                            resizeMode={"contain"} />}
                                        RightIcon={<Image style={{ width: 15, height: 15, }}
                                            source={require("../../assets/Images/ArrowWhite.png")}
                                            resizeMode={"contain"} />}
                                        // bgColor={`${!isValid ? "#026F3B" : "#38B14D"}`}
                                        bgColor={"#FE7B07"}
                                        style={{ marginTop: 50 }}>Program 03</CustomButton1>
                                </Animated.View>

                                <View style={{ height: 250 }}>

                                </View>
                            </View>
                        </View>



                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>

            </ScrollView>
        </ImageBackground>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    ContentBox: {
        flex: 0.7,
        backgroundColor: 'white',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        overflow: 'hidden',
        paddingTop: 36,
        paddingHorizontal: 17
    },
    TextFamilyA1: {
        fontFamily: 'BalooTamma2'
    },
    TextFamilyA2: {
        fontFamily: 'BalooTamma2-Bold'
    },
})