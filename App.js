import * as React from 'react';
import Screen from './app/Screens';
import { Provider } from 'react-redux';
import { store } from './app/redux/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';


function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      
      <Provider store={store}>
        <Screen />
        <Toast />
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;