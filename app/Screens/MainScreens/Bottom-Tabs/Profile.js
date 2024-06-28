import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProfilePage from './ProfileRelated/ProfilePage'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProgramStatus from './ProfileRelated/ProgramStatus';
import MyPrograms from './ProfileRelated/MyPrograms';
import Feedback from './ProfileRelated/Feedback';

const Profile = () => {

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

        <Stack.Screen name="ProfilePage" component={ProfilePage} />
        <Stack.Screen name="ProgramStatus" component={ProgramStatus} />
        <Stack.Screen name="MyPrograms" component={MyPrograms} />
        <Stack.Screen name="Feedback" component={Feedback} />

  </Stack.Navigator>
  )
}

export default Profile

const styles = StyleSheet.create({})