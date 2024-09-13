import { Alert, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native';
import CustomButton1 from '../../../../Components/UI/Buttons/CustomButton1';



import { Entypo, FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import { FlatList } from 'react-native';
import CustomToolKitHeader from '../../../../Components/UI/CustomToolKitHeader';
import { ServerError } from '../../../../Utils/ServerError';
import Loader1 from '../../../../Utils/Loader1';
import { useSelector } from 'react-redux';
import { Get_Articles_BY_ID_API } from '../../../../Utils/ApiCalls';
import LoadingImage from '../../../../Components/UI/ImageConatiners/LoadingImage';

const Article = ({ navigation, route }) => {

  const { params } = route;
  const id = params?.id || 'nan';
  console.log("userEmail OtpScreenForgot >", id)

  const [spinnerBool, setSpinnerbool] = useState(false)
  const [ArticleData, setArticleData] = useState()


  let tokenn = useSelector((state) => state.login.token);


  try {
    if (tokenn != null) {
      tokenn = tokenn.replaceAll('"', '');
    }
  }
  catch (err) {
    console.log("Error in token quotes", err)
    if (err.response.status === 500) {
      console.log("Internal Server Error", err.message)
    }
  }

  const getAllArticles = async () => {
    console.log("dcs")
    try {
      setSpinnerbool(true)
      const res = await Get_Articles_BY_ID_API(id, tokenn)

      setArticleData(res.data)
      if (res) {

        console.log(res.data)
      }

    } catch (error) {
      if (error.response) {
        console.log("df")
        if (error.response.status === 400) {
          console.log("Error With 400.", error.response.data)
        }
        else if (error.response.status === 401) {
        }
        else if (error.response.status === 403) {
        }
        else if (error.response.status === 404) {
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
    }
  }



  useEffect(() => {
    getAllArticles()
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

          <View style={{ flex: 1 }}>

            <View style={{ flex: 0.08 }}>
              <CustomToolKitHeader componentName={"Articles"} />
            </View>


            <ScrollView style={{ flex: 0.95, paddingHorizontal: 18, marginTop: 20 }}>
              <Text style={{ color: '#000000', fontSize: 20, fontWeight: 700, fontFamily: 'BalooTamma2-Bold', textDecorationLine: 'underline', lineHeight: 20 }}>{ArticleData.title}</Text>
              <ImageBackground
                // source={} // Replace with the actual path to your image
                // source={require('../../../../assets/Images/thinkBox.png')} // Replace with the actual path to your image
                style={[styles.container, { width: '100%', height: 250 }]} resizeMode="contain"
              >



                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>

                  <LoadingImage
                    // source={item.recipieImage}
                    source={{ uri: ArticleData.image }}
                    style={{
                      width: '100%', // Take up the full width of the parent
                      // height: '100%',
                      backgroundColor: "pink",
                      borderRadius: 15,
                      // resizeMode: 'contain', // Maintain aspect ratio without stretching
                      resizeMode: 'cover', // Maintain aspect ratio without stretching
                    }}
                  />
                </View>

              </ImageBackground>

              <ScrollView style={{ backgroundColor: '#000000', borderRadius: 20, padding: 15, marginTop: 20 }}>
                <Text style={{ color: 'white', fontSize: 14, fontWeight: 500, fontFamily: 'BalooTamma2', lineHeight: 20 }}>
                  {ArticleData.description}
                  {ArticleData.description}
                </Text>
              </ScrollView>
            </ScrollView>




          </View>
        </ImageBackground>
      </View>
    </>
  )
}

export default Article

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