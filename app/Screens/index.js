import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ErrorBoundary from 'react-native-error-boundary';
import { useDispatch, useSelector } from 'react-redux';
import { useFonts } from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';

import ASO from "../Utils/AsyncStorage_Calls.js";
import GlobalStyles from '../Components/UI/GlobalStyles';
import Login from './AuthScreens/Login';
import CustomFallbackUI from './CustomFallbackUI';
import Home from './MainScreens/Home.js';
import OtpScreen from './AuthScreens/OtpScreen.js';
import Loading from './CommonScreens/Loading.js';
import SuccessfulVerify from './CommonScreens/SuccessfulVerify.js';
import Splash2 from './SplashScreens/Splash2.js';
import { setToken } from '../redux/actions/loginAction.jsx';
import LogOut from './MainScreens/LogOut.js';
import Register from './MainScreens/Register.js';
import Welcome from './MainScreens/Welcome.js';
import BottomTabScreen from './MainScreens/Bottom-Tabs/BottomTabScreen.js';
import Notification from './MainScreens/Bottom-Tabs/Notification.js';


// import BottomTabScreen from './MainScreens/Bottom-Tabs/BottomTabScreen.js';
const Screen = () => {
  const Stack = createNativeStackNavigator();
  const [user, setUser] = useState(null);
  const [appIsReady, setAppIsReady] = useState(false);
  const dispatch = useDispatch();



  const [fontsLoaded] = useFonts({
    'BalooTamma2-Bold': require('../../app/assets/Fonts/BalooTamma2-Bold.ttf'),
    'BalooTamma2': require('../../app/assets/Fonts/BalooTamma2-VariableFont_wght.ttf'),
  });
  const loginSelector = useSelector((state) => state.login.isLogin);
  console.log("isUser", loginSelector)

  const verifyToken = async () => {

    ASO.getTokenJWT('Token', (error, token) => {
      if (error) {
        console.error('Error getting token:', error);
      } else {
        if (token != null) {
          dispatch(setToken(token));
        }
      }
      setAppIsReady(true);
    });


  }


  useEffect(() => {
    setUser(loginSelector)
  }, [loginSelector])



  useEffect(() => {
    async function prepare() {
      try {
        await verifyToken();
        // Pre-load fonts, make any API calls you need to do here
        // await Font.loadAsync(Entypo.font);

        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);


  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontsLoaded) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.

      await SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

  if (!appIsReady || !fontsLoaded) {
    return null;
  }




  return (
    <SafeAreaView style={GlobalStyles.androidSafeArea}>
      <NavigationContainer>
        <ErrorBoundary FallbackComponent={CustomFallbackUI}>

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

            {/* <Stack.Screen name="Splash2" component={Splash2} /> */}
            {user ? (
              <>
                {/* <Stack.Screen name="Home" component={Home} /> */}
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="BottomTabScreen" component={BottomTabScreen} />
                <Stack.Screen name="LogOut" component={LogOut} />
                <Stack.Screen name="Notification" component={Notification} />

              </>) : (<>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="OtpScreen" component={OtpScreen} />
                <Stack.Screen name="Loading" component={Loading} />
                <Stack.Screen name="SuccessfulVerify" component={SuccessfulVerify} />

              </>)}
          </Stack.Navigator>
        </ErrorBoundary>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default Screen

const styles = StyleSheet.create({})