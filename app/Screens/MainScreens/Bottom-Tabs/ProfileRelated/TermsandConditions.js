import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TermsandConditions = () => {
  return (
    <View style={{ flex: 1,paddingHorizontal:20}}>
      <View style={{marginTop:15, alignItems: 'center'}}>
        <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 700, fontSize:20,textDecorationLine:'underline'}}>Terms and conditions</Text>
      </View>
      <View style={{marginTop:15}}>
        <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 700, fontSize:16,color:'#FE7B07'}}>Note</Text>
      </View>

    </View>
  )
}

export default TermsandConditions 

const styles = StyleSheet.create({})