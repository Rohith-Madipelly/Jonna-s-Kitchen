import { Alert, Image, ImageBackground, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'


import CustomToolKitHeader from '../../../Components/UI/CustomToolKitHeader';
import onShare from '../../../Utils/ShareBtn';
import { APP_LINK } from '../../../Enviornment';
import SelectedFullCourse from '../../SelectedFullCourse';
import CarouselsBasic from '../../../Components/UI/CarouselsBasic/CarouselsBasic';
import SkeletonLoader from '../../../Components/UI/Skeletons/SkeletonLoader';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';
import { ServerError, ServerTokenError_Logout } from '../../../Utils/ServerError';
import { GET_ALL_BANNERS_API } from '../../../Utils/ApiCalls';


const Home = ({ navigation }) => {


  let userName = useSelector((state) => state.SetUserName.userName);
  let tokenn = useSelector((state) => state.login.token)

  const [loadingComponent, setLoadingComponent] = useState(true)
  const [Data, setData] = useState("")

  const DATA12 = [
    {
      "image": require('../../../assets/Images/Home/HomeBanner1.png'),
      onPress: () => { console.log("sd") }
    },
    {
      "image": require('../../../assets/Images/Home/HomeBanner1.png'),
      onPress: () => { console.log("sd") }
    },
    {
      "image": require('../../../assets/Images/Home/HomeBanner1.png'),
      onPress: () => { console.log("sd") }
    },
    {
      "image": require('../../../assets/Images/Home/HomeBanner1.png'),
      onPress: () => { console.log("sd") }
    },


  ];

  const HomeBanners = async () => {
    try {
      const res = await GET_ALL_BANNERS_API(tokenn)

      if(res)
      {
        // console.log("Res >",res.data)
        setData(res.data)
      }
    } catch (error) {
      console.log("Error in APi Call in GET_ALL_BANNERS_API >", error.response)
      if (error.response) {
        if (error.response.status === 400) {

        }
        else if (error.response.status === 401) {
          console.log("Error With 401", error.response.data)
        }
        else if (error.response.status === 403) {
          console.log("Error With 403", error.response.data.message)
        }
        else if (error.response.status === 404) {
          console.log("Error With 404", error.response.data.message)
          ServerTokenError_Logout(undefined, undefined, dispatch)
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
        console.log("Error in Setting up the Request.")
      }

    } finally {
      // console.log("Finally >")
      setTimeout(() => {
        setLoadingComponent(false)
      }, 2000);
    }
  }



  useEffect(() => {
    HomeBanners()
  }, [])







  return (
    <>
      <StatusBar
        animated={true}
        // backgroundColor="white"
        barStyle={'dark-content'}
      />
      <View style={{ flex: 1 }}>


        <View style={{ flex: 1 }}>

          <ScrollView style={{ flex: 1 }}>
            <ImageBackground
              source={require('../../../assets/Images/Background2.png')} // Replace with the actual path to your image
              style={[styles.container, {
                // paddingHorizontal: 18, 
                paddingTop: 20, resizeMode: 'contain'
              }]}
            >
              <View style={[{ flex: 0.3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 18, }, styles.containerCard]}>
                <View style={{ flex: 0.5 }}>
                  <Text style={{ color: '#0A3118', fontFamily: 'BalooTamma2-Bold', fontWeight: 700, fontSize: 16 }}>Hello</Text>
                  <Text style={{ color: '#FE7B07', fontFamily: 'BalooTamma2-Bold', fontWeight: 700, fontSize: 20 }} numberOfLines={1}>{userName}</Text>
                </View>

                <View style={{ flex: 0.5, justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => { navigation.navigate('Notification') }} style={{}}>
                    <Image style={{ width: 24, height: 24, }}
                      source={require('../../../assets/Images/Home/Ball.png')}
                      resizeMode={"contain"} />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => { onShare(APP_LINK) }} style={{ marginLeft: 20 }}>
                    <Image style={{ width: 24, height: 24, }}
                      source={require('../../../assets/Images/Home/Share.png')}
                      resizeMode={"contain"} />
                  </TouchableOpacity>
                </View>
              </View>



              <View style={{ flex: 0.7, marginTop: 20 }}>
                {loadingComponent ? <View style={{ height: 200, marginHorizontal: 18, marginTop: 20, }}>
                  <SkeletonLoader width={200} height={159} borderRadius={5} />
                </View> : <CarouselsBasic DATA={Data} autoScroll={true} showIndicators={true} />}


                {loadingComponent ? <View style={{ height: 900, marginHorizontal: 18, marginTop: 20, borderRadius: 40, overflow: 'hidden' }}>
                  <SkeletonLoader width={200} height={900} borderRadius={5} />
                </View> : <SelectedFullCourse />}

                <View style={{ height: 20 }}>

                </View>
              </View>
            </ImageBackground>
          </ScrollView>
        </View>
      </View>
    </>
  )
}

export default Home

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
  },
  containerCard: {
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
        elevation: 3,
      },
    }),


  },
})