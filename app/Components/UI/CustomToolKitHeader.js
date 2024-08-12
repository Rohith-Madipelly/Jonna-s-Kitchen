import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import ReturnBack from '../../assets/Icons/ReturnBack'

function CustomToolKitHeader({ componentName, textDecorationLine,tagLine }) {
  const navigation = useNavigation()

  return (
    // <View style={{ width: '100%', height: 58, flexDirection: 'row', paddingHorizontal: 17, alignItems: "center" }}>
    //   {/* <View style={{ justifyContent: 'center',backgroundColor:'red' }}> */}
    //     <TouchableOpacity onPress={() => { navigation.goBack() }} style={{flex:0.1}}>
    //     <Image style={{ width: 27, height: 27, transform: [{ rotate: '180deg' }],}} source={require("../../assets/Images/Arrow.png")}/>
    //     </TouchableOpacity>
    //   {/* </View> */}
    //   <View style={{  justifyContent: 'center', alignContent: 'center',flex:0.8 }}>
    //     <Text style={[{ color: '#000000', fontSize: 20, fontWeight: 700,fontFamily: 'BalooTamma2-Bold',textAlign:'center',lineHeight:20,textDecorationLine:textDecorationLine,}]}>{componentName}</Text>
    //   </View>
    // </View>

    <View style={{ width: '90%', flexDirection: 'row', marginTop: 40 }}>
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

export default CustomToolKitHeader
