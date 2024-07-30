import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native';
import CustomButton1 from '../../../../Components/UI/Buttons/CustomButton1';



import { Entypo, FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import { FlatList } from 'react-native';
import CustomToolKitHeader from '../../../../Components/UI/CustomToolKitHeader';

const Article = ({ navigation }) => {

  return (
    <>

      <View style={{ flex: 1,paddingTop:20 }}>
        <ImageBackground
          source={require('../../../../assets/Images/Background1.png')} // Replace with the actual path to your image
          style={styles.container}
        >

          <View style={{ flex: 1 }}>

            <View style={{ flex: 0.08 }}>
              <CustomToolKitHeader componentName={"Articles"} />
            </View>


            <ScrollView style={{ flex: 0.95, paddingHorizontal: 18, marginTop: 20 }}>
              <Text style={{ color: '#000000', fontSize: 20, fontWeight: 700, fontFamily: 'BalooTamma2-Bold', textDecorationLine: 'underline', lineHeight: 20 }}>Name of the article</Text>
              <ImageBackground
                source={require('../../../../assets/Images/thinkBox.png')} // Replace with the actual path to your image
                style={[styles.container, { width: '100%', height: 250 }]} resizeMode="contain"
              >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>

                  <Image style={{ width: '90%' }} source={require('../../../../assets/Images/FoodArticles.png')} resizeMode="contain" />
                </View>

              </ImageBackground>

              <View style={{ backgroundColor: '#000000',borderRadius:20,padding:15 }}>
                <Text style={{color: 'white', fontSize: 14, fontWeight: 500, fontFamily: 'BalooTamma2', lineHeight: 20}}>Maintaining a healthy diet on a daily basis is essential for overall well-being. A balanced diet provides the body with the necessary nutrients, including vitamins, minerals, proteins, fats, and carbohydrates, which are crucial for the proper functioning of bodily systems. Consuming a variety of nutrient-rich foods helps to boost the immune system, reduce the risk of chronic diseases such as heart disease, diabetes, and cancer, and promote overall physical and mental health. Additionally, a healthy diet can improve energy levels, enhance mood, and support cognitive function, making it easier to manage daily tasks and maintain a positive outlook on life.</Text>
              </View>
            </ScrollView>




          </View>
        </ImageBackground>
      </View>
    </>
  )
}

export default Article

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