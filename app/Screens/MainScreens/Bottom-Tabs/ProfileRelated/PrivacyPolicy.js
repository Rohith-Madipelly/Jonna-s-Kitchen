import { Alert, StyleSheet, Text, View } from 'react-native' 
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PRIVACY_POLICY_API } from '../../../../Utils/ApiCalls'
import { ServerError, ServerTokenError_Logout } from '../../../../Utils/ServerError'
import { ScrollView } from 'react-native'
import Loader1 from '../../../../Utils/Loader1'

const PrivacyPolicy = () => {


  const [spinnerBool, setSpinnerbool] = useState(false)
  let tokenn = useSelector((state) => state.login.token)
  const [PrivacyText, setPrivacyPolicy] = useState()
  const dispatch = useDispatch()

  const getPrivacyPolicy = async () => {
    setSpinnerbool(true)
    try {
      const res = await PRIVACY_POLICY_API(tokenn)

      // console.log("Hejsd ,", res.data[0].content)
      setPrivacyPolicy(res.data[0].content)

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


  useEffect(() => {
    getPrivacyPolicy()
  }, [])
  return (
    <>
      <Loader1
        visible={spinnerBool}
      />
      <View style={{ flex: 1 }}>
        <View style={{ marginTop: 15, alignItems: 'center', paddingHorizontal: 20 }}>
          <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 700, fontSize: 20, textDecorationLine: 'underline' }}>Privacy Policy</Text>
        </View>
        <ScrollView style={{ marginTop: 15, paddingHorizontal: 20 }}>
          <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 700, fontSize: 16, color: '#FE7B07' }}>Note</Text>
          <Text style={{
            fontFamily: 'BalooTamma2', fontSize: 16, fontWeight: 600, color: 'black',
            lineHeight: 24,
            marginVertical: 5,
          }}>{PrivacyText}</Text>
        </ScrollView>

      </View>
    </>
  )
}

export default PrivacyPolicy

const styles = StyleSheet.create({})