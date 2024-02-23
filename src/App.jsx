import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Routes from './routes';
import ThemeProvider from './themes/ThemeProvider';
import {Provider} from 'react-redux';
import store from './libs/redux';

const MainApp = () => {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <MainApp />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
