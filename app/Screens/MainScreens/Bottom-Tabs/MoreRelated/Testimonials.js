import { Image, ImageBackground, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native';
import CustomButton1 from '../../../../Components/UI/Buttons/CustomButton1';



import { Entypo, FontAwesome, SimpleLineIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList } from 'react-native';
import CustomToolKitHeader from '../../../../Components/UI/CustomToolKitHeader';


const Testimonials = ({ navigation }) => {



  const BannerData2 = [
    {}
  ]

  return (
    <>

      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('../../../../assets/Images/Background1.png')} // Replace with the actual path to your image
          style={styles.container}
        >

          <View style={{ flex: 1 }}>

            <View style={{ flex: 0.08 }}>
              <CustomToolKitHeader componentName={"Testimonials"} />
            </View>


            <ScrollView style={{ flex: 0.95, marginTop: 20 }}>


              <View style={[{
                flex: 1,
                
                //  justifyContent: 'center', alignItems: 'center' 
              }, styles.containerCard]}>
                <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row',marginHorizontal:18,marginTop:10 }}>
                  <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 600, fontSize: 16 }}>Testimonials</Text>
                  <Text style={{ color: '#FE7B07', fontFamily: 'BalooTamma2', fontWeight: 700, fontSize: 14, textDecorationLine: 'underline' }}>View all</Text>

                </View>
                <View style={{ marginTop: 5, display: 'flex', flexDirection: 'row',justifyContent:'space-between'}}>


                  <TouchableOpacity style={{ justifyContent: 'center' }}>
                    <MaterialCommunityIcons name="arrow-left-drop-circle" size={20} color="#785600" />
                  </TouchableOpacity>



                  <Image style={{ width: '85%', height: 300 }} source={require("../../../../assets/Images/Transformation01.png")} resizeMode="contain" />


                  <TouchableOpacity style={{ justifyContent: 'center'}}>
                    <MaterialCommunityIcons name="arrow-right-drop-circle" size={20} color="#785600" />
                  </TouchableOpacity>
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
    paddingHorizontal: 10,
    marginHorizontal:10,


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
    paddingHorizontal: 17
  }
})