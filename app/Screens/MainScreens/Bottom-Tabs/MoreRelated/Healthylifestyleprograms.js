import { Button, Image, FlatList, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View, Alert } from "react-native";


import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Entypo, FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import CustomButton1 from "../../../../Components/UI/Buttons/CustomButton1";
import BackTable from "../../../BackTable";
import Programs from "./reuse/Programs";
import Programs2 from "./reuse/Programs2";
import ProgramsTest from "./reuse/ProgramsTest";
import { GetAllProgramsAPI } from "../../../../Utils/ApiCalls";
import Programs2Test from "./reuse/Programs2Test";
import { SettingStyleing } from "../../../../Components/UI/GlobalStylesCss";



const Healthylifestyleprograms = () => {
  const navigation = useNavigation();

  const [spinnerBool, setSpinnerbool] = useState(false)

  const [errorFormAPI, seterrorFormAPI] = useState("")
  const [APICallData, setApiCallData] = useState([])

  const dispatch = useDispatch();
  const scrollViewRef = useRef(null);



  const HealthyProgramsData = [
  ]
  let tokenn = useSelector((state) => state.login.token);

  const ProgramsAPICaller = async () => {
    seterrorFormAPI() //Clear's All API errors
    try {
      setSpinnerbool(true)
      const res = await GetAllProgramsAPI(tokenn)
      if (res) {
        console.log("csmnb><><>",res.data[1])
        setApiCallData(res.data)
      }

    } catch (error) {
      console.log("ds", error)
      if (error.response) {
        if (error.response.status === 400) {
          console.log("Error With 400.", error.response.data)
          seterrorFormAPI({ passwordForm: `${error.response.data.message}` })
        }
        else if (error.response.status === 401) {
          seterrorFormAPI({ userEmailForm: `${error.response.data.message}` })
        }
        else if (error.response.status === 403) {
          console.log("error.response.status login", error.response.data.message)
        }
        else if (error.response.status === 404) {
          console.log("cvd", error.response.data)
          ServerTokenError_Logout(undefined, undefined, dispatch)
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
      // setRefreshing(false);
    }
  }




  useEffect(() => {
    ProgramsAPICaller()
  }, [])




  return (
    <ImageBackground
      source={require('../../../../assets/Images/Background1.png')} // Replace with the actual path to your image

      style={[styles.container,SettingStyleing.ImageBackgroundSettings]}
      >

      <ScrollView
       keyboardShouldPersistTaps="handled" 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
      >

        <View style={{ marginHorizontal: 20, flex: 1 }}>

          <View style={{ flex: 0.9 }}>


            <Text style={{
              fontWeight: '400', fontFamily: 'BalooTamma2-Bold', fontSize: 24,
              color: '#FE7B07',
              marginBottom: -10
            }}>Jonnas Kitchen</Text>

            <Text style={{
              fontWeight: '400',
              fontFamily: 'BalooTamma2-Bold', fontSize: 24,
              color: '#177137'
            }}>Healthy lifestyle programs</Text>

            <View style={{}}>
              <Text style={[styles.TextFamilyA1, { fontWeight: '400', fontSize: 14 },]}>
                Our plans are purely based on home cooking.
              </Text>

              <Text style={[styles.TextFamilyA1, { fontWeight: '400', fontSize: 14, marginTop: -1 },]}>
                I believe the Mantra <Text style={[{ fontWeight: '700', fontSize: 14 }, styles.TextFamilyA2]}>
                  “LET FOOD BE YOUR MEDICINE” </Text>
                and <Text style={[{ fontWeight: '700', fontSize: 14 }, styles.TextFamilyA2]}> “KITCHEN BE YOUR HOSPITAL”.
                </Text>
              </Text>

            </View>


            {APICallData && APICallData.map((item, index) => (
              <View key={index}>
                {index % 2 === 0 ? (
                  <ProgramsTest data={APICallData[index]} />
                ) : (
                  <Programs2Test data={APICallData[index]} />
                )}
              </View>
            ))}

            {!APICallData ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

             <Text style={{
              fontWeight: '400',
              fontFamily: 'BalooTamma2-Bold', fontSize: 18,
              
            }}>No Programs found</Text>

            </View> : ""}
            {/* <Programs /> */}



          </View>

        </View>

      </ScrollView>
    </ImageBackground>
  )
}

export default Healthylifestyleprograms

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  ContentBox: {
    flex: 0.7,
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    overflow: 'hidden',
    paddingTop: 36,
    paddingHorizontal: 17
  },
  TextFamilyA1: {
    fontFamily: 'BalooTamma2'
  },
  TextFamilyA2: {
    fontFamily: 'BalooTamma2-Bold'
  },
})

