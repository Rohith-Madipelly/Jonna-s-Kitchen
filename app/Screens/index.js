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

import OtpScreen from './AuthScreens/OtpScreen.js';
import Loading from './CommonScreens/Loading.js';
import SuccessfulVerify from './CommonScreens/SuccessfulVerify.js';
import Splash2 from './SplashScreens/Splash2.js';
import { setToken } from '../redux/actions/loginAction.jsx';
import ProgramForm from './MainScreens/ProgramForm.js';
import BottomTabScreen from './MainScreens/Bottom-Tabs/BottomTabScreen.js';
import Notification from './MainScreens/Bottom-Tabs/Notification.js';
import UserRegister from './AuthScreens/UserRegister.js';
import CreatePassword from './AuthScreens/CreatePassword.js';
import SuccessScreen from './ShareScreens/SuccessScreen.js';
import WelcomeCopy from './MainScreens/WelcomeCopy.js';
import ResetPassword from './AuthScreens/ResetPassword.js';
import ForgetPassword from './AuthScreens/ForgetPassword.js';
import OtpScreenForgot from './AuthScreens/OtpScreenForgot.js';
import DataCheck from './ShareScreens/DataCheck.js';
import { setAccountPage } from '../redux/actions/AccountSetUpAction.jsx';
import VideoViewPage from './MainScreens/Bottom-Tabs/RecipeList/VideoViewPage.js';

import Feedback from './MainScreens/Bottom-Tabs/ProfileRelated/Feedback.js';
import { SET_USER_NAME } from '../redux/actions/loginAction copy.jsx';
import { SetUserPhoneNumber } from '../redux/actions/SetUserPhoneNumber.jsx';
import { SetUserEmail } from '../redux/actions/SetUserEmail.jsx';
// import BottomTabScreen from './MainScreens/Bottom-Tabs/BottomTabScreen.js';
const Screen = () => {
  const [appIsReady, setAppIsReady] = useState(false)
  const [user, setUser] = useState()

  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  const loginSelector = useSelector((state) => state.login.isLogin);


  const [fontsLoaded] = useFonts({
    'BalooTamma2-Bold': require('../../app/assets/Fonts/BalooTamma2-Bold.ttf'),
    'BalooTamma2': require('../../app/assets/Fonts/BalooTamma2-VariableFont_wght.ttf'),
    'Poppins-SemiBold': require('../../app/assets/Fonts/Poppins-SemiBold.ttf'),
  });


  console.log("user login Status", loginSelector)

  const verifyToken = async () => {
    ASO.getTokenJWT('Token', (error, token) => {
      if (error) {
        console.error('Error getting token:', error);
      } else {
        if (token != null) {
          dispatch(setToken(token));
        }
      }
      // setAppIsReady(true);
    });


    ASO.getTokenJWT('userPhoneNumber12', (error, USERPHONEAPP) => {
      if (error) {
        console.error('Error getting userName:', error);
      } else {
        if (USERPHONEAPP != null) {
          dispatch(SetUserPhoneNumber(USERPHONEAPP));
        }
      }
      // setAppIsReady(true);
    });


    ASO.getTokenJWT('UserName', (error, userName) => {
      if (error) {
        console.error('Error getting userName:', error);
      } else {
        if (userName != null) {
          dispatch(SET_USER_NAME(userName));
        }
      }
      // setAppIsReady(true);
    });



    // ASO.getTokenJWT('UserName', (error, userName) => {
    //   if (error) {
    //     console.error('Error getting userName:', error);
    //   } else {
    //     if (userName != null) {
    //       dispatch(SET_USER_NAME(userName));
    //     }
    //   }
    //   // setAppIsReady(true);
    // });


    ASO.getTokenJWT('UserEmail', (error, userName) => {
      if (error) {
        console.error('Error getting userName:', error);
      } else {
        if (userName != null) {
          dispatch(SET_USER_NAME(userName));
        }
      }
      // setAppIsReady(true);
    });


    ASO.getTokenJWT('userEmail', (error, userName) => {
      if (error) {
        console.error('Error getting userName:', error);
      } else {
        if (userName != null) {
          dispatch(SetUserEmail(userName));
        }
      }
      // setAppIsReady(true);
    });




    ASO.getTokenJWT('programRegistered', (error, token) => {
      if (error) {
        console.error('Error getting token:', error);
      } else {
        if (token != null) {
          dispatch(setAccountPage(token));
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
      {/* <NavigationContainer> */}
      <ErrorBoundary FallbackComponent={CustomFallbackUI}>


        <Stack.Navigator
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


          <Stack.Screen name="Splash2" component={Splash2} />
          {user ? (
            <>
              <Stack.Screen name="WelcomeCopy" component={WelcomeCopy} />
              <Stack.Screen name="ProgramsForm" component={ProgramForm} />
              <Stack.Screen name="BottomTabScreen" component={BottomTabScreen} />

              <Stack.Screen name="Notification" component={Notification} />
            </>) : (<>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="UserRegister" component={UserRegister} />
              <Stack.Screen name="OtpScreen" component={OtpScreen} />
              <Stack.Screen name="CreatePassword" component={CreatePassword} />
              <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
              <Stack.Screen name="OtpScreenForgot" component={OtpScreenForgot} />
              <Stack.Screen name="ResetPassword" component={ResetPassword} />
              <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
            </>)}
        </Stack.Navigator>
      </ErrorBoundary>
      {/* </NavigationContainer> */}
    </SafeAreaView>
  )
}

export default Screen

const styles = StyleSheet.create({})