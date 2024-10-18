import { Alert, Dimensions, Image, ImageBackground, Platform, RefreshControl, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import CustomButton1 from '../../../../Components/UI/Buttons/CustomButton1';
import { Entypo, FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import { FlatList } from 'react-native';
import CustomToolKitHeader from '../../../../Components/UI/CustomToolKitHeader';
import LoadingImage from '../../../../Components/UI/ImageConatiners/LoadingImage';
import CarouselsBasic from '../../../../Components/UI/CarouselsBasic/CarouselsBasic';
import { ServerTokenError_Logout } from '../../../../Utils/ServerError';
import { ABOUT_US_API, GET_ALL_BANNERS_API } from '../../../../Utils/ApiCalls';
import { useSelector } from 'react-redux';
import Loader1 from '../../../../Utils/Loader1';
import { SettingStyleing } from '../../../../Components/UI/GlobalStylesCss';

const { width } = Dimensions.get('screen');

const AboutUS = ({ navigation }) => {

  const AboutData = [
    { id: '1', content: "Jonnas kitchen is an online nutrition platform, with the mission to make health and fitness accessible to everyone out there!" },
    { id: '2', content: "I help transform my clients by inculcating the right eating habits, solving lifestyle issues, building motivation, dispelling myths around food, body, and mind." },
    { id: '3', content: "I always had a dream of becoming a doctor and choose science background as my career, due to unavoidable circumstances had to step in IT field but I never had my job satisfaction." },
    { id: '4', content: "We often get judged by our body, some say first impression is the best impression. One day, just like everyone, I have been judged, commented on, abused, and much more about my body which really hurt my mind and body. Apart from this, I have also suffered with infertility, resulting in much more abuse towards my married life." },
    { id: '5', content: "That’s when the interest in FOOD n NUTRITION has strongly registered in my mind and I first transformed myself and helped transform my clients across the globe and also helped in conceiving Naturally." },
    { id: '6', content: "I’m now a Internationally certified Weight management specialist, Further continued my education in Diploma in Dietetics and Now Pursing now PG. Diploma in Adv. Nutrition and Dietetics, specialization in clinical Nutrition and Diabetologist." },
  ];

  const AboutImageData = [
    { id: 1, label: '1', image: require("../../../../assets/Images/Carousels/Banners/BannerSom1.png") },
    { id: 2, label: '2', image: require("../../../../assets/Images/Carousels/Banners/BannerSom2.png") },
    { id: 3, label: '3', image: require("../../../../assets/Images/Carousels/Banners/BannerSom3.png") },
    { id: 4, label: '1', image: require("../../../../assets/Images/Carousels/Banners/BannerSom4.png") },
    // { id: 2, label: '1', image: require("../../../../assets/Images/Carousels/WelcomeTransformation1.png") },
  ]

  
  const [Data, setData] = useState([])
  const [banners, setBanners] = useState([])
  const [spinnerBool, setSpinnerbool] = useState(false)

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    CallAPI()
    HomeBanners()
  
  }, []);

  let tokenn = useSelector((state) => state.login.token)

  const CallAPI = async () => {
    setSpinnerbool(true)
    try {
      const res = await ABOUT_US_API()
      setData(res.data)

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
      // setSpinnerbool(false)
      setRefreshing(false);
    }
  }

  useEffect(() => {
    CallAPI()
    HomeBanners()
  }, [])





  
  const HomeBanners = async () => {
    try {
      const res = await GET_ALL_BANNERS_API(tokenn)

      if(res)
      {
        // console.log("Res >",res.data)
        setBanners(res.data)
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
        setSpinnerbool(false)
        setRefreshing(false);
    }
  }


  




  return (<>
       <Loader1
        visible={spinnerBool}
      />
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../../../assets/Images/Background1.png')} // Replace with the actual path to your image
        style={[{flex:1},SettingStyleing.ImageBackgroundSettings]}
      >
        <View style={{ flex: 0.08 }}>
          <CustomToolKitHeader componentName={"ABOUT JONNA’S KITCHEN"} textDecorationLine={'underline'} />
        </View>
        <View style={{ flex: 1 }}>
          
          {Data.length>0 ?<FlatList
            data={Data[0].points}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            keyExtractor={(item, index) => index.toString()} 
            ListHeaderComponent={
              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 0 }}>
                <LoadingImage
                  // source={require('../../../../assets/Images/Food/Food1.png')}
                  source={{ uri: Data[0].image }}
                  // source={{ uri: Data[0].image }}
                  style={{ width: '100%', height: 240, }}
                  loaderColor="#ff0000" // Optional: change loader color
                  resizeMode="contain"
                />
              </View>
            }
            renderItem={({ item,index }) => (
              <View style={{ marginHorizontal: 18 }} key={index}>

                <View style={[{ backgroundColor: '#E8F4EC', width: '100%', marginVertical: 10 }, styles.container]}>
                  <Text style={{ color: '#000000', fontSize: 14, fontWeight: '400', fontFamily: 'BalooTamma2-Bold', lineHeight: 18 }}>
                    {item}
                  </Text>
                </View>
              </View>
            )}
            ListFooterComponent={

              <View>
                <CarouselsBasic DATA={banners} autoScroll={true} showIndicators={false} />
              </View>
            }

          // contentContainerStyle={{ paddingHorizontal: 18 }}
          />:""}

        </View>
      </ImageBackground>
    </View>
    </>
  );
}

export default AboutUS;

const styles = StyleSheet.create({
  container: {
    padding: 10,
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
  ContentBox: {
    flex: 0.4,
    backgroundColor: '#F6F8FE',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    overflow: 'hidden',
    paddingTop: 36,
    paddingHorizontal: 17,
  },
});
