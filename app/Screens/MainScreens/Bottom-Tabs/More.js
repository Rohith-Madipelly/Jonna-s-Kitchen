import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MorePage from './MoreRelated/MorePage';
import AboutUs from './MoreRelated/AboutUs';
import Healthylifestyleprograms from './MoreRelated/Healthylifestyleprograms';
import Testimonials from './MoreRelated/Testimonials';
import FAQ from './MoreRelated/FAQ';
import Article from './MoreRelated/Article';
import Job from './MoreRelated/Job';
import ArticlesList from './MoreRelated/ArticlesList';
import WelcomeCopy from '../WelcomeCopy';



const More = () => {



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
      initialRouteName="MorePage"
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: 'lightblue' },
        // headerTintColor: 'white',
        // headerTitleStyle: { fontWeight: 'bold' },
      }}
      detachInactiveScreens={false} // Disable optimization for demonstration purposes
    >

      <Stack.Screen name="MorePage" component={MorePage} />
      <Stack.Screen name="AboutUs" component={AboutUs} />
      <Stack.Screen name="Healthylifestyleprograms" component={Healthylifestyleprograms} />
      {/* <Stack.Screen name="Healthylifestyleprograms" component={WelcomeCopy} /> */}

      <Stack.Screen name="Testimonials" component={Testimonials} />
      <Stack.Screen name="FAQ" component={FAQ} />
      <Stack.Screen name="ArticlesList" component={ArticlesList} />
      <Stack.Screen name="Article" component={Article} />
      <Stack.Screen name="Job" component={Job} />

    </Stack.Navigator>
  )
}

export default More

const styles = StyleSheet.create({})