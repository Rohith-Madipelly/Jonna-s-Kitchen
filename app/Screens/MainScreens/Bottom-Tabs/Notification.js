import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import CustomToaster from '../../../Utils/CustomToaster'

const Notification = () => {
  const navigation = useNavigation()
  return (
    <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
      <View style={{ flexDirection: 'row', }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => { navigation.goBack() }}>
            <Image style={{ width: 27, height: 27, transform: [{ rotate: '180deg' }], }} source={require("../../../assets/Images/Arrow.png")} />
          </TouchableOpacity>
        </View>

        <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 700, fontSize: 20, flex: 0.8, textAlign: 'center' }}>Notifications</Text>
        <Image style={{ width: 24, height: 24, flex: 0.2 }}
          source={require('../../../assets/Images/Home/Ball.png')}
          resizeMode={"contain"} />
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontFamily: 'BalooTamma2', fontWeight: 500, fontSize: 20, color: '#00000080', textAlign: "center" }}>No Notification found</Text>

      </View>


    </View>
  )
}

export default Notification

const styles = StyleSheet.create({})