import { Image, ImageBackground, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'


import CustomToolKitHeader from '../../../Components/UI/CustomToolKitHeader';
import onShare from '../../../Utils/ShareBtn';
import { APP_LINK } from '../../../Enviornment';
import SelectedFullCourse from '../../SelectedFullCourse';
import CarouselsBasic from '../../../Components/UI/CarouselsBasic/CarouselsBasic';


const Home = ({ navigation }) => {

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


  return (
    <>

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
                  <Text style={{ color: '#FE7B07', fontFamily: 'BalooTamma2-Bold', fontWeight: 700, fontSize: 20 }}>Pardhu</Text>
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
                <CarouselsBasic DATA={DATA12} autoScroll={true} />

                <SelectedFullCourse />


                {/* <Image style={{ width: '100%', resizeMode: 'contain' }} source={require("../../../assets/Images/Home/HomeProgram.png")} resizeMode="contain" /> */}
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