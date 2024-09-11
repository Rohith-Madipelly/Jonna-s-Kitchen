import { Alert, Image, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, VirtualizedList } from 'react-native'
import React, { useState } from 'react'
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

import { setAccountPage } from '../../redux/actions/AccountSetUpAction.jsx'
import { StatusBar } from 'expo-status-bar';
import CustomToaster from '../../Utils/CustomToaster.js';
import Loader1 from '../../Utils/Loader1.js';
import { PasswordYupSchema } from '../../FormikYupSchema/PasswordYupSchema.js';
import CustomToolKitHeader2 from '../../Components/UI/CustomToolKitHeader2.js';
import { ServerError } from '../../Utils/ServerError.js';


const CreatePassword = ({ route }) => {
  const { params } = route;
  const userEmail = params?.email || 'madipellyrohith@gmail.com>>';
  console.log("userEmail > createPassword", userEmail)

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
    initialValues: { password: "", confirmPassword: "" },

    onSubmit: values => {
      { submitHandler(values) }
    },

    validationSchema: PasswordYupSchema,

    validate: values => {
      const errors = {};
      return errors;
    },

  });



  // const submitHandler = () => {
  //   console.log("submitHandler", values)
  //   navigation.navigate("Loading")
  // }

  const submitHandler = async (values) => {

    seterrorFormAPI() //Clear's All API errors
    try {
      setSpinnerbool(true)
      const res = await createPasswordAPI(userEmail, values)
      if (res) {
        console.log("hbhsa", res.data)
        const Message = res.data.message
        // const token = res.data.jwtTocken

        CustomToaster(Message)

        setTimeout(() => {
          navigation.navigate("SuccessScreen", { Status: Message })
        }, 500);

      }

    } catch (error) {
      console.log(error.response.data)
      if (error.response) {
        if (error.response.status === 400) {
          seterrorFormAPI({ passwordForm: `${error.response.data.password}` })
        }
        else if (error.response.status === 401) {
          seterrorFormAPI({ userEmailForm: `${error.response.data.message}` })
        }
        else if (error.response.status === 403) {
          console.log("error.response.status login", error.response.data.message)
        }
        else if (error.response.status === 404) {
        }

        else if (error.response.status === 409) {
          console.log("jbsfdjh", error.response)
        }
        else if (error.response.status >= 500) {
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
            <View style={{ flex: 0.45, justifyContent: 'flex-start', alignItems: 'center' }}>
              {/* <Image
                style={{ width: '100%', height: '100%' }}
                animation={"bounceIn"}
                source={require("../../assets/Images/Login.png")}
                contentFit="cover"
                transition={1000}
                alt=''
              /> */}
              <CustomToolKitHeader2 componentName={'Create Password'} />

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
                          placeholder={'Password'}
                          label={'Type your new password'}
                          labelStyle={{ fontWeight: '700', marginTop: 20, color: '#002E59' }}
                          name='userPassword'
                          value={values.password}
                          containerStyle={{ elevation: 10 }}
                          // bgColor='#e1f3f8'
                          // bgColor="#B1B1B0"
                          onChangeText={(e) => {
                            handleChange("password")(e); seterrorFormAPI();
                            // setShow({ ...setShow, password: false });
                          }}
                          // onChangeText={(e) => { const eToLowerCaseText = e.toLowerCase(); handleChange("password")(eToLowerCaseText); seterrorFormAPI(); }}
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
                        // errorMessage={`${(errorFormAPI && errorFormAPI.passwordForm) ? `${errorFormAPI.passwordForm}` : ``}`}
                        // errorColor='magenta'
                        />


                        <CustomTextInput
                          boxWidth={'100%'}
                          placeholder={'confirmPassword'}
                          label={'Confirm password'}
                          labelStyle={{ fontWeight: '700', color: '#002E59' }}
                          name='userconfirmPassword'
                          value={values.confirmPassword}
                          containerStyle={{ elevation: 10 }}
                          // bgColor='#e1f3f8'
                          // bgColor="#B1B1B0"
                          onChangeText={(e) => {
                            handleChange("confirmPassword")(e); seterrorFormAPI();
                            // setShow({ ...setShow, confirmPassword: false });
                          }}
                          // onChangeText={(e) => { const eToLowerCaseText = e.toLowerCase(); handleChange("confirmPassword")(eToLowerCaseText); seterrorFormAPI(); }}
                          onBlur={handleBlur("confirmPassword")}
                          rightIcon={<Pressable onPress={() => setShow({ ...setShow, confirmPassword: !show?.confirmPassword })}>
                            {!show?.confirmPassword ? (
                              <Entypo name="eye-with-line" size={20} color="black" />) : (
                              <Entypo name="eye" size={20} color="black" />)
                            }
                          </Pressable>
                          }
                          leftIcon={<Image source={require('../../assets/Images/Icons/lock.png')} style={{ width: 24, height: 24 }} />}
                          secure={!show?.confirmPassword}
                          validate={handleBlur("confirmPassword")}
                          outlined
                          borderColor={`${(errors.confirmPassword && touched.confirmPassword) || (errorFormAPI && errorFormAPI.confirmPassword) ? "red" : "#ccc"}`}
                          errorMessage={`${(errors.confirmPassword && touched.confirmPassword) ? `${errors.confirmPassword}` : (errorFormAPI && errorFormAPI.confirmPasswordForm) ? `${errorFormAPI.confirmPasswordForm}` : ``}`}
                        // errorMessage={`${(errorFormAPI && errorFormAPI.confirmPasswordForm) ? `${errorFormAPI.confirmPasswordForm}` : ``}`}
                        // errorColor='magenta'
                        />

                        <CustomButton1
                          boxWidth={'100%'}
                          // onPress={() => { navigation.navigate("OtpScreen") }}
                          onPress={handleSubmit}
                          textStyling={{ marginBottom: -5 }}
                          // leftIcon={<Entypo
                          //   // style={styles.icon}
                          //   name={'login'} size={18} color={'white'} />}
                          bgColor={`${!isValid ? "#026F3B" : "#38B14D"}`}
                          // bgColor={"rgba(220, 142, 128, 0.9)"}
                          style={{ marginTop: 50 }}>Set Password</CustomButton1>
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

export default CreatePassword

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