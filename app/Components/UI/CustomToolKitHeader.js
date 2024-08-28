import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

function CustomToolKitHeader({componentName,textDecorationLine}) {
  const navigation = useNavigation() 

  return (
    <View style={{ width: '100%', height: '100%', flexDirection: 'row', paddingHorizontal: 17, alignItems: "center" }}>
      {/* <View style={{ justifyContent: 'center',backgroundColor:'red' }}> */}
        <TouchableOpacity onPress={() => { navigation.goBack() }} style={{flex:0.1}}>
        <Image style={{ width: 27, height: 27, transform: [{ rotate: '180deg' }],}} source={require("../../assets/Images/Arrow.png")}/>
        </TouchableOpacity>
      {/* </View> */}
      <View style={{  justifyContent: 'center', alignContent: 'center',flex:0.8 }}>
        <Text style={[{ color: '#000000', fontSize: 20, fontWeight: 700,fontFamily: 'BalooTamma2-Bold',textAlign:'center',textDecorationLine:textDecorationLine,}]}>{componentName}</Text>
      </View>
    </View>
  )
}
 
export default CustomToolKitHeader
