import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import AppNavigator from './navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <AppNavigator />
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
