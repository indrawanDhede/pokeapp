import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {Detail, Home} from '../pages';
import {enableScreens} from 'react-native-screens';


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

      <HomeStack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomePage;
