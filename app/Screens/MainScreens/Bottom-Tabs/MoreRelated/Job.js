import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native';
import CustomButton1 from '../../../../Components/UI/Buttons/CustomButton1';



import { Entypo, FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import { FlatList } from 'react-native';
import CustomToolKitHeader from '../../../../Components/UI/CustomToolKitHeader';
import { GET_ALL_JOBS } from '../../../../Utils/ApiCalls';
import { useSelector } from 'react-redux';
import Loader1 from '../../../../Utils/Loader1';
import { Alert } from 'react-native';

import { CustomAlerts_Continue } from '../../../../Utils/CustomReuseAlerts';
import { openEmail } from '../../../../Utils/Linkings/OpenEmail';

const MorePage = ({ navigation }) => {

  const [jobOpeningsData, setJobOpeningsData] = useState([])
  const [spinnerBool, setSpinnerbool] = useState(false)

  let tokenn = useSelector((state) => state.login.token)

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    JobFetch()
  
  }, []);

  const JobFetch = async () => {
    setSpinnerbool(true)
    try {
      const res = await GET_ALL_JOBS(tokenn)
      // console.log(res.data)
      setJobOpeningsData(res.data)
    } catch (error) {
      console.log(error)
      if (error.response) {
        if (error.response.status === 400) {
          console.log("Error With 400.", error.response.data)
        }
        else if (error.response.status === 401) {
          console.log("Error With 401.", error.response.data)
        }
        else if (error.response.status === 403) {
          console.log("error.response.status login", error.response.data.message)
        }
        else if (error.response.status === 404) {
          console.log("error.response.status login", error.response.data.message)
        }
        else if (error.response.status === 500) {
          console.log("Internal Server Error", error.message)
        }
        else {
          console.log("An error occurred response.>>", error.message)
          Alert.alert("An error occurred response", error.message)

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
    }
    finally {
      setSpinnerbool(false)
      setRefreshing(false);
    }
  }

  useEffect(() => {
    JobFetch()
  }, [])

  return (
    <>
      <Loader1
        visible={spinnerBool}
      />
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('../../../../assets/Images/Background1.png')} // Replace with the actual path to your image
          style={styles.container}
        >
          <View style={{ flex: 0.08 }}>
            <CustomToolKitHeader componentName={"Job Postings"} textDecorationLine={'underline'} />
          </View>

          <ScrollView  keyboardShouldPersistTaps="handled"  style={{ flex: 1, paddingHorizontal: 18, }}>
            {/* <Image style={{ width: '100%', height: 300 }} source={require("../../../../assets/Images/NoOpenings.png")} resizeMode="contain" /> */}

            {jobOpeningsData.map((data, index) => (
              <TouchableOpacity key={index} style={{ backgroundColor: 'white', margin: 5, padding: 10, borderRadius: 20, paddingLeft: 20 }}
                onPress={() => {
                  console.log("dsca", data.jobTitle)
                  CustomAlerts_Continue(
                    `You're leaving our app`,
                    `This action is attempting to open an external app. Would you like to continue ?`,
                    // `Applying for ${data.jobTitle}`,
                    // data.jobTitle,
                    () => {
                      openEmail(data.email, `Apply for ${data.jobTitle}`, "")
                      console.log("OK pressed for", data.jobTitle);
                    }
                  )
                }}>
                <Text style={{ fontWeight: 700 }}>
                  {data.jobTitle}
                </Text>
                <Text>{data.description}</Text>
              </TouchableOpacity>
            ))}

            {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Image style={{ width: '100%', height: 300 }} source={require("../../../../assets/Images/officeWork.png")} resizeMode="contain" />
              <Image style={{ width: '100%', height: 300 }} source={require("../../../../assets/Images/officeWork.png")} resizeMode="contain" />
            </View> */}

          </ScrollView>
        </ImageBackground>
      </View >
    </>
  )
}

export default MorePage

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