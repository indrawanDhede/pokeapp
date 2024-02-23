import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {Compare} from '../pages';

const CompareStack = createStackNavigator();

const ComparePage = () => {
  return (
    <CompareStack.Navigator initialRouteName="Compare">
      <CompareStack.Screen
        name="Compare"
        component={Compare}
        options={{
          headerShown: false,
        }}
      />
    </CompareStack.Navigator>
  );
};

export default ComparePage;
