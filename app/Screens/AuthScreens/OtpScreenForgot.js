import { Button, Image, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, VirtualizedList } from 'react-native'
import React, { useState } from 'react'
// import Title from '../../Components/UI/TextUI/Title'
// import CustomButton1 from '../../Components/UI/Buttons/CustomButton1'
// import CustomTextInput2 from '../../Components/UI/Inputs/CustomTextInput2'
import { useFormik } from 'formik'
import ASO from '../../Utils/AsyncStorage_Calls.js'
import { useNavigation } from '@react-navigation/native';

import { Entypo, FontAwesome } from "@expo/vector-icons";

import { LoginYupSchema } from '../../FormikYupSchema/LoginYupSchema.js'



import Spinner from 'react-native-loading-spinner-overlay';

import { useDispatch } from 'react-redux'
import CustomButton1 from '../../Components/UI/Buttons/CustomButton1.js';
import CustomTextInput from '../../Components/UI/Inputs/CustomTextInput.js';
import { otpValidationSchema } from '../../FormikYupSchema/OtpValidationSchema.js';
import CustomOtpInput4 from '../../Components/Functionality/OTP/CustomOtpInput4.js';
import { UserRegisterOTPApi, verifyOTPAPI,verifyOTPScreenForgotAPI } from '../../Utils/ApiCalls.js';
import CustomToaster from '../../Utils/CustomToaster.js';
import { StatusBar } from 'expo-status-bar';

