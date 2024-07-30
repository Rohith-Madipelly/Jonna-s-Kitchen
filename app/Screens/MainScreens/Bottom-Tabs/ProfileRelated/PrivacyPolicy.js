import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PrivacyPolicy = () => {
  return (
    <View style={{ flex: 1,paddingHorizontal:20,paddingTop:20 }}>
      <View style={{marginTop:15, alignItems: 'center'}}>
        <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 700, fontSize:20,textDecorationLine:'underline'}}>Privacy Policy</Text>
      </View>
      <View style={{marginTop:15}}>
        <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 700, fontSize:16,color:'#FE7B07'}}>Note</Text>
      </View>

    </View>
  )
}

export default PrivacyPolicy 

const styles = StyleSheet.create({})