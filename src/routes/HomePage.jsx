import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {enableScreens} from 'react-native-screens';
import {Home} from '../pages';

enableScreens();
const HomeStack = createStackNavigator();

const HomePage = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomePage;
