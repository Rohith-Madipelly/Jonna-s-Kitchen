import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VideoViewPage from './RecipeList/VideoViewPage';
import RecipeList from './RecipeList/RecipeList';


const Recipe = () => {

  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator

      // screenOptions={{
      //   // headerShown: false,
      //   gestureEnabled: true,
      //   // gestureDirection: 'horizontal',
      //   // headerMode:"float"
      // }}

      // We see in andriod a new header is added to all the screens 
      // But i ios only content changes for that same experience in Android we can pass in a prop here


      id="rootStack"
      // initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: 'lightblue' },
        // headerTintColor: 'white',
        // headerTitleStyle: { fontWeight: 'bold' },
      }}
      detachInactiveScreens={false} // Disable optimization for demonstration purposes
    >

      <Stack.Screen name="RecipeList" component={RecipeList} />
      <Stack.Screen name="VideoViewPage" component={VideoViewPage} />

    </Stack.Navigator>
  )
}

export default Recipe

const styles = StyleSheet.create({})