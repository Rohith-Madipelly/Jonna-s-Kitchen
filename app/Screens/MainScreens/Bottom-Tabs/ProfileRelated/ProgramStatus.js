import { Alert, ImageBackground, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Loader1 from '../../../../Utils/Loader1'
import { useDispatch, useSelector } from 'react-redux'
import { GET_PROGRAM_PAUSE_REQUEST_APIs, GET_PROGRAM_STATUS_API, GET_USER_BY_EMAIL_API } from '../../../../Utils/ApiCalls'
import { ServerError, ServerTokenError_Logout } from '../../../../Utils/ServerError'
import { DateHelper } from '../../../../Utils/DateHelper'
import { useNavigation } from '@react-navigation/native'
import { SettingStyleing } from '../../../../Components/UI/GlobalStylesCss'
import CustomToaster from '../../../../Utils/CustomToaster'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native'
import { CustomAlerts_Continue } from '../../../../Utils/CustomReuseAlerts'
const ProgramStatus = () => {

  const [spinnerBool, setSpinnerbool] = useState(false)
  let tokenn = useSelector((state) => state.login.token)
  const [programData, setProgramData] = useState()
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const showAlert = () => {
    Alert.alert(
      "Not Registered",
      "You have not registered for any program. Please registered.",
      [
        // {
        //   text: "Cancel",
        //   style: "cancel",
        //   onPress: ()=> {navigation.goBack()}
        // },

        {
          text: "ok",
          onPress: () => { navigation.goBack() }
          //   onPress: () => { navigation.replace("BottomTabScreen", {
          //     screen: 'More',
          //     params: { screen: 'Healthylifestyleprograms' }
          //   })}
        }
      ]
    )
  }
  const getProgramStatus = async () => {
    setSpinnerbool(true)
    try {
      const res = await GET_PROGRAM_STATUS_API(tokenn)
      if (res) {

        setProgramData(res.data)

        // if(DateHelper.getDayFromToday(`09-10-2024`)){
        //   console.log(DateHelper.getDayFromToday(`11-10-2024`))
        // }




      }
    } catch (error) {
      console.log("Error .. GET_USER_BY_EMAIL_API", error)
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
          showAlert()
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


  useEffect(() => {
    getProgramStatus()
  }, [])




  const ProgramPauseRequest = async () => {
    setSpinnerbool(true)
    try {
      const res = await GET_PROGRAM_PAUSE_REQUEST_APIs(tokenn)
      if (res) {
        console.log(res.data)
        CustomToaster(res.data)
      }
    } catch (error) {
      console.log("Error .. GET_USER_BY_EMAIL_API", error)
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
          showAlert()
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
  return (
    <>
      <Loader1
        visible={spinnerBool}
      />
      {/* <View style={[{ flex: 1, paddingHorizontal: 20 }, SettingStyleing.ImageBackgroundSettings]}> */}
      <ImageBackground
                        source={require('../../../../assets/Images/Background2.png')} // Replace with the actual path to your image
                        style={[SettingStyleing.ImageBackgroundSettings,{ flex: 1, paddingHorizontal: 20 }]}
                        >
        <View style={{ marginTop: 15, alignItems: 'center' }}>
          <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 700, fontSize: 20, textDecorationLine: 'underline' }}>Program Status</Text>
        </View>
        <View style={{ marginTop: 15 }}>
          {/* <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 700, fontSize: 16, color: '#FE7B07' }}>Note</Text> */}
          <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 700, fontSize: 16, color: '#FE7B07',}}>Program Status : <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 500, fontSize: 14, color: '#000000', textAlign: "center" }}>{programData && programData.programStatus} </Text></Text>
          <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 700, fontSize: 16, color: '#FE7B07',}}>Program Duration : <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 500, fontSize: 14, color: '#000000', textAlign: "center" }}>{programData ? <>{DateHelper.getDaysBtwDates(programData.programStartDate, programData.programEndDate)} Days</> : "....."} </Text></Text>

        </View>

        <View style={{ marginTop: 15 }}>
          {/* <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 700, fontSize:16,color:'#FE7B07'}}>Note</Text> */}
          <View style={[{ justifyContent: 'space-between', paddingHorizontal: 2, flexDirection: 'row', alignItems: 'center' }]}>
            <View style={[styles.BoxContainer]}>
              <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 700, fontSize: 16, color: '#FE7B07', textAlign: "center" }}>Starting Date</Text>
              <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 500, fontSize: 14, color: '#000000', textAlign: "center" }}>{programData ? programData.programStartDate : "......"}</Text>
            </View>
            <View style={[styles.BoxContainer]}>
              <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 700, fontSize: 16, color: '#FE7B07', textAlign: "center" }}>End Date</Text>
              <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 500, fontSize: 14, color: '#000000', textAlign: "center" }}>{programData ? programData.programEndDate : "......"}</Text>
            </View>
          </View>


          <View style={[{ justifyContent: 'center', paddingHorizontal: 2, flexDirection: 'row', alignItems: 'center', marginTop: 15, }]}>
            <View style={{}}>
              {/* <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 700, fontSize: 16, color: '#FE7B07', textAlign: "center" }}>Program Status : <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 500, fontSize: 14, color: '#000000', textAlign: "center" }}>{programData && programData.programStatus} </Text></Text> */}
              {/* <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 500, fontSize: 14, color: '#000000', textAlign: "center" }}>{programData?programData.mealPlanDetails.programStartDate:"......"} {DateHelper.getDifferenceBtwDate(programData.mealPlanDetails.programStartDate,programData.mealPlanDetails.endDate)}</Text> */}
              {/* <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 500, fontSize: 14, color: '#000000', textAlign: "center" }}>{programData ? <>Program Duration {DateHelper.getDaysBtwDates(programData.programStartDate, programData.programEndDate)}</> : "....."}</Text> */}
              <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 500, fontSize: 14, color: '#000000', textAlign: "center" }}>{programData ? <>{DateHelper.getDayFromToday(`${programData.programEndDate}`)} days left until the program expires.</> : "....."}</Text>
              {/* <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 500, fontSize: 14, color: '#000000', textAlign: "center" }}>{DateHelper.getDayFromToday('15-10-2024')} out of {DateHelper.getDaysBtwDates('17-09-2024', '15-10-2024')}</Text> */}

            </View>
          </View>

