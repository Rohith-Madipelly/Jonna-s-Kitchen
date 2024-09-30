import { Alert, Image, ImageBackground, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native';
import CustomButton1 from '../../../../Components/UI/Buttons/CustomButton1';



import { Entypo, FontAwesome, SimpleLineIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList } from 'react-native';
import CustomToolKitHeader from '../../../../Components/UI/CustomToolKitHeader';
import CarouselWithButton from '../../../../Components/UI/CarouselsWithPackage/CarouselWithButton';
import { GET_ALL_TESTIMONIALS } from '../../../../Utils/ApiCalls';
import { useSelector } from 'react-redux';
import Loader1 from '../../../../Utils/Loader1';


const Testimonials = ({ navigation }) => {
  const [spinnerBool, setSpinnerbool] = useState(false)
  const [Data, setData] = useState([])
  const [result,setResult]=useState("Loading ......")


  let tokenn = useSelector((state) => state.login.token)

  useEffect(() => {
    TestimonialsFetch()
  }, [])


  const TestimonialsFetch = async () => {
    setSpinnerbool(true)
    try {
      const res = await GET_ALL_TESTIMONIALS(tokenn)

      setData(res.data)
    } catch (error) {
      setResult("Testimonials not found")
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
        else if (error.response.status === 503) {
          console.log("Internal Server Error", error.message)
          Alert.alert("Internal Server Error", error.message)
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
    }
  }


  const AboutImageData = [
    { id: 1, label: '1', image: require("../../../../assets/Images/Carousels/Transformations/Testimonials1.png") },
    { id: 2, label: '2', image: require("../../../../assets/Images/Carousels/Transformations/Testimonials2.png") },
    { id: 3, label: '3', image: require("../../../../assets/Images/Carousels/Transformations/Testimonials3.png") },
    // { id: 4, label: '1', image: require("../../../../assets/Images/Carousels/Transformations/Testimonials1.png") },
    // { id: 2, label: '1', image: require("../../../../assets/Images/Carousels/WelcomeTransformation1.png") },
  ]

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
              <CustomToolKitHeader componentName={"Testimonials"} textDecorationLine={'underline'} />
            </View>


            <ScrollView style={{ flex: 0.95, marginTop: 20 }}>
              <View style={[{ flex: 1, height: 316 }, styles.containerCard]}>

                <View style={{ flex: 0.1, justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 18, marginTop: 10 }}>
                  <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 600, fontSize: 16 }}>Testimonials</Text>
                  <Text style={{ color: '#FE7B07', fontFamily: 'BalooTamma2', fontWeight: 700, fontSize: 14, textDecorationLine: 'underline' }}>
                    {/* View all */}
                    </Text>
                </View>

                <View style={{ flex: 0.9, marginBottom: 25, }}>
                  {Data.length !== 0 ? <CarouselWithButton DATA={Data} autoPlay={false} scrollAnimationDuration={1000} /> :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <Text>{result}</Text>
                    </View>}
                </View>


                <View>

                </View>
              </View>
            </ScrollView>




          </View>
        </ImageBackground>
      </View>
    </>
  )
}

export default Testimonials

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerCard: {
    // padding: 10,

    backgroundColor: 'white',
    borderRadius: 20,
    // paddingHorizontal: 10,
    marginHorizontal: 10,


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
    // paddingHorizontal: 17
  }
})