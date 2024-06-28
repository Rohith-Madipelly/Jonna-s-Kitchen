import { Button, Image, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";


import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { Entypo, FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import CustomButton1 from "../../../../Components/UI/Buttons/CustomButton1";
import BackTable from "../../../BackTable";


const Healthylifestyleprograms = () => {
  const navigation = useNavigation();

  const [errorFormAPI, seterrorFormAPI] = useState("")

  const dispatch = useDispatch();
  const scrollViewRef = useRef(null);








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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            // behavior={Platform.OS === "ios" ? 100:0}
            keyboardVerticalOffset={5000}
            style={{ width: '100%', flex: 1 }}
          >
            <View style={{ marginHorizontal: 20, flex: 1 }}>

              <View style={{ marginTop: 10, flex: 0.9 }}>


                <View style={{}}>
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
                  <View style={{ flex: 1 }}>
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
                </View>
                <BackTable />

              </View>

            </View>

          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>

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

