import { Alert, Image, ImageBackground, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native';
import CustomButton1 from '../../../../Components/UI/Buttons/CustomButton1';



import { Entypo, FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import { FlatList } from 'react-native';
import CustomToolKitHeader from '../../../../Components/UI/CustomToolKitHeader';
import { ServerError } from '../../../../Utils/ServerError';
import { Get_Articles_API } from '../../../../Utils/ApiCalls';
import { useSelector } from 'react-redux';
import Loader1 from '../../../../Utils/Loader1';

const ArticlesList = ({ navigation }) => {

  const [spinnerBool, setSpinnerbool] = useState(false)
  const [ArticleData, setArticleData] = useState([])

  
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllArticles()
  
  }, []);

  let tokenn = useSelector((state) => state.login.token);

  const getAllArticles = async () => {
    console.log("dcs")
    try {
      setSpinnerbool(true)
      const res = await Get_Articles_API(tokenn)
      if (res) {
        setArticleData(res.data)
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
       setRefreshing(false);
    }
  }



  useEffect(() => {
    getAllArticles()
  }, [])


  if (!ArticleData) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Article Data Loading ...</Text>
      </View>
    )
  }
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
            <CustomToolKitHeader componentName={"Articles List"} textDecorationLine={'underline'} />
          </View>


          <ScrollView style={{ flex: 0.95, paddingHorizontal: 18, marginTop: 20 }}
          
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  }
>
            {/* <Text style={{ color: '#000000', fontSize: 20, fontWeight: 700, fontFamily: 'BalooTamma2-Bold', textDecorationLine: 'underline', lineHeight: 20 }}>Articles</Text> */}

            {ArticleData.map((data, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => { navigation.navigate('Article', { id: data.id }) }}

                style={{ backgroundColor: 'white', width: '100%', height: 40, marginVertical: 10, paddingVertical: 10, paddingHorizontal: 10, paddingLeft: 15, borderRadius: 15, elevation: 3 }}>
                <Text>{data.title} </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

        </ImageBackground>
      </View>
    </>
  )
}

export default ArticlesList

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