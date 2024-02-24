import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomePage from './HomePage';
import ComparePage from './ComparePage';

const BottomTab = createBottomTabNavigator();

const MainAppScreen = () => {
  return (
    <BottomTab.Navigator screenOptions={{headerShown: false}}>
      <BottomTab.Screen
        name="HomePage"
        component={HomePage}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />

      <BottomTab.Screen
        name="ComparePage"
        component={ComparePage}
        options={{
          tabBarLabel: 'Compare',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="compare-horizontal"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const MainStack = createStackNavigator();

const Routes = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="MainApp"
        component={MainAppScreen}
        options={{
          headerShown: false,
        }}
      />
    </MainStack.Navigator>
  );
};

export default Routes;
