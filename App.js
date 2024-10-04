import * as React from 'react';
import Screen from './app/Screens';
import { Provider } from 'react-redux';
import { store } from './app/redux/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; 
import Toast from 'react-native-toast-message';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Notifications from 'expo-notifications';
import Data from './Data';
const Stack = createNativeStackNavigator();
function App() {



  const navigationRef = createNavigationContainerRef();
  const [isNavigationReady, setIsNavigationReady] = React.useState(false);



  React.useEffect(() => {
    // Only proceed with navigation if the navigation is ready
    const subscription1 = Notifications.addNotificationReceivedListener((notification) => {
      console.log('NOTIFICATION RECEIVED');
      console.log(notification);
    });

    const subscription2 = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('NOTIFICATION RESPONSE RECEIVED');
      console.log(response.notification);
      // console.log("<><>>...",response.notification.request.content.data);
      
      const screenToNavigate = response.notification.request.content.data.screen;

      console.log("shjhjhvh>",screenToNavigate)
      
      // Ensure navigation is ready before navigating
      if (isNavigationReady && navigationRef.isReady()) {
        // navigationRef.navigate("Notification");
        navigationRef.navigate("BottomTabScreen", { screen: screenToNavigate });
      }
    });

    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, [isNavigationReady]);

  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer 
           ref={navigationRef}
           onReady={() => setIsNavigationReady(true)} >
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="NextScreener" component={Screen} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;