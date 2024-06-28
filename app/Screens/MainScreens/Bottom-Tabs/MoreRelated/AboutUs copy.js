import { Image, ImageBackground, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native';
import CustomButton1 from '../../../../Components/UI/Buttons/CustomButton1';



import { Entypo, FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import { FlatList } from 'react-native';
import CustomToolKitHeader from '../../../../Components/UI/CustomToolKitHeader';

const AboutUS = ({ navigation }) => {

  const AboutData = [
    { content: "Jonnas kitchen is a online nutrition platform, with the mission to make health and fitness accessible to everyone out there!" },
    { content: "I help transform my clients by inculcating the right eating habits, solving lifestyle issues, building motivation, dispelling myths around food, body, and mind." },
    { content: "I always had a dream of becoming a doctor and choose science background as my career, due to unavoidable circumstances had to step in IT field but I never had my job satisfaction." },

    { content: "We often get judged by our body , some says first impression is best impression One day just like everyone I have been Judged, commented, abused and much more on my body which really hurt my mind and body, apart from it I have also suffered with infertility and resulted in much more abuse towards my married life." },

    { content: " ** I always had a dream of becoming a doctor and choose science background as my career, due to unavoidable circumstances had to step in IT field but I never had my job satisfaction." },
    { content: " ** I always had a dream of becoming a doctor and choose science background as my career, due to unavoidable circumstances had to step in IT field but I never had my job satisfaction." },

  ]

  return (
    <>

      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('../../../../assets/Images/Background1.png')} // Replace with the actual path to your image
          style={{ flex: 1 }}
        >

          <View style={{ flex: 1 }}>

            <View style={{ flex: 0.09 }}>
              <CustomToolKitHeader componentName={"ABOUT JONNA’S KITCHEN"} />
            </View>


            <ScrollView style={{ flex: 0.95, paddingHorizontal: 18, marginTop: -20 }}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ width: '70%', height: 300 }} source={require("../../../../assets/Images/Food/Food1.png")} resizeMode="contain" />



                <FlatList
                  data={AboutData}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View style={[{ backgroundColor: '#E8F4EC', width: '100%', marginVertical: 10 }, styles.container]}>
                      <Text style={{ color: '#000000', fontSize: 14, fontWeight: 400, fontFamily: 'BalooTamma2-Bold', lineHeight: 18 }}>Jonnas kitchen is a online nutrition platform, with the mission to make health and fitness accessible to everyone out there!</Text>
                    </View>

                  )}/>


                
           

               
              </View>

            </ScrollView>




          </View>
        </ImageBackground>
      </View>
    </>
  )
}

export default AboutUS

const styles = StyleSheet.create({


  container: {
    padding: 10,

    // backgroundColor: 'white',
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
    paddingHorizontal: 17
  }
})