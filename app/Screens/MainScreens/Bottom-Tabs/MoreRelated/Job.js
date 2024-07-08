import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native';
import CustomButton1 from '../../../../Components/UI/Buttons/CustomButton1';



import { Entypo, FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import { FlatList } from 'react-native';
import CustomToolKitHeader from '../../../../Components/UI/CustomToolKitHeader';

const MorePage = ({ navigation }) => {

  return (
    <>

      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('../../../../assets/Images/Background1.png')} // Replace with the actual path to your image
          style={styles.container}
        >

          <View style={{ flex: 1 }}>

            <View style={{ flex: 0.08 }}>
              <CustomToolKitHeader componentName={"Job Postings"} textDecorationLine={'underline'}  />
            </View>


            <ScrollView style={{ flex: 0.95, paddingHorizontal: 18, marginTop: 20 }}>
              <Image style={{ width: '100%', height: 300 }} source={require("../../../../assets/Images/NoOpenings.png")} resizeMode="contain" />


              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Image style={{ width: '100%', height: 300 }} source={require("../../../../assets/Images/officeWork.png")} resizeMode="contain" />

              </View>
            </ScrollView>




          </View>
        </ImageBackground>
      </View>
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