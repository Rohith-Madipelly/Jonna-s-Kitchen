import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CarouselsBasicItem = ({ item }) => {
  const { width } = Dimensions.get('screen'); // Get the screen width

  return (
    <TouchableOpacity style={[{ width: width,paddingHorizontal:20,height:159,alignItems:'center',justifyContent:'center'}]} activeOpacity={1} onPress={item.onPress}>
      <Image
        source={item.image}
        style={{
          width: '100%', // Take up the full width of the parent
          height:'100%',
          resizeMode: 'contain', // Maintain aspect ratio without stretching
        }}
      />
    </TouchableOpacity>
  )
}

export default CarouselsBasicItem

const styles = StyleSheet.create({})
