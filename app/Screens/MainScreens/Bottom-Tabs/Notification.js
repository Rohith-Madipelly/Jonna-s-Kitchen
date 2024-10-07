import { Alert, Button, FlatList, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import CustomToaster from '../../../Utils/CustomToaster'
import { useDispatch, useSelector } from 'react-redux'
import Loader1 from '../../../Utils/Loader1'
import { ServerError, ServerTokenError_Logout } from '../../../Utils/ServerError'
import { DELETE_NOTIFICATION_BY_ID_API, GET_ALL_NOTIFICATIONS_API } from '../../../Utils/ApiCalls'
import Metrics from '../../../Utils/ResposivesUtils/Metrics'

import AntDesign from '@expo/vector-icons/AntDesign';

const Notification = () => {
  const navigation = useNavigation()
  const [spinnerBool, setSpinnerbool] = useState(false)
  let tokenn = useSelector((state) => state.login.token)
  const dispatch = useDispatch()
  const [notificationsList, setNotificationsList] = useState()
  const [noData, setNodata] = useState()

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllNotifications()

  }, []);

  const getAllNotifications = async () => {
    setSpinnerbool(true)
    try {
      const res = await GET_ALL_NOTIFICATIONS_API(tokenn)
      setNotificationsList(res.data)

    } catch (error) {
      console.log("Error ..", error)
      setNotificationsList()
      if (error.response) {
        if (error.response.status === 400) {
          console.log("Error With 400.", error.response.data)
          setNodata(error.response.data.message)
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
    getAllNotifications()
  }, [])




  const DeleteNotifications = async (notificationId) => {
    setSpinnerbool(true)
    try {
      const res = await DELETE_NOTIFICATION_BY_ID_API(notificationId, tokenn)
      if (res.data) {
        getAllNotifications()
      }

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



  return (
    <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
      <Loader1
        visible={spinnerBool}
      />
      <View style={{ flexDirection: 'row', }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => { navigation.goBack() }}>
            <Image style={{ width: 27, height: 27, transform: [{ rotate: '180deg' }], }} source={require("../../../assets/Images/Arrow.png")} />
          </TouchableOpacity>
        </View>

        <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 700, fontSize: 20, flex: 0.8, textAlign: 'center' }}>Notifications</Text>
        <Image style={{ width: 24, height: 24, flex: 0.2 }}
          source={require('../../../assets/Images/Home/Ball.png')}
          resizeMode={"contain"} />
      </View>
      {/* {notificationsList && <FlatList */}
      <FlatList
        data={notificationsList}
        renderItem={({ item, index }) => {
          console.log("Sd")

          return (
            <View style={{ height: Metrics.rfv(60), backgroundColor: 'white', marginVertical: 5, borderRadius: 10, padding: 10, justifyContent: 'space-between', flexDirection: 'row' }}>
              <View style={{}}>
                <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 700, fontSize: 16, color: '#00000080', }}>{item.title}</Text>
                <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 500, fontSize: 12, color: '#00000080', }}>{item.body}</Text>
              </View>
              <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => {
                console.log("Hello", item.notificationId);
                DeleteNotifications(item.notificationId)
              }}>
                <AntDesign name="close" size={20} color="black" />
              </TouchableOpacity>
            </View>

          )
        }}

        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }


        ListEmptyComponent={
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: Metrics.rfv(700), }}>
            <Text
              style={{
                fontFamily: 'BalooTamma2',
                fontWeight: '500',
                fontSize: 20,
                color: '#00000080',
                textAlign: 'center',
                marginVertical: 20,
              }}
            >
              No notification 
            </Text>
          </View>
        }
      />

    </View>
  )
}

export default Notification

const styles = StyleSheet.create({})