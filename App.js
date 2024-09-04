import * as React from 'react';
import Screen from './app/Screens';
import { Provider } from 'react-redux';
import { store } from './app/redux/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
function App() {
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* <Screen /> */}
            <Stack.Screen name="NextScreener" component={Screen} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;