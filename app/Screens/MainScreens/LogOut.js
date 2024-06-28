import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ASO from '../../Utils/AsyncStorage_Calls'
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/actions/loginAction';
const LogOut = () => {
  const dispatch = useDispatch();
  const changeUserLoginState=async()=>{

    token=null
    
    ASO.setTokenJWT("Token", JSON.stringify(token), function (res, status) {
      if (status) {
        // ToasterMessage("success", `Success`, `${Message}`)
        dispatch(setToken(token));
      }
    })
  }
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text>Home</Text>
      <Button title='Log out'onPress={changeUserLoginState}></Button>
    </View>
  )
}

export default LogOut

const styles = StyleSheet.create({})