const OtpScreenForgot = ({ route }) => {
    const { params } = route;
    const userEmail = params?.email || 'nan';
    console.log("userEmail OtpScreenForgot >", userEmail)



    const [errorFormAPI, seterrorFormAPI] = useState("")
    const [show, setShow] = useState()
    const [spinnerBool, setSpinnerbool] = useState(false)
    const navigation = useNavigation();

    const dispatch = useDispatch();

    const { handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        values,
        touched,
        errors,
        isValid,
        setValues,
        resetForm,
    } = useFormik({
        // initialValues: { otp:["","","","",] },
        initialValues: { otp: "" },
        onSubmit: values => {
            { submitHandler(values) }
        },

        validationSchema: otpValidationSchema,


        validate: values => {
            const errors = {};
            return errors;
        },

    });



    // const submitHandler = (values) => {
    //     // console.log("submitHandler", values)
    //     navigation.navigate("CreatePassword")
    // }


    const submitHandler = async (values) => {

        seterrorFormAPI() //Clear's All API errors
        try {
            setSpinnerbool(true)
            const res = await verifyOTPScreenForgotAPI(userEmail, values)
            if (res) {
                console.log(res.data)
                const Message = res.data.message
                // // const token = res.data.jwtTocken
                console.log(Message)
                // CustomToaster(Message)
                setTimeout(() => {
                    navigation.navigate("ResetPassword", { email: userEmail })
                }, 500);
            }

        } catch (error) {
            console.log("error>", error)
            if (error.response) {
                if (error.response.status === 400) {
                    // console.log("Error With 400.", error.response.data)
                    seterrorFormAPI({ otp: `${error.response.data.message}` })

                    CustomToaster(error.response.data.message)
                }
                else if (error.response.status === 401) {
                    seterrorFormAPI({ otp: `${error.response.data.message}` })
                }
                else if (error.response.status === 409) {
                    seterrorFormAPI({ otp: `${error.response.data.message}` })
                    // setTimeout(() => {
                    navigation.navigate("CreatePassword", { email: userEmail })
                    // }, 500);
                }
                else if (error.response.status === 403) {
                    console.log("error.response.status login >>>", error.response)
                }
                else if (error.response.status === 404) {
                    seterrorFormAPI({ userEmailForm: `${error.response.data.message}` })
                }
                else if (error.response.status === 500) {
                    console.log("Internal Server Error", error.message)
                }
                else {
                    console.log("An error occurred response.>>")
                    //   ErrorResPrinter(`${error.message}`)
                }
            }
            else if (error.code === 'ECONNABORTED') {
                console.log('Request timed out. Please try again later.');
            }
            else if (error.request) {
                console.log("No Response Received From the Server.")
                if (error.request.status === 0) {
                    // console.log("error in request ",error.request.status)
                    Alert.alert("No Network Found", "Please Check your Internet Connection")
                }
            }

            else {
                console.log("Error in Setting up the Request.")
            }

            setSpinnerbool(false)

            if (error) {

                // message = error.message;
                // seterrorFormAPI(message)
                // "userEmail or Password does not match !"
            }
        }
        finally {
            setSpinnerbool(false)
        }
    }



    const ResendOTP = async () => {
        seterrorFormAPI() //Clear's All API errors
        try {
            setSpinnerbool(true)
            const res = await UserRegisterOTPApi(userEmail)
            if (res) {
                console.log(res.data)
                const Message = res.data.message
                // // const token = res.data.jwtTocken
                console.log(Message)
                CustomToaster(Message)
                setTimeout(() => {
                    navigation.navigate("OtpScreen", { email: values.userEmail })
                }, 500);
            }

        } catch (error) {
            console.log("sdbmh",error)
            if (error.response) {
                if (error.response.status === 400) {
                    console.log("Error With 400.", error.response.data)
                    // CustomToaster(error.response.data.message)
                }
                else if (error.response.status === 401) {
                    seterrorFormAPI({ passwordForm: `${error.response.data.message}` })
                }
                else if (error.response.status === 403) {
                    console.log("error.response.status login", error.response.data.message)
                }
                else if (error.response.status === 404) {
                    seterrorFormAPI({ userEmailForm: `${error.response.data.message}` })
                }
                else if (error.response.status === 409) {
                    seterrorFormAPI({ userEmailForm: `${error.response.data.message}` })
                }
                else if (error.response.status === 500) {
                    console.log("Internal Server Error", error.message)
                }
                else {
                    console.log("An error occurred response.>>")
                    // ErrorResPrinter(`${error.message}`)
                }
            }
            else if (error.code === 'ECONNABORTED') {
                console.log('Request timed out. Please try again later.');
            }
            else if (error.request) {
                console.log("No Response Received From the Server.")
                if (error.request.status === 0) {
                    // console.log("error in request ",error.request.status)
                    Alert.alert("No Network Found", "Please Check your Internet Connection")
                }
            }

            else {
                console.log("Error in Setting up the Request.")
            }

            setSpinnerbool(false)

            if (error) {

                // message = error.message;
                // seterrorFormAPI(message)
                // "userEmail or Password does not match !"
            }
        }
        finally {
            setSpinnerbool(false)
        }

    }

    return (
        <>
            <StatusBar
                animated={true}
                // backgroundColor="#F7F7F7"
                barStyle={'dark-content'}
            />
            <Spinner
                visible={spinnerBool}
                color={"#4A3AFF"}
                animation={'fade'}
            />
            <View style={{
                flex: 1,
                // backgroundColor:'pink'
            }}>

                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>

                    <ImageBackground
                        source={require('../../assets/Images/Background1.png')} // Replace with the actual path to your image
                        style={styles.container}
                    >
                        <View style={{ flex: 0.6, justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                style={{ width: '100%', height: '100%' }}
                                animation={"bounceIn"}
                                source={require("../../assets/Images/verifyOTP.png")}
                                contentFit="cover"
                                transition={1000}
                                alt=''
                            />
                        </View>
                        <View style={{ flex: 0.04, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15 }}>
                            <View style={{ width: '100%', height: '100%', backgroundColor: '#E8F4EC', borderRadius: 20, elevation: 5, }}>
                                <View style={{ marginTop: 20, marginHorizontal: 15 }}>

                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>

                                        {/* <View style={{ flex: 1, alignItems: 'space-between', flexDirection: 'row', width: '100%' }}>


                                            <View style={{ flex: 0.6 }}>

                                            <Text style={[styles.label]}>
                                            Type a code
                                            </Text>

            
                                                <CustomOtpInput
                                                    value={values.otp}
                                                    length={6}
                                                    keyboardType="numeric"
                                                    onOtpSubmit={(otp) => {
                                                        // console.log("otp vachinda", otp);
                                                        seterrorFormAPI() //Clear's All API errors
                                                        handleChange("otp")(otp)
                                                    }}
                                                    onChangeText={(index, value) => {
                                                        // console.log("index", index, ">value", value)
                                                    }}
                                                    // errorMessage={errorFormAPI.otp}
                                                    errorMessage={`${(errors.otp && touched.otp) ? `${errors.otp}` : (errorFormAPI && errorFormAPI.otp) ? `${errorFormAPI.otp}` : ``}`}

                                                    errorBoxid={errorFormAPI ? [0, 1, 2, 3, 4, 5] : ""}
                                                    onClear={true}
                                                />
                                                <CustomTextInput
                                                    boxWidth={'100%'}
                                                    placeholder={'Enter otp dsf'}
                                                    label={'Type a code'}
                                                    keyboardType='number-pad'
                                                    labelStyle={{ fontWeight: '700', marginBottom: 10 }}
                                                    name='email'
                                                    value={values.emailorPhoneNumber}
                                                    containerStyle={{ elevation: 10 }}
                                                    // bgColor='#e1f3f8'
                                                    // bgColor="#B1B1B0"

                                                    onChangeText={(e) => { const eToLowerCaseText = e.toLowerCase(); handleChange("emailorPhoneNumber")(eToLowerCaseText); seterrorFormAPI(); }}
                                                    onBlur={handleBlur("emailorPhoneNumber")}

                                                    // validate={() => {
                                                    //     if (!values?.first) { setError({ ...error, first: 'Please enter your name' }) }
                                                    //     else { setError({ ...error, first: null }) }
                                                    // }}

                                                    validate={handleBlur("emailorPhoneNumber")}

                                                    outlined

                                                    borderColor={`${(errors.emailorPhoneNumber && touched.emailorPhoneNumber) || (errorFormAPI && errorFormAPI.emailorPhoneNumberForm) ? "red" : "#ccc"}`}

                                                    errorMessage={`${(errors.emailorPhoneNumber && touched.emailorPhoneNumber) ? `${errors.emailorPhoneNumber}` : (errorFormAPI && errorFormAPI.emailorPhoneNumberForm) ? `${errorFormAPI.emailorPhoneNumberForm}` : ``}`}

                                                // errorColor='magenta'
                                                />
                                            </View>

                                            <View style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                                <Text style={{ fontFamily: 'BalooTamma2-Bold', marginTop: 10, fontSize: 16, color: '#31A84B' }}>Resend</Text>
                                            </View>


                                        </View> */}
                                        <View style={{ width: '70%' }}>
                                            <Text style={{ color: '#898989', textAlign: 'center', fontFamily: 'BalooTamma2-Bold', fontWeight: '500', fontSize: 14 }}>
                                                We have sent a verification code to your <Text style={{ color: '#5655B9' }}>
                                                    (Email ID: {userEmail} )</Text>
                                            </Text>
                                        </View>

                                        <View style={{ flex: 1, width: '100%' }}>




                                            <Text style={[styles.label]}>Type a code </Text>
                                            <CustomOtpInput4
                                                value={values.otp}
                                                length={4}
                                                keyboardType="numeric"
                                                onOtpSubmit={(otp) => {
                                                    // console.log("otp vachinda", otp);
                                                    seterrorFormAPI() //Clear's All API errors
                                                    handleChange("otp")(otp)
                                                }}
                                                onChangeText={(index, value) => {
                                                    // console.log("index", index, ">value", value)
                                                }}
                                                // errorMessage={errorFormAPI.otp}
                                                errorMessage={`${(errors.otp && touched.otp) ? `${errors.otp}` : (errorFormAPI && errorFormAPI.otp) ? `${errorFormAPI.otp}` : ``}`}

                                                errorBoxid={errorFormAPI ? [0, 1, 2, 3,] : ""}
                                                onClear={true}
                                            />

                                            <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={() => { ResendOTP() }}>
                                                <Text style={{ fontFamily: 'BalooTamma2-Bold', fontSize: 16, color: '#31A84B' }}>Resend </Text>
                                            </TouchableOpacity>


                                        </View>


                                        <CustomButton1
                                            boxWidth={'100%'}
                                            // onPress={() => { navigation.navigate("Loading") }}
                                            onPress={handleSubmit}
                                            textStyling={{ marginBottom: -5 }}
                                            bgColor={`${!isValid ? "#026F3B" : "#38B14D"}`}
                                            // bgColor={"rgba(220, 142, 128, 0.9)"}
                                            style={{ marginTop: 50 }}>Verify OTP</CustomButton1>
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

export default OtpScreenForgot

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    UpperBox: {
        flex: 0.6
    },

    label: {
        fontWeight: '400',
        marginBottom: 4,
        textTransform: 'none',
        fontFamily: 'BalooTamma2-Bold',
        fontSize: 14
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