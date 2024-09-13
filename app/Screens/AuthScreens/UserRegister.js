import { Alert, Image, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, VirtualizedList } from 'react-native'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import ASO from '../../Utils/AsyncStorage_Calls.js'
import { useNavigation } from '@react-navigation/native';
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { LoginYupSchema } from '../../FormikYupSchema/LoginYupSchema.js'
import Spinner from 'react-native-loading-spinner-overlay';
import { useDispatch } from 'react-redux'
import CustomButton1 from '../../Components/UI/Buttons/CustomButton1.js';
import CustomTextInput from '../../Components/UI/Inputs/CustomTextInput.js';




import { setToken } from '../../redux/actions/loginAction.jsx'

import { UserRegisterOTPApi } from '../../Utils/ApiCalls.js'


import { setAccountPage } from '../../redux/actions/AccountSetUpAction.jsx'
import { StatusBar } from 'expo-status-bar';
import CustomToaster from '../../Utils/CustomToaster.js';
import Loader1 from '../../Utils/Loader1.js';
import { UserRegisterYupSchema } from '../../FormikYupSchema/UserRegisterYupSchema.js';
import { ServerError } from '../../Utils/ServerError.js';


const UserRegister = () => {
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
    initialValues: { userName: "", userEmail: "", userPhoneNumber: "" },
    onSubmit: values => {
      { submitHandler(values) }
    },
    validationSchema: UserRegisterYupSchema,
    validate: values => {
      const errors = {};
      return errors;
    },
  });

  const submitHandler = async (values) => {
    seterrorFormAPI() //Clear's All API errors
    try {
      setSpinnerbool(true)
      const res = await UserRegisterOTPApi(values)
      if (res) {
        console.log(res.data)
        const Message = res.data.message
        // // const token = res.data.jwtTocken
        // console.log(Message)
        CustomToaster(Message)
        setTimeout(() => {
          navigation.navigate("OtpScreen", { email: values.userEmail })
        }, 500);
      }

    } catch (error) {
      if (error.response) {
        console.log(error.response.status)
        console.log("dc", error.response)
        if (error.response.status === 400) {
          // console.log("Error With 400.", error.response.data)
          CustomToaster(error.response.data.message)
          seterrorFormAPI({ userEmailForm: `${error.response.data.message}` })
        }
        else if (error.response.status === 401) {

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
        else if (error.response.status >= 500) {
          // console.log("Internal Server Error", error.message)
          ServerError(undefined, `${error.message}`)
        }
        else {
          console.log("An error occurred response.>>", error.message)
        }
      }
      else if (error.code === 'ECONNABORTED') {
        console.log('Request timed out. Please try again later.');
      }
      else if (error.request) {
        console.log("No Response Received From the Server.", error.request);
        if (error.request.status === 0 && error.request._response.includes('Unable to parse TLS packet header')) {
          Alert.alert("Server Unreachable", "Please try again later.");
        } else if (error.request.status === 0) {
          Alert.alert("No Network Found", "Please check your internet connection.");
        }
      }
      else {
        console.log("Error in Setting up the Request.", error)
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

  // const submitHandler = async (values) => {
  //   console.log("Nagive")
  //   setTimeout(() => {
  //     navigation.navigate("OtpScreen", { email: values.userEmail })
  //   }, 500);
  // }


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
            <View style={{ flex: 0.6, justifyContent: 'center', alignItems: 'center' }}>
              <Image
                style={{ width: '100%', height: '100%' }}
                animation={"bounceIn"}
                source={require("../../assets/Images/SignUp.png")}
                contentFit="cover"
                transition={1000}
                alt=''
              />
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
                          boxWidth={'100%'}
                          placeholder={'Enter user name'}
                          label={'Enter user name'}
                          labelStyle={{ fontWeight: '700', marginBottom: 3 }}
                          name='userName'
                          value={values.userName}
                          containerStyle={{ elevation: 10 }}
                          onChangeText={(e) => { handleChange("userName")(e); seterrorFormAPI(); }}
                          onBlur={handleBlur("userName")}
                          validate={handleBlur("userName")}
                          outlined
                          borderColor={`${(errors.userName && touched.userName) || (errorFormAPI && errorFormAPI.userNameForm) ? "red" : "#ccc"}`}
                          errorMessage={`${(errors.userName && touched.userName) ? `${errors.userName}` : (errorFormAPI && errorFormAPI.userNameForm) ? `${errorFormAPI.userNameForm}` : ``}`}
                        // errorColor='magenta'
                        />




                        <CustomTextInput
                          boxWidth={'100%'}
                          placeholder={'Enter phone number'}
                          label={'Enter phone number'}
                          name='userPhoneNumber'
                          value={values.userPhoneNumber}
                          onChangeText={(e) => {
                            // Remove any non-numeric characters
                            const numericValue = e.replace(/[^0-9]/g, '');
                            // Update the state with the numeric value
                            handleChange("userPhoneNumber")(numericValue);
                            seterrorFormAPI();
                          }}
                          containerStyle={{ elevation: 10 }}
                          onBlur={handleBlur("userPhoneNumber")}
                          validate={handleBlur("userPhoneNumber")}
                          keyboardType="numeric"
                          outlined
                          labelStyle={{ marginBottom: -2 }}
                          borderColor={`${(errors.userPhoneNumber && touched.userPhoneNumber) || (errorFormAPI && errorFormAPI.phoneNumberForm) ? "red" : "#ccc"}`}
                          errorMessage={`${(errors.userPhoneNumber && touched.userPhoneNumber) ? `${errors.userPhoneNumber}` : (errorFormAPI && errorFormAPI.phoneNumberForm) ? `${errorFormAPI.phoneNumberForm}` : ``}`}
                        />

                        <CustomTextInput
                          boxWidth={'100%'}
                          placeholder={'Enter email id'}
                          label={'Enter your email id'}
                          labelStyle={{ fontWeight: '700', marginBottom: 3 }}
                          name='userEmail'
                          value={values.userEmail}
                          containerStyle={{ elevation: 10 }}
                          // bgColor='#e1f3f8'
                          // bgColor="#B1B1B0"
                          onChangeText={(e) => { const eToLowerCaseText = e.toLowerCase(); handleChange("userEmail")(eToLowerCaseText); seterrorFormAPI(); }}
                          onBlur={handleBlur("userEmail")}
                          validate={handleBlur("userEmail")}
                          outlined
                          borderColor={`${(errors.userEmail && touched.userEmail) || (errorFormAPI && errorFormAPI.userEmailForm) ? "red" : "#ccc"}`}
                          errorMessage={`${(errors.userEmail && touched.userEmail) ? `${errors.userEmail}` : (errorFormAPI && errorFormAPI.userEmailForm) ? `${errorFormAPI.userEmailForm}` : ``}`}
                        // errorColor='magenta'
                        />

                        <CustomButton1
                          boxWidth={'100%'}
                          onPress={handleSubmit}
                          textStyling={{ marginBottom: -5 }}
                          // leftIcon={<Entypo
                          //   // style={styles.icon}
                          //   name={'login'} size={18} color={'white'} />}
                          bgColor={`${!isValid ? "#026F3B" : "#38B14D"}`}
                          // bgColor={"rgba(220, 142, 128, 0.9)"}
                          style={{ marginTop: 50 }}>Send OTP</CustomButton1>
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