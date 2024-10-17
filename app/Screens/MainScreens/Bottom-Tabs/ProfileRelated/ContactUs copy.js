import { Alert, Image, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, VirtualizedList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useFormik } from 'formik'
import { useNavigation } from '@react-navigation/native';
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { ContactUsYupSchema } from '../../../../FormikYupSchema/ContactUsYupSchema.js'
import { useDispatch } from 'react-redux'
import CustomButton1 from '../../../../Components/UI/Buttons/CustomButton1.js';
import CustomTextInput from '../../../../Components/UI/Inputs/CustomTextInput.js';


import { StatusBar } from 'expo-status-bar';
import CustomToaster from '../../../../Utils/CustomToaster.js';
import Loader1 from '../../../../Utils/Loader1.js';
import CustomToolKitHeader from '../../../../Components/UI/CustomToolKitHeader.js';



const ContactUs = () => {
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
        setFieldValue,
        resetForm,
    } = useFormik({
        initialValues: { issue: "madipellyrohith@gmail.com", description: "Rohith@7", fcmToken: '' },

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
        console.log("Vlaues ", values)
    }




    return (
        <>
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
                <View style={{ flex: 0.08 }}>
                    <CustomToolKitHeader componentName={"Contact us"} />
                </View>
                <ScrollView
                  keyboardShouldPersistTaps="handled" 
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
                                                    label={'Issues'}
                                                    boxWidth={'100%'}
                                                    placeholder={'Enter Email'}
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
                                                    style={{ marginTop: 50 }}>Send contact us requests</CustomButton1>
                                            </KeyboardAvoidingView>
                                        </TouchableWithoutFeedback>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </>

    )
}

export default ContactUs

const styles = StyleSheet.create({
    container: {
        flex: 1,
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