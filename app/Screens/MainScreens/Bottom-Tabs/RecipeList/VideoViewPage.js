import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const VideoViewPage = ({ route }) => {
  const { params } = route;
  const recipieUrl = params?.recipieUrl || 'no recipieUrl';

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <Text>VideoViewPage  {recipieUrl}</Text>
    </View>
  )
}

export default VideoViewPage

const styles = StyleSheet.create({})