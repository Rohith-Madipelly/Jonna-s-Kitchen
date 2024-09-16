import { Alert, Image, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, VirtualizedList } from 'react-native'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import ASO from '../../Utils/AsyncStorage_Calls'
import { useNavigation } from '@react-navigation/native';
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { LoginYupSchema } from '../../FormikYupSchema/LoginYupSchema.js'
import Spinner from 'react-native-loading-spinner-overlay';
import { useDispatch } from 'react-redux'
import CustomButton1 from '../../Components/UI/Buttons/CustomButton1.js';
import CustomTextInput from '../../Components/UI/Inputs/CustomTextInput.js';




import { setToken } from '../../redux/actions/loginAction'

import { UserLoginApi } from '../../Utils/ApiCalls.js'


import { StatusBar } from 'expo-status-bar';
import CustomToaster from '../../Utils/CustomToaster.js';
import Loader1 from '../../Utils/Loader1.js';
import { ErrorResPrinter } from '../../Utils/ErrorResPrinter.js';
import { ServerError } from '../../Utils/ServerError.js';
import { setAccountPage } from '../../redux/actions/AccountSetUpAction.jsx';
import { SET_USER_NAME } from '../../redux/actions/loginAction copy.jsx';
import { SetUserPhoneNumber } from '../../redux/actions/SetUserPhoneNumber.jsx';


