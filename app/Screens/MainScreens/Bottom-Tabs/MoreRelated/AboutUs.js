import { Image, ImageBackground, Platform, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import CustomButton1 from '../../../../Components/UI/Buttons/CustomButton1';
import { Entypo, FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import { FlatList } from 'react-native';
import CustomToolKitHeader from '../../../../Components/UI/CustomToolKitHeader';

const AboutUS = ({ navigation }) => {

  const AboutData = [
    { id: '1', content: "Jonnas kitchen is an online nutrition platform, with the mission to make health and fitness accessible to everyone out there!" },
    { id: '2', content: "I help transform my clients by inculcating the right eating habits, solving lifestyle issues, building motivation, dispelling myths around food, body, and mind." },
    { id: '3', content: "I always had a dream of becoming a doctor and choose science background as my career, due to unavoidable circumstances had to step in IT field but I never had my job satisfaction." },
    { id: '4', content: "We often get judged by our body, some say first impression is the best impression. One day, just like everyone, I have been judged, commented on, abused, and much more about my body which really hurt my mind and body. Apart from this, I have also suffered with infertility, resulting in much more abuse towards my married life." },
    { id: '5', content: "That’s when the interest in FOOD n NUTRITION has strongly registered in my mind and I first transformed myself and helped transform my clients across the globe and also helped in conceiving Naturally." },
    { id: '6', content: "I’m now a Internationally certified Weight management specialist, Further continued my education in Diploma in Dietetics and Now Pursing now PG. Diploma in Adv. Nutrition and Dietetics, specialization in clinical Nutrition and Diabetologist." },
  ];

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../../../assets/Images/Background1.png')} // Replace with the actual path to your image
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1 }}>
          <CustomToolKitHeader componentName={"ABOUT JONNA’S KITCHEN"} />

          <FlatList
            data={AboutData}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={
              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 0 }}>
                <Image
                  style={{ width: '70%', height: 240,}}
                  source={require("../../../../assets/Images/Food/Food1.png")}
                  resizeMode="contain"
                />
              </View>
            }
            renderItem={({ item }) => (
              <View style={[{ backgroundColor: '#E8F4EC', width: '100%', marginVertical: 10 }, styles.container]}>
                <Text style={{ color: '#000000', fontSize: 14, fontWeight: '400', fontFamily: 'BalooTamma2-Bold', lineHeight: 18 }}>
                  {item.content}
                </Text>
              </View>
            )}
            ListFooterComponent={
              <View style={{ justifyContent: 'center', alignItems: 'center',marginVertical:10 }}>
                <Image
                  style={{ width: '100%', height:163 }}
                  source={require("../../../../assets/Images/Food/AboutEnd.png")} // Replace with the actual path to your image
                  resizeMode="contain"
                />
              </View>
            }
            contentContainerStyle={{ paddingHorizontal: 18 }}
          />
        </View>
      </ImageBackground>
    </View>
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
