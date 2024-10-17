import { ScrollView, StyleSheet, Platform, ImageBackground, Text, View, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Data from '../../../../Data'
import Accordion from '../../../../Components/UI/Accordion/Accordion';
import CustomToolKitHeader from '../../../../Components/UI/CustomToolKitHeader';
import { Get_FAQs_API } from '../../../../Utils/ApiCalls';
import { useSelector } from 'react-redux';
import Loader1 from '../../../../Utils/Loader1';
import { StatusBar } from 'expo-status-bar';

const FAQ = ({ navigation }) => {
  let tokenn = useSelector((state) => state.login.token)
  const [Data3, setData] = useState()
  const [spinnerBool, setSpinnerbool] = useState(false)


  const Get_FAQs = async () => {
    setSpinnerbool(true)

    try {
      const res = await Get_FAQs_API(tokenn)
      setData(res.data)
      console.log("heloo")
    } catch (error) {
      console.log(error)
    }
    finally {
      setSpinnerbool(false)
      setRefreshing(false);
    }
  }

  useEffect(() => {
    Get_FAQs()
  }, [])


  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Get_FAQs()
  }, []);

  return (
    <>
      <StatusBar
        animated={true}
        // backgroundColor="#F7F7F7"
        barStyle={'dark-content'}
      />
      <Loader1
        visible={spinnerBool}
      />

      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('../../../../assets/Images/Background1.png')} // Replace with the actual path to your image
          style={{ flex: 1 }}
        >
          <View style={{ flex: 0.08 }}>
            <CustomToolKitHeader componentName={"FAQ"} textDecorationLine={'underline'} />
          </View>

          {/* {Data3.map((data, index) => {
            return (
              <View>
                <Text>ccdes,{data.content}</Text>
              </View>
            )
          })} */}


          {Data3 ? <ScrollView  keyboardShouldPersistTaps="handled"  style={{ flex: 0.8 }}
           refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
           >
            {Data3.map((value, index) => {

              return (
                <View key={index}>
                  <Accordion value={value} index={index} />
                </View>
              )
            })}
          </ScrollView> : ""}

        </ImageBackground>
      </View>
    </>
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
