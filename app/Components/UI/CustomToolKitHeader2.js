import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import ReturnBack from '../../assets/Icons/ReturnBack'

function CustomToolKitHeader2({ componentName, textDecorationLine,tagLine }) {
  const navigation = useNavigation()

  return (
    <View style={{ width: '90%', flexDirection: 'row',paddingLeft:5,paddingTop:5}}>
      <TouchableOpacity style={{ flex: 0.5, justifyContent: 'center' }} onPress={() => { navigation.goBack() }} >
        <ReturnBack />
      </TouchableOpacity>
      <View style={{ justifyContent: 'center', alignContent: 'center' }}>
        <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#07743D', fontWeight: 800, fontSize: 20, textAlign: 'center',textDecorationLine:textDecorationLine, }}>
          {componentName}
        </Text>
        {tagLine?<Text style={{ fontFamily: 'Poppins-SemiBold', color: '#000000', fontWeight: 500, fontSize: 12, textAlign: 'center',textDecorationLine:textDecorationLine, }}>
          {tagLine}
        </Text>:""}
      </View>
    </View>
  )
}

export default CustomToolKitHeader2
