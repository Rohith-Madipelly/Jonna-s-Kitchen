import { Alert, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Loader1 from '../../../../Utils/Loader1'
import { useDispatch, useSelector } from 'react-redux'
import { GET_USER_BY_EMAIL_API } from '../../../../Utils/ApiCalls'
import { ServerError, ServerTokenError_Logout } from '../../../../Utils/ServerError'
import { DateHelper } from '../../../../Utils/DateHelper'
import { useNavigation } from '@react-navigation/native'
import { SettingStyleing } from '../../../../Components/UI/GlobalStylesCss'

const ProgramStatus = () => {

  const [spinnerBool, setSpinnerbool] = useState(false)
  let tokenn = useSelector((state) => state.login.token)
  const [programData, setProgramData] = useState()
  const dispatch = useDispatch()
const navigation=useNavigation()

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
          onPress: ()=> {navigation.goBack()}
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
      const res = await GET_USER_BY_EMAIL_API(tokenn)
      if(res){

        setProgramData(res.data)
        console.log(res.data.mealPlanDetails.endDate)

        if(DateHelper.getDayFromToday(`09-10-2024`)){
          console.log(DateHelper.getDayFromToday(`11-10-2024`))
        }

        

        
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
  return (
    <>
      <Loader1
        visible={spinnerBool}
      />
      <View style={[{ flex: 1, paddingHorizontal: 20 },SettingStyleing.ImageBackgroundSettings]}>
        <View style={{ marginTop: 15, alignItems: 'center' }}>
          <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 700, fontSize: 20, textDecorationLine: 'underline' }}>Program Status</Text>
        </View>
        <View style={{ marginTop: 15 }}>
          <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 700, fontSize: 16, color: '#FE7B07' }}>Note</Text>
        </View>

        <View style={{ marginTop: 15 }}>
          {/* <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 700, fontSize:16,color:'#FE7B07'}}>Note</Text> */}
          <View style={[{ justifyContent: 'space-between', paddingHorizontal: 2, flexDirection: 'row', alignItems: 'center' }]}>
            <View style={[styles.BoxContainer]}>
              <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 700, fontSize: 16, color: '#FE7B07', textAlign: "center" }}>Starting Date</Text>
              <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 500, fontSize: 14, color: '#000000', textAlign: "center" }}>{programData ? programData.mealPlanDetails.dietStartDate : "......"}</Text>
            </View>
            <View style={[styles.BoxContainer]}>
              <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 700, fontSize: 16, color: '#FE7B07', textAlign: "center" }}>End Date</Text>
              <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 500, fontSize: 14, color: '#000000', textAlign: "center" }}>{programData ? programData.mealPlanDetails.endDate : "......"}</Text>
            </View>
          </View>

          <View style={[{ justifyContent: 'center', paddingHorizontal: 2, flexDirection: 'row', alignItems: 'center', marginTop: 15, }]}>
            <View style={{}}>
              <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 700, fontSize: 16, color: '#FE7B07', textAlign: "center" }}>Reaming day</Text>
              {/* <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 500, fontSize: 14, color: '#000000', textAlign: "center" }}>{programData?programData.mealPlanDetails.dietStartDate:"......"} {DateHelper.getDifferenceBtwDate(programData.mealPlanDetails.dietStartDate,programData.mealPlanDetails.endDate)}</Text> */}
              <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 500, fontSize: 14, color: '#000000', textAlign: "center" }}>{programData ?<>{DateHelper.getDayFromToday(`${programData.mealPlanDetails.endDate}`)} out of {DateHelper.getDaysBtwDates(programData.mealPlanDetails.dietStartDate, programData.mealPlanDetails.endDate)}</>:"....."}</Text>
              {/* <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 500, fontSize: 14, color: '#000000', textAlign: "center" }}>{DateHelper.getDayFromToday('15-10-2024')} out of {DateHelper.getDaysBtwDates('17-09-2024', '15-10-2024')}</Text> */}

            </View>
          </View>




        </View>

      </View>
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