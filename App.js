import * as React from 'react';
import { View, Text } from 'react-native';
import Screen from './app/Screens';
import { Provider } from 'react-redux';
import { store } from './app/redux/store';
import BackTable from './app/Screens/BackTable';
import BackTable2 from './app/Screens/BackTable2';



function App() {
  return (
    <Provider store={store}>
    
        <Screen />
   
    </Provider>
  );
}

export default App;