import * as React from 'react';
import Screen from './app/Screens';
import { Provider } from 'react-redux';
import { store } from './app/redux/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      
      <Provider store={store}>
        <Screen />
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;