<TouchableOpacity onPress={()=>{
    
      CustomAlerts_Continue(
        `Do you want to change the program status?`,
        `A request will be sent to the admin to change the program status.`,
      
      // `Applying for ${data.jobTitle}`,
      // data.jobTitle,
      () => {
        ProgramPauseRequest()
        // openEmail(data.email, `Apply for ${data.jobTitle}`, "")
        // console.log("OK pressed for", data.jobTitle);
      }
    )
}}>

          {programData && programData.programStatus ? <View style={[styles.BoxContainer, { width: '60%', alignSelf: 'center', marginTop: 10 }]}>

            <FontAwesome5 name="pause" size={24} color="#FE7B07" style={{ alignSelf: 'center' }} />
            <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 500, fontSize: 12, color: '#FE7B07', textAlign: "center" }}>Want to pause your program</Text>
            {/* <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 500, fontSize: 14, color: '#000000', textAlign: "center" }}>{programData ? programData.programEndDate : "......"}</Text> */}
          </View> :
            <View style={[styles.BoxContainer, { width: '80%', alignSelf: 'center', marginTop: 10 }]}>
              <FontAwesome5 name="play-circle" size={24} color="#FE7B07" style={{ alignSelf: 'center' }} />
              {/* <FontAwesome5 name="pause" size={24} color="black" /> */}
              <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 500, fontSize: 12, color: '#FE7B07', textAlign: "center" }}>Want to resume your program</Text>
              {/* <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 500, fontSize: 14, color: '#000000', textAlign: "center" }}>{programData ? programData.programEndDate : "......"}</Text> */}
            </View>}

  
            </TouchableOpacity>

        </View>
</ImageBackground>
      {/* </View> */}
    </>
  )
}

export default ProgramStatus

const styles = StyleSheet.create({

  BoxContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,


    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),


  },
})