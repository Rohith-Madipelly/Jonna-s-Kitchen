import { Image, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, VirtualizedList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import ASO from '../../Utils/AsyncStorage_Calls.js'
import { useNavigation } from '@react-navigation/native';
import { Entypo, FontAwesome } from "@expo/vector-icons";
import Spinner from 'react-native-loading-spinner-overlay';
import { useDispatch } from 'react-redux'
import CustomButton1 from '../../Components/UI/Buttons/CustomButton1.js';
import CustomTextInput from '../../Components/UI/Inputs/CustomTextInput.js';




import { setToken } from '../../redux/actions/loginAction.jsx'

import { createPasswordAPI } from '../../Utils/ApiCalls.js'

import ToasterMessage from '../../Utils/ToasterMessage.js'

import { setAccountPage } from '../../redux/actions/AccountSetUpAction.jsx'
import { StatusBar } from 'expo-status-bar';
import CustomToaster from '../../Utils/CustomToaster.js';
import Loader1 from '../../Utils/Loader1.js';
import { PasswordYupSchema } from '../../FormikYupSchema/PasswordYupSchema.js';


const SuccessScreen = ({ route }) => {
    const { params } = route;
    const Status = params?.Status || 'Password Change Successfully';
    console.log("userEmail > createPassword", Status)

    const [errorFormAPI, seterrorFormAPI] = useState("")
    const [show, setShow] = useState()
    const [spinnerBool, setSpinnerbool] = useState(false)
    const navigation = useNavigation();

    const dispatch = useDispatch();



    const submitHandler = () => {
    //   console.log("submitHandler")
      navigation.navigate("Login")
    }



    useEffect(() => {

        setTimeout(() => {
            
        }, 5000);
    }, [])



    return (
        <>
            <StatusBar
                animated={true}
                // backgroundColor="#F7F7F7"
                barStyle={'dark-content'}
            />
            <Loader1
                visible={spinnerBool}
            />

            <View style={{
                flex: 1,
                // backgroundColor:'pink'
            }}>
                <StatusBar
                    animated={true}
                    // backgroundColor="#F7F7F7"
                    barStyle={'dark-content'}
                />

                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>

                    <ImageBackground
                        source={require('../../assets/Images/Background1.png')} // Replace with the actual path to your image
                        style={styles.container}
                    >
                        <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                            {/* <Image
                style={{ width: '100%', height: '100%' }}
                animation={"bounceIn"}
                source={require("../../assets/Images/Login.png")}
                contentFit="cover"
                transition={1000}
                alt=''
              /> */}
                        </View>
                        <View style={{ flex: 0.04, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15 }}>
                            <View style={{ width: '100%', height: '100%', backgroundColor: '#E8F4EC', borderRadius: 20, elevation: 5, }}>
                                <View style={{ marginTop: 20, marginHorizontal: 15 }}>

                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                            <KeyboardAvoidingView
                                                behavior={Platform.OS === "ios" ? "padding" : "height"}
                                                // behavior={Platform.OS === "ios" ? 100:0}
                                                // keyboardVerticalOffset={5000}
                                                style={{ width: '100%', alignItems: 'center' }}
                                            >

                                                <View style={{ alignItems: 'center', width: '95%' }}>

                                                    <Text
                                                        style={{
                                                            color: '#000000',
                                                            textAlign: 'center', fontFamily: 'Poppins-SemiBold',
                                                            fontWeight: '600', fontSize: 18, lineHeight: 24,
                                                            marginBottom: 20, width: "75%"
                                                        }}>
                                                        {Status} !</Text>
                                                    <Text style={{ color: '#000000', textAlign: 'center', fontFamily: 'Poppins-SemiBold', fontWeight: '500', fontSize: 14, lineHeight: 21 }}>
                                                        Please use the new password when Sign in.
                                                    </Text>
                                                </View>


                                                <CustomButton1
                                                    boxWidth={'100%'}
                                                    // onPress={() => { navigation.navigate("OtpScreen") }}
                                                    onPress={submitHandler}
                                                    textStyling={{ marginBottom: -5 }}
                                                    // leftIcon={<Entypo
                                                    //   // style={styles.icon}
                                                    //   name={'login'} size={18} color={'white'} />}
                                                    // bgColor={`${!isValid ? "#026F3B" : "#38B14D"}`}
                                                    // bgColor={"rgba(220, 142, 128, 0.9)"}
                                                    style={{ marginTop: 50 }}>Done</CustomButton1>
                                            </KeyboardAvoidingView>

                                        </TouchableWithoutFeedback>

                                    </View>
                                </View>










                            </View>

                        </View>


                    </ImageBackground>


                </ScrollView>

            </View>
        </>

    )
}

export default SuccessScreen

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