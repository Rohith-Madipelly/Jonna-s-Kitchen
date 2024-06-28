import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Notification = () => {
  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <View style={{ marginTop: 15, flexDirection: 'row' }}>
        <View style={{flex:0.2}}></View>
        <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 700, fontSize: 20,flex: 0.8,textAlign:'center'}}>Notifications</Text>
        <Image style={{ width: 24, height: 24, flex: 0.2 }}
          source={require('../../../assets/Images/Home/Ball.png')}
          resizeMode={"contain"} />
      </View>
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 500, fontSize: 20, color: '#00000080', textAlign: "center" }}>No Data found</Text>

      </View>

    </View>
  )
}

export default Notification

const styles = StyleSheet.create({})