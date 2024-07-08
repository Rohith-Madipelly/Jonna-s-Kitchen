import { ScrollView, StyleSheet, Platform, ImageBackground, Text, View } from 'react-native'
import React from 'react'
import Data from '../../../../Data'
import Accordion from '../../../../Components/UI/Accordion/Accordion';
import CustomToolKitHeader from '../../../../Components/UI/CustomToolKitHeader';

const FAQ = ({ navigation }) => {


  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../../../assets/Images/Background1.png')} // Replace with the actual path to your image
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1 }}>
          <CustomToolKitHeader componentName={"FAQ"} textDecorationLine={'underline'} />

          <ScrollView>
            {Data.map((value, index) => {

              return (
                <View key={index}>
                  <Accordion value={value} index={index} />
                </View>
              )
            })}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}

export default FAQ;

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
