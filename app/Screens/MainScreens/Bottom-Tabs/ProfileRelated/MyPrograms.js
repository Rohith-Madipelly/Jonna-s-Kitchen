import { Alert, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MY_DIET_PLAN_API, PRIVACY_POLICY_API } from '../../../../Utils/ApiCalls'
import { ServerError, ServerTokenError_Logout } from '../../../../Utils/ServerError'
import { ScrollView } from 'react-native'
import Loader1 from '../../../../Utils/Loader1'
import ProgramsTest from '../MoreRelated/reuse/ProgramsTest'
import Metrics from '../../../../Utils/ResposivesUtils/Metrics'
import { useNavigation } from '@react-navigation/native'

const MyPrograms = () => {


    const [spinnerBool, setSpinnerbool] = useState(false)
    let tokenn = useSelector((state) => state.login.token)
    const [myDietPlanData, setMyDietPlanData] = useState()
    const dispatch = useDispatch()

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getDietPlan()
    }, []);

    const navigation = useNavigation()

    const getDietPlan = async () => {
        setSpinnerbool(true)
        try {
            const res = await MY_DIET_PLAN_API(tokenn)
            if (res.data) {
                setMyDietPlanData(res.data.program)
                console.log(res.data.program)
            }
        } catch (error) {
            console.log("Error ..", error)
            if (error.response) {
                if (error.response.status === 400) {
                    showAlert()
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
            setRefreshing(false);
        }

    }


    useEffect(() => {
        getDietPlan()
    }, [])



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


    return (
        <>
            <Loader1
                visible={spinnerBool}
            />
            <View style={{ flex: 1 }}>
                <View style={{ marginTop: 15, alignItems: 'center', paddingHorizontal: 20 }}>
                    <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 700, fontSize: 20, textDecorationLine: 'underline' }}>My Diet Plan</Text>
                </View>
                <ScrollView   keyboardShouldPersistTaps="handled"  style={{ marginTop: 15, paddingHorizontal: 20}}

                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    {/* <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 700, fontSize: 16, color: '#FE7B07' }}>Note</Text> */}
                     <View style={{ flex: 1 }}>
                        {myDietPlanData ? <ProgramsTest data={myDietPlanData} RegisterBtn={false} /> :
                            <View style={{flex:1,justifyContent:'center'}}>
                                {/* <Text>You have not selected any program </Text>
                                <Text>For viewing the</Text> */}
                            </View>}
                    </View>

                </ScrollView>

            </View>
        </>
    )
}

export default MyPrograms

const styles = StyleSheet.create({})