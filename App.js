import * as React from 'react';
import { View, Text } from 'react-native';
import Screen from './app/Screens';
import { Provider } from 'react-redux';
import { store } from './app/redux/store';



function App() {
  return (
    <Provider store={store}>
      <Screen />
    </Provider>
  );
}

export default App;