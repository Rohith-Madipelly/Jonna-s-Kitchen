import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CarouselsBasicItem = ({ item }) => {
  const { width } = Dimensions.get('screen'); // Get the screen width

  return (
    <View style={[{ width: width,paddingHorizontal:20,height:159,alignItems:'center',justifyContent:'center'}]}>
      <Image
        source={item.image}
        style={{
          width: '100%', // Take up the full width of the parent
          height:'100%',
          resizeMode: 'contain', // Maintain aspect ratio without stretching
        }}
      />
    </View>
  )
}

export default CarouselsBasicItem

const styles = StyleSheet.create({})
