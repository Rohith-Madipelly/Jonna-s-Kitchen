import { Image, ImageBackground, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native';
import CustomButton1 from '../../../../Components/UI/Buttons/CustomButton1';



import { Entypo, FontAwesome, SimpleLineIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList } from 'react-native';
import CustomToolKitHeader from '../../../../Components/UI/CustomToolKitHeader';
import CarouselWithButton from '../../../../Components/UI/CarouselsWithPackage/CarouselWithButton';


const Testimonials = ({ navigation }) => {



  const AboutImageData = [
    { id: 1, label: '1', image: require("../../../../assets/Images/Carousels/Transformations/Testimonials1.png") },
    { id: 2, label: '2', image: require("../../../../assets/Images/Carousels/Transformations/Testimonials2.png") },
    { id: 3, label: '3', image: require("../../../../assets/Images/Carousels/Transformations/Testimonials3.png") },
    // { id: 4, label: '1', image: require("../../../../assets/Images/Carousels/Transformations/Testimonials1.png") },
    // { id: 2, label: '1', image: require("../../../../assets/Images/Carousels/WelcomeTransformation1.png") },
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
              <CustomToolKitHeader componentName={"Testimonials"} textDecorationLine={'underline'} />
            </View>


            <ScrollView style={{ flex: 0.95, marginTop: 20 }}>
              <View style={[{ flex: 1, height: 316 }, styles.containerCard]}>

                <View style={{ flex: 0.1, justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 18, marginTop: 10 }}>
                  <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 600, fontSize: 16 }}>Testimonials</Text>
                  <Text style={{ color: '#FE7B07', fontFamily: 'BalooTamma2', fontWeight: 700, fontSize: 14, textDecorationLine: 'underline' }}>View all</Text>
                </View> 

                <View style={{ flex: 0.9,marginBottom:25, }}>
                  <CarouselWithButton DATA={AboutImageData} autoPlay={false} scrollAnimationDuration={1000} />
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