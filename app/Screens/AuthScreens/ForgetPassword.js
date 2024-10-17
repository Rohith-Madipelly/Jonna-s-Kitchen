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
import { UserForgotPassword } from '../../Utils/ApiCalls.js'


import { StatusBar } from 'expo-status-bar';
import CustomToaster from '../../Utils/CustomToaster.js';
import Loader1 from '../../Utils/Loader1.js';
import CustomToolKitHeader2 from '../../Components/UI/CustomToolKitHeader2.js';
import { ServerError } from '../../Utils/ServerError.js';
import { ForgetPasswordYupSchema } from '../../FormikYupSchema/ForgetPasswordYupSchema.js';


const ForgetPassword = ({ route }) => {


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
    initialValues: { userEmail: "", },
    onSubmit: values => {
      { submitHandler(values) }
    },
    validationSchema: ForgetPasswordYupSchema,
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
    console.log("Hello>>", values)

    seterrorFormAPI() //Clear's All API errors
    try {
      setSpinnerbool(true)
      const res = await UserForgotPassword(values)
      if (res) {
        console.log("hbhsa", res.data)
        const Message = res.data.message
        // const token = res.data.jwtTocken

        CustomToaster(Message)

        setTimeout(() => {
          navigation.navigate("OtpScreenForgot", { email: values.userEmail })
          resetForm()
        }, 500);

      }

    } catch (error) {
      console.log(error.response.status)
      if (error.response) {
        if (error.response.status === 400) {
          seterrorFormAPI({ userEmailForm: `${error.response.data.message}` })
        }
        else if (error.response.status === 401) {
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
         keyboardShouldPersistTaps="handled" 
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>

          <ImageBackground
            source={require('../../assets/Images/Background1.png')} // Replace with the actual path to your image
            style={styles.container}
          >
            <View style={{ flex: 0.45, justifyContent: 'flex-start', alignItems: 'center' }}>
              <CustomToolKitHeader2 componentName={'Forgot password?'} tagLine={'Hello there, Login to your account'} />
            </View>
            <View style={{ flex: 0.04, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15 }}>

              <View style={{ width: '100%', height: '100%', backgroundColor: '#E8F4EC', borderRadius: 20, elevation: 5, }}>
                <View style={{ marginTop: 20, marginHorizontal: 15 }}>

                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                    {/* <TouchableWithoutFeedback 
                    // onPress={Keyboard.dismiss}
                    > */}
                      {/* <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        // behavior={Platform.OS === "ios" ? 100:0}
                        // keyboardVerticalOffset={5000}
                        style={{ width: '100%', alignItems: 'center' }}
                      > */}


                        <CustomTextInput
                          boxWidth={'100%'}
                          placeholder={'Enter email address'}
                          label={'Type your email address'}
                          labelStyle={{ fontWeight: '700', marginBottom: 10 }}
                          name='userEmail'
                          value={values.userEmail}
                          containerStyle={{ elevation: 10 }}
                          // bgColor='#e1f3f8'
                          // bgColor="#B1B1B0"
                          onChangeText={(e) => { const eToLowerCaseText = e.toLowerCase(); handleChange("userEmail")(eToLowerCaseText); seterrorFormAPI(); }}
                          onBlur={handleBlur("userEmail")}
                          // validate={() => {
                          //     if (!values?.first) { setError({ ...error, first: 'Please enter your name' }) }
                          //     else { setError({ ...error, first: null }) }
                          // }}

                          leftIcon={<Image source={require('../../assets/Images/Icons/Gmail Logo.png')} style={{ width: 24, height: 24 }} />}

                          validate={handleBlur("userEmail")}
                          outlined
                          borderColor={`${(errors.userEmail && touched.userEmail) || (errorFormAPI && errorFormAPI.userEmailForm) ? "red" : "#ccc"}`}
                          errorMessage={`${(errors.userEmail && touched.userEmail) ? `${errors.userEmail}` : (errorFormAPI && errorFormAPI.userEmailForm) ? `${errorFormAPI.userEmailForm}` : ``}`}
                        // errorColor='magenta'
                        />


                        <Text style={{ fontWeight: 500, color: '#002E59', marginBottom: 10 }}>Enter your registered email to receive OTP</Text>

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
                          style={{ marginTop: 50 }}>Send </CustomButton1>
                      {/* </KeyboardAvoidingView> */}

                    {/* </TouchableWithoutFeedback> */}

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

export default ForgetPassword

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