import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Image } from 'expo-image';
import { Asset } from 'expo-asset';
import { useNavigation } from '@react-navigation/native';
import ASO from '../../Utils/AsyncStorage_Calls'
import { setToken } from '../../redux/actions/loginAction';
import { useDispatch } from 'react-redux';

const gifAsset = Asset.fromModule(require('../../assets/Images/gif/success.gif'));
const SuccessfulVerify = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
      // Set a timer to navigate to the next screen after 10 seconds (10000 milliseconds)
      const timer = setTimeout(() => {
        //   navigation.navigate("SuccessfulVerify");
        changeUserLoginState()
      },3000);

      // Clear the timer if the component is unmounted
      return () => clearTimeout(timer);
  }, []);

  const changeUserLoginState=async()=>{

    token="RohithToken"
    
    ASO.setTokenJWT("Token", JSON.stringify(token), function (res, status) {
      if (status) {
        // ToasterMessage("success", `Success`, `${Message}`)
        dispatch(setToken(token));
      }
    })
  }



  
  return (
    <View style={{ flex: 1,}}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{flex:0.6}}>
        <Image
                source={gifAsset.localUri || gifAsset.uri}
                style={{ width: 274,height:156}}
            />

           
          <Text style={{color:'#1D8D45',fontSize:24,fontFamily:'BalooTamma2-Bold',textAlign:'center'}}>Successful Verify OTP</Text>

          <Button title='login' onPress={changeUserLoginState}></Button>
        </View>
   

  
      </View>
    </View>
  )
}

export default SuccessfulVerify

const styles = StyleSheet.create({})