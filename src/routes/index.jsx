import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import BootSplash from 'react-native-bootsplash';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {Detail} from '../pages';
import LoginScreen from '../pages/auth/LoginScreen';
import ComparePage from './ComparePage';
import HomePage from './HomePage';

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

const AppStack = createStackNavigator();

const AppStackNavigation = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="MainApp"
        component={MainAppScreen}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerShown: false,
        }}
      />
    </AppStack.Navigator>
  );
};

const AuthStack = createStackNavigator();

const AuthStackNavigation = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
};
const Routes = () => {
  const {data: user} = useSelector(state => state.user);

  return (
    <NavigationContainer
      onReady={() => {
        BootSplash.hide();
      }}>
      {user ? <AppStackNavigation /> : <AuthStackNavigation />}
    </NavigationContainer>
  );
};

export default Routes;
