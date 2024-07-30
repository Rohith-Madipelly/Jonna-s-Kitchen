import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native';
import CustomButton1 from '../../../../Components/UI/Buttons/CustomButton1';



import { Entypo, FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import { FlatList } from 'react-native';
import CustomToolKitHeader from '../../../../Components/UI/CustomToolKitHeader';

const ArticlesList = ({ navigation }) => {

  return (
    <>
      <View style={{ flex: 1,paddingTop:20 }}>
        <ImageBackground
          source={require('../../../../assets/Images/Background1.png')} // Replace with the actual path to your image
          style={styles.container}
        >
          <View style={{ flex: 0.08 }}>
            <CustomToolKitHeader componentName={"Articles List"} textDecorationLine={'underline'} />
          </View>


          <ScrollView style={{ flex: 0.95, paddingHorizontal: 18, marginTop: 20 }}>
            <Text style={{ color: '#000000', fontSize: 20, fontWeight: 700, fontFamily: 'BalooTamma2-Bold', textDecorationLine: 'underline', lineHeight: 20 }}>Articles</Text>
            <TouchableOpacity
            onPress={()=>{navigation.navigate('Article') }}
            style={{ backgroundColor: 'white', width: '100%', height: 40, marginVertical: 10, paddingVertical: 10, paddingHorizontal: 10, paddingLeft: 15, borderRadius: 15, elevation: 3 }}>
              <Text>Maintaining a healthy </Text>
            </TouchableOpacity>
            

            <TouchableOpacity
            onPress={()=>{navigation.navigate('Article') }}
            style={{ backgroundColor: 'white', width: '100%', height: 40, marginVertical: 10, paddingVertical: 10, paddingHorizontal: 10, paddingLeft: 15, borderRadius: 15, elevation: 3 }}>
              <Text>Maintaining a healthy </Text>
            </TouchableOpacity>
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