const Login = () => {
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
    initialValues: { userEmail: "", password: "" },

    onSubmit: values => {
      { submitHandler(values) }
    },

    validationSchema: LoginYupSchema,

    validate: values => {
      const errors = {};
      return errors;
    },

  });


  const submitHandler = async (values) => {

    seterrorFormAPI() //Clear's All API errors
    try {
      setSpinnerbool(true)
      const res = await UserLoginApi(values)
      if (res) {
        const Message = res.data.message
        const token = res.data.jwtTocken
        const USERNAMEAPP = res.data.userName
        const USERPHONEAPP = res.data.userPhoneNumber
        const programRegistered = res.data.programRegistered
        console.log(res.data)

        ASO.setTokenJWT("Token", JSON.stringify(token), function (res, status) {
          if (status) {
            // ToasterMessage("success", `Success`, `${Message}`)
            CustomToaster(Message)
            dispatch(setToken(token));
          }
        })


        ASO.setTokenJWT("UserName", JSON.stringify(USERNAMEAPP), function (res, status) {
          if (status) {
            dispatch(SET_USER_NAME(USERNAMEAPP));
          }
        })

        console.log(USERPHONEAPP,"user phoen number")
        ASO.setTokenJWT("userPhoneNumber12", JSON.stringify(USERPHONEAPP), function (res, status) {
          if (status) {
        console.log(USERPHONEAPP,"user phoen number >>>>>>>>>")

            dispatch(SetUserPhoneNumber(USERPHONEAPP));
          }
        })

      

        ASO.setTokenJWT("programRegistered", JSON.stringify(programRegistered), function (res, status) {
          if (status) {
            // ToasterMessage("success", `Success`, `${Message}`)
            // CustomToaster(Message)
            dispatch(setAccountPage(programRegistered));
          }
        })
      }

    } catch (error) {
      if (error.response) {
        console.log("df")
        if (error.response.status === 400) {
          console.log("Error With 400.", error.response.data)
          // seterrorFormAPI({ passwordForm: `${error.response.data.message}` })
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

    }
    finally {
      setSpinnerbool(false)
    }
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

        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>

          <ImageBackground
            source={require('../../assets/Images/Background1.png')} // Replace with the actual path to your image
            style={styles.container}
          >
            <View style={{ flex: 0.95 }}>

              <View style={{ flex: 0.75, justifyContent: 'center', alignItems: 'center' }}>
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
                      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <KeyboardAvoidingView
                          behavior={Platform.OS === "ios" ? "padding" : "height"}
                          // behavior={Platform.OS === "ios" ? 100:0}
                          // keyboardVerticalOffset={5000}
                          style={{ width: '100%', alignItems: 'center' }}
                        >
                          <CustomTextInput
                            boxWidth={'100%'}
                            placeholder={'Enter Email'}
                            labelStyle={{ fontWeight: '700', marginBottom: 10 }}
                            name='userEmail'
                            value={values.userEmail}
                            containerStyle={{ elevation: 10 }}
                            onChangeText={(e) => { const eToLowerCaseText = e.toLowerCase(); handleChange("userEmail")(eToLowerCaseText); seterrorFormAPI(); }}
                            onBlur={handleBlur("userEmail")}
                            leftIcon={<Image source={require('../../assets/Images/Icons/Gmail Logo.png')} style={{ width: 24, height: 24 }} />}
                            validate={handleBlur("userEmail")}
                            outlined
                            borderColor={`${(errors.userEmail && touched.userEmail) || (errorFormAPI && errorFormAPI.userEmailForm) ? "red" : "#ccc"}`}
                            errorMessage={`${(errors.userEmail && touched.userEmail) ? `${errors.userEmail}` : (errorFormAPI && errorFormAPI.userEmailForm) ? `${errorFormAPI.userEmailForm}` : ``}`}
                          // errorColor='magenta'
                          />


                          <CustomTextInput
                            boxWidth={'100%'}
                            placeholder={'Enter password'}
                            labelStyle={{ fontWeight: '700' }}
                            name='password'
                            value={values.password}
                            containerStyle={{ elevation: 10, marginTop: 5 }}
                            onChangeText={(e) => {
                              handleChange("password")(e); seterrorFormAPI();
                            }}
                            onBlur={handleBlur("password")}
                            rightIcon={<Pressable onPress={() => setShow({ ...setShow, password: !show?.password })}>
                              {!show?.password ? (
                                <Entypo name="eye-with-line" size={20} color="black" />) : (
                                <Entypo name="eye" size={20} color="black" />)
                              }
                            </Pressable>
                            }
                            leftIcon={<Image source={require('../../assets/Images/Icons/lock.png')} style={{ width: 24, height: 24 }} />}
                            secure={!show?.password}
                            validate={handleBlur("password")}
                            outlined
                            borderColor={`${(errors.password && touched.password) || (errorFormAPI && errorFormAPI.passwordForm) ? "red" : "#ccc"}`}
                            errorMessage={`${(errors.password && touched.password) ? `${errors.password}` : (errorFormAPI && errorFormAPI.passwordForm) ? `${errorFormAPI.passwordForm}` : ``}`}
                          />

                          <View style={{ justifyContent: 'flex-end', width: '100%', marginVertical: 16 }}>
                            <TouchableOpacity onPress={() => { navigation.navigate("ForgetPassword") }} style={{}}>
                              <Text style={{ fontFamily: 'BalooTamma2-Bold', fontSize: 12, color: '#31A84B', textAlign: 'right' }}>Forgot your password ? </Text>
                            </TouchableOpacity>
                          </View>

                          <CustomButton1
                            boxWidth={'100%'}
                            onPress={handleSubmit}
                            textStyling={{ marginBottom: -5 }}
                            bgColor={`${!isValid ? "#026F3B" : "#38B14D"}`}
                            style={{ marginTop: 50 }}>Login</CustomButton1>



                        </KeyboardAvoidingView>

                      </TouchableWithoutFeedback>

                    </View>
                  </View>










                </View>

              </View>

            </View>

            <View style={{ flex: 0.05, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ marginTop: 20, flex: 1, flexDirection: 'row' }}>
                <Text style={[{ color: 'black', fontWeight: '400', fontSize: 12, }]}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => { navigation.navigate("UserRegister") }} style={{}}>
                  <Text style={[styles.paragraphy, { fontFamily: 'BalooTamma2-Bold', fontSize: 12, color: '#31A84B' }]}> Create an account</Text></TouchableOpacity>
              </View>
            </View>


          </ImageBackground>


        </ScrollView>

      </View>
    </>

  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent:'space-between'
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