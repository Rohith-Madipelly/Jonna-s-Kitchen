import { Image, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, VirtualizedList } from 'react-native'
import React, { useState } from 'react'
// import Title from '../../Components/UI/TextUI/Title'
// import CustomButton1 from '../../Components/UI/Buttons/CustomButton1'
// import CustomTextInput2 from '../../Components/UI/Inputs/CustomTextInput2'
import { useFormik } from 'formik'
import ASO from '../../Utils/AsyncStorage_Calls'
import { useNavigation } from '@react-navigation/native';

import { Entypo, FontAwesome } from "@expo/vector-icons";

import { LoginYupSchema } from '../../FormikYupSchema/LoginYupSchema.js'



import Spinner from 'react-native-loading-spinner-overlay';

import { useDispatch } from 'react-redux'
import CustomButton1 from '../../Components/UI/Buttons/CustomButton1.js';
import CustomTextInput from '../../Components/UI/Inputs/CustomTextInput.js';

const OtpScreen = () => {
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
        initialValues: { email: "thanooj12@gmail.com", password: "Chinnu#143." },

        onSubmit: values => {
            { submitHandler(values) }
        },

        validationSchema: LoginYupSchema,

        validate: values => {
            const errors = {};
            return errors;
        },

    });



    const submitHandler = (values) => {
        console.log("submitHandler", values)
        // navigation.navigate("EmailVerification")
    }

    // const submitHandler = async (values) => {

    //   seterrorFormAPI() //Clear's All API errors
    //   try {
    //     const { email, password } = values;

    //     setSpinnerbool(true)
    //     const res = await UserLoginApi(values)
    //     if (res) {
    //       // console.log(res.data)
    //       const Message = res.data.message
    //       const token = res.data.token
    //       const kycStatus=res.data.kycStatus



    //       ASO.setTokenJWT("Token", JSON.stringify(res.data.token), function (res, status) {
    //         if (status) {
    //           // ToasterMessage("success", `Success`, `${Message}`)
    //           dispatch(setToken(token));
    //         }
    //       })


    //       // const PageSeter = (pageNumber) => {
    //       ASO.setTokenJWT("pageNumber", JSON.stringify(res.data.kycStatus), function (res, status) {
    //         if (status) {
    //           // console.warn(status, " status>>>>>.")
    //           // ToasterMessage("success", `Success`, `${Message}`)
    //           // ToasterSender({ Message: `${Message}` })
    //           dispatch(setAccountPage(kycStatus));
    //         }
    //       })
    //       // }

    //       setTimeout(() => {
    //         setSpinnerbool(false)
    //       }, 50);


    //     }

    //   } catch (error) {
    //     console.log("error console", error)
    //     if (error.response) {
    //       if (error.response.status === 400) {
    //         console.log("Error With 400.")
    //       }
    //       else if (error.response.status === 401) {
    //         seterrorFormAPI({ PasswordForm: `${error.response.data.message}` })
    //       }
    //       else if (error.response.status === 404) {
    //         seterrorFormAPI({ emailForm: `${error.response.data.message}` })
    //       }
    //       else if (error.response.status === 500) {
    //         console.log("Internal Server Error", error.message)
    //       }
    //       else {
    //         console.log("An error occurred response.>>")
    //         ErrorResPrinter(`${error.message}`)
    //       }
    //     }
    //     else if (error.request) {
    //       console.log("No Response Received From the Server.")
    //       if (error.request.status === 0) {
    //         // console.log("error in request ",error.request.status)
    //         Alert.alert("No Network Found", "Please Check your Internet Connection")
    //       }
    //     }
    //     else {
    //       console.log("Error in Setting up the Request.")
    //     }

    //     setSpinnerbool(false)

    //     if (error) {

    //       // message = error.message;
    //       // seterrorFormAPI(message)
    //       // "Email or Password does not match !"
    //     }
    //   }
    //   finally {
    //     setSpinnerbool(false)
    //   }
    // }


    return (
        <>

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
                                source={require("../../assets/Images/Login.png")}
                                contentFit="cover"
                                transition={1000}
                                alt=''
                            />
                        </View>
                        <View style={{ flex: 0.04, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15 }}>
                            <View style={{ width: '100%', height: '100%', backgroundColor: '#E8F4EC', borderRadius: 20, elevation: 5, }}>
                                <View style={{ marginTop: 20, marginHorizontal: 15 }}>

                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>

                                        <View style={{ flex: 1, alignItems: 'space-between', flexDirection: 'row', width: '100%' }}>


                                            <View style={{ flex: 0.6 }}>
                                                <CustomTextInput
                                                    boxWidth={'100%'}
                                                    placeholder={'Enter otp'}
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


                                        </View>

                                        <View style={{ height: 50 , width: '70%'}}>
                                            <Text style={{ color: '#898989', textAlign: 'center',fontFamily:'BalooTamma2-Bold',fontWeight:'500',fontSize:14 }}>
                                                We have sent a verification code to your <Text style={{color:'#5655B9'}}> 
                                                    (Email ID: jonnaxxxx)</Text>
                                            </Text>
                                        </View>

                                        <CustomButton1
                                            boxWidth={'100%'}
                                            onPress={()=>{navigation.navigate("Loading")}}
                                            // onPress={handleSubmit}
                                            textStyling={{ marginBottom: -5 }}
                                            // leftIcon={<Entypo
                                            //   // style={styles.icon}
                                            //   name={'login'} size={18} color={'white'} />}
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

export default OtpScreen

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