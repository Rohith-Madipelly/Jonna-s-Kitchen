import { Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, VirtualizedList } from 'react-native'
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
          <View style={styles.container}>
            <View style={[styles.UpperBox, { justifyContent: 'center', alignItems: 'center' }]}>

              {/* <Image
                style={{ width: 194, height: 67 }}
                animation={"bounceIn"}
                source={require("../../assets/buykeyz logo.png")}
                contentFit="cover"
                transition={1000}
                alt=''
              /> */}

            </View>



            <View style={styles.ContentBox}>

              {/* Title */}
              <View style={{ marginLeft: 10 }}>

                {/* <Title TitleName="Login"></Title> */}
              </View>

              {/* Fields */}
              <View style={{ alignItems: 'center', flex: 0.3, flexDirection: 'column', justifyContent: 'flex-end', alignContent: 'flex-end' }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    // behavior={Platform.OS === "ios" ? 100:0}
                    // keyboardVerticalOffset={5000}
                    style={{ width: '100%', alignItems: 'center' }}
                  >

                   
                  </KeyboardAvoidingView>
                </TouchableWithoutFeedback>

              </View>

              <View style={{ alignItems: 'flex-end', marginBottom: 20 }}>
                <TouchableOpacity onPress={() => { navigation.navigate("EmailVerificationForget") }}>
                  <Text style={[styles.paragraphy, { color: 'black', fontWeight: '400' }]}>Forgot password?</Text>
                </TouchableOpacity>
              </View>


              {/* Buttons */}
              <View style={{ alignItems: 'center', flex: 0.5 }}>



                <View style={{ marginTop: 20, flex: 1, flexDirection: 'row' }}>
                  <Text style={[styles.paragraphy, { color: 'black', fontWeight: '400' }]}>Don't have an account yet? </Text><TouchableOpacity onPress={() => { navigation.navigate("EmailVerification") }} style={{}}><Text style={[styles.paragraphy, { color: 'black', fontWeight: '500' }]}> Create an account</Text></TouchableOpacity>
                </View>

              </View>

            </View>


          </View>


        </ScrollView>

      </View>
    </>

  )
}

export default Login

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