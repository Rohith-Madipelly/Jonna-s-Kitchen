import { Alert, Image, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, VirtualizedList } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
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
import { REQUEST_TO_CONTACT_API } from '../../../../Utils/ApiCalls.js';
import { ServerError, ServerTokenError_Logout } from '../../../../Utils/ServerError.js';



const UserRegister = () => {
    const [errorFormAPI, seterrorFormAPI] = useState("")
    const [spinnerBool, setSpinnerbool] = useState(false)
    const navigation = useNavigation()
    const dispatch = useDispatch();

    const [notificationsList, setNotificationsList] = useState()
    const [noData, setNodata] = useState()


    let tokenn = useSelector((state) => state.login.token)



    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getAllNotifications()

    }, []);


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

    //     const submitHandler = async (values) => {
    // //         CustomAlerts_Continue(
    // //             `You're leaving our app`,
    // //             `This action is attempting to open an external app. Would you like to continue ?`,
    // //             // `Applying for ${data.jobTitle}`,
    // //             // data.jobTitle,
    // //             () => {
    // //                 openEmail(ContactUsEmail, `Customer support request for ${values.issue}`,
    // //                     `
    // // Customer Name : ${userName}
    // // Customer Email : ${userEmail}

    // // Customer Description :${values.description}`
    // //                 )
    // //             }
    // //         )
    //     }

    const submitHandler = async (values) => {
        setSpinnerbool(true)
        try {
            const res = await REQUEST_TO_CONTACT_API(values, tokenn)
            if (res) {
                console.log(res.data)
                CustomToaster("Contact us request successfull sended" )
            }

        } catch (error) {
            console.log("Error ..", error)
            if (error.response) {
                if (error.response.status === 400) {
                    console.log("Error With 400.", error.response.data)
                }
                else if (error.response.status === 401) {
                    console.log("Error With 401.", error.response.data)
                    ServerTokenError_Logout(undefined, undefined, dispatch)
                }
                else if (error.response.status === 403) {
                    console.log("error.response.status login", error.response.data.message)
                }
                else if (error.response.status === 404) {
                    console.log("error.response.status login", error.response)
                }
                else if (error.response.status >= 500) {
                    // console.log("Internal Server Error", error.message)
                    ServerError(undefined, `${error.message}`)
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
                console.log("Error in Setting up the Request.", error)
            }

        } finally {
            setSpinnerbool(false)
        }


    }





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

                    <ScrollView  keyboardShouldPersistTaps="handled" 
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