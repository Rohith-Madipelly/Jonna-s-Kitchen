import { Alert, Image, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, VirtualizedList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useFormik } from 'formik'
import { useNavigation } from '@react-navigation/native';
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { ContactUsYupSchema } from '../../../../FormikYupSchema/ContactUsYupSchema.js'
import { useDispatch, useSelector } from 'react-redux'
import CustomButton1 from '../../../../Components/UI/Buttons/CustomButton1.js';
import CustomTextInput from '../../../../Components/UI/Inputs/CustomTextInput.js';


import { StatusBar } from 'expo-status-bar';
import CustomToaster from '../../../../Utils/CustomToaster.js';
import Loader1 from '../../../../Utils/Loader1.js';
import CustomToolKitHeader from '../../../../Components/UI/CustomToolKitHeader.js';
import CustomToolKitHeader2 from '../../../../Components/UI/CustomToolKitHeader2.js';
import { CustomAlerts_Continue } from '../../../../Utils/CustomReuseAlerts.js';
import { openEmail } from '../../../../Utils/Linkings/OpenEmail.js';
import { ContactUsEmail } from '../../../../Enviornment.js';



const UserRegister = () => {
    const [errorFormAPI, seterrorFormAPI] = useState("")
    const [show, setShow] = useState()
    const [spinnerBool, setSpinnerbool] = useState(false)
    const navigation = useNavigation();
    let userName = useSelector((state) => state.SetUserName.userName);

    let userEmail = useSelector((state) => state.SetUserEmailReducer.userEmail);

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
        initialValues: { issue: "", description: "" },
        onSubmit: values => {
            { submitHandler(values) }
        },
        validationSchema: ContactUsYupSchema,
        validate: values => {
            const errors = {};
            return errors;
        },
    });

    const submitHandler = async (values) => {
        CustomAlerts_Continue(
            `You're leaving our app`,
            `This action is attempting to open an external app. Would you like to continue ?`,
            // `Applying for ${data.jobTitle}`,
            // data.jobTitle,
            () => {
                openEmail(ContactUsEmail, `Customer support request for ${values.issue}`,
                    `
Customer Name : ${userName}
Customer Email : ${userEmail}

Customer Description :${values.description}`
                )
                //   console.log("OK pressed for", data.jobTitle);
            }
        )
    }

    // const submitHandler = async (values) => {
    //   console.log("Nagive")
    //   setTimeout(() => {
    //     navigation.navigate("OtpScreen", { email: values.userEmail })
    //   }, 500);
    // }


    return (<>
        <Loader1
            visible={spinnerBool}
        />
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={require('../../../../assets/Images/Background1.png')} // Replace with the actual path to your image
                style={{ flex: 1 }}
            >
                <View style={{ flex: 0.08 }}>
                    <CustomToolKitHeader componentName={"Contact us"} textDecorationLine={'underline'} />
                </View>
                <View style={{ flex: 0.92 }}>

                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}>

                        <View style={{ flex: 0.95 }}>

                            <View style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center' }}>
                                {/* <Image
                                    style={{ width: '100%', height: '100%' }}
                                    animation={"bounceIn"}
                                    source={require("../../../../assets/Images/Login.png")}
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
                                                    <CustomTextInput
                                                        label={'Issue'}
                                                        boxWidth={'100%'}
                                                        placeholder={'Enter issue'}
                                                        labelStyle={{ fontWeight: '700', marginBottom: 4, marginLeft: 4 }}
                                                        name='issue'
                                                        value={values.issue}
                                                        containerStyle={{ elevation: 10 }}
                                                        onChangeText={(e) => { handleChange("issue")(e); seterrorFormAPI(); }}
                                                        onBlur={handleBlur("issue")}
                                                        validate={handleBlur("issue")}
                                                        outlined
                                                        borderColor={`${(errors.issue && touched.issue) || (errorFormAPI && errorFormAPI.issueForm) ? "red" : "#ccc"}`}
                                                        errorMessage={`${(errors.issue && touched.issue) ? `${errors.issue}` : (errorFormAPI && errorFormAPI.issueForm) ? `${errorFormAPI.issueForm}` : ``}`}
                                                    // errorColor='magenta'
                                                    />


                                                    <CustomTextInput
                                                        boxWidth={'100%'}
                                                        label={'Enter description'}
                                                        placeholder={'Enter description'}
                                                        labelStyle={{ fontWeight: '700', marginBottom: 4, marginLeft: 4 }}
                                                        name='description'
                                                        numLines={7}
                                                        value={values.description}
                                                        containerStyle={{ elevation: 10, marginTop: 5 }}
                                                        onChangeText={(e) => {
                                                            handleChange("description")(e); seterrorFormAPI();
                                                        }}
                                                        onBlur={handleBlur("description")}
                                                        validate={handleBlur("description")}
                                                        outlined
                                                        borderColor={`${(errors.description && touched.description) || (errorFormAPI && errorFormAPI.descriptionForm) ? "red" : "#ccc"}`}
                                                        errorMessage={`${(errors.description && touched.description) ? `${errors.description}` : (errorFormAPI && errorFormAPI.descriptionForm) ? `${errorFormAPI.descriptionForm}` : ``}`}
                                                    />


                                                    <CustomButton1
                                                        boxWidth={'100%'}
                                                        onPress={handleSubmit}
                                                        textStyling={{ marginBottom: -5 }}
                                                        bgColor={`${!isValid ? "#026F3B" : "#38B14D"}`}
                                                        style={{ marginTop: 50 }}>Send</CustomButton1>
                                                </KeyboardAvoidingView>
                                            </TouchableWithoutFeedback>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>

                </View>
            </ImageBackground>
        </View>
    </>
    );
}

export default UserRegister

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