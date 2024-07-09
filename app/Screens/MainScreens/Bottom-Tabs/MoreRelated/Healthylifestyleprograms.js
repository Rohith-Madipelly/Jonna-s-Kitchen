import { Button, Image, FlatList, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";


import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { Entypo, FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import CustomButton1 from "../../../../Components/UI/Buttons/CustomButton1";
import BackTable from "../../../BackTable";
import Programs from "./reuse/Programs";
import Programs2 from "./reuse/Programs2";



const Healthylifestyleprograms = () => {
  const navigation = useNavigation();

  const [errorFormAPI, seterrorFormAPI] = useState("")

  const dispatch = useDispatch();
  const scrollViewRef = useRef(null);



  const HealthyProgramsData = [
    {
      title: "Program 01",
      image: require("../../../../assets/Images/Home/BannerBack01.png")
    },
    {
      title: "Program 02",
      image: require("../../../../assets/Images/Home/BannerBack02.png")
    },
    {
      title: "Program 03",
      image: require("../../../../assets/Images/Home/BannerBack01.png")
    }
  ]





  return (
    <ImageBackground
      source={require('../../../../assets/Images/Background1.png')} // Replace with the actual path to your image
      style={{
        flex: 1,
        // backgroundColor:'pink'
      }}>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
      >

        <View style={{ marginHorizontal: 20, flex: 1 }}>

          <View style={{ marginTop: 10, flex: 0.9 }}>


            <Text style={{
              fontWeight: '400', fontFamily: 'BalooTamma2-Bold', fontSize: 24,
              color: '#FE7B07',
              marginBottom: -10
            }}>Jonnas Kitchen</Text>

            <Text style={{
              fontWeight: '400',
              fontFamily: 'BalooTamma2-Bold', fontSize: 24,
              color: '#177137'
            }}>Healthy lifestyle programs</Text>

            <View style={{}}>
              <Text style={[styles.TextFamilyA1, { fontWeight: '400', fontSize: 14 },]}>
                Our plans are purely based on home cooking.
              </Text>

              <Text style={[styles.TextFamilyA1, { fontWeight: '400', fontSize: 14, marginTop: -1 },]}>
                I believe the Mantra <Text style={[{ fontWeight: '700', fontSize: 14 }, styles.TextFamilyA2]}>
                  “LET FOOD BE YOUR MEDICINE” </Text>
                and <Text style={[{ fontWeight: '700', fontSize: 14 }, styles.TextFamilyA2]}> “KITCHEN BE YOUR HOSPITAL”.
                </Text>
              </Text>

            </View>


            {HealthyProgramsData.map((item, index) => (
              <View key={index}>
                {index % 2 === 0 ? (
                  <Programs ProgramsName={item.title} ProgramImage={item.image} />
                ) : (
                  <Programs2 ProgramsName={item.title}  ProgramImage={item.image}/>
                )}
              </View>
            ))}

            {/* <Programs /> */}



          </View>

        </View>

      </ScrollView>
    </ImageBackground>
  )
}

export default Healthylifestyleprograms

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  ContentBox: {
    flex: 0.7,
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    overflow: 'hidden',
    paddingTop: 36,
    paddingHorizontal: 17
  },
  TextFamilyA1: {
    fontFamily: 'BalooTamma2'
  },
  TextFamilyA2: {
    fontFamily: 'BalooTamma2-Bold'
  },
})

