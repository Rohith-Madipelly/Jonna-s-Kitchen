import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Image } from 'expo-image';
import { Asset } from 'expo-asset';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';


const gifAsset = Asset.fromModule(require('../../assets/Images/gif/Loading1.gif'));
const Loading = () => {

  const navigation = useNavigation();
  useEffect(() => {
      // Set a timer to navigate to the next screen after 10 seconds (10000 milliseconds)
      const timer = setTimeout(() => {
          navigation.navigate("SuccessfulVerify");
      },3000);

      // Clear the timer if the component is unmounted
      return () => clearTimeout(timer);
  }, []);
  
  return (
    <View style={{ flex: 1,}}>
      <StatusBar
          animated={true}
          // backgroundColor="#F7F7F7"
          barStyle={'dark-content'}
        />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        
        <Image
                source={gifAsset.localUri || gifAsset.uri}
                style={{ width: 274,height:156}}
            />

          <Text style={{color:'#FE7B07',fontSize:14,fontFamily:'BalooTamma2-Bold'}}>Loading...</Text>
  
      </View>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({})