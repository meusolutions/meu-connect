import * as React from 'react';
import {Text, View, Image} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import HomeScreen from '../screens/home';
import {APP_NAVIGATE_SCREEN} from '../utils/constant';

const {MAIN} = APP_NAVIGATE_SCREEN;

const AppScreen = {
  [MAIN]: HomeScreen,
};
const Tab = createMaterialTopTabNavigator();

export default function TopTabNavigation() {
  return (
    <Tab.Navigator screenOptions={{scrollEnabled: true}}>
      {Object.keys(AppScreen).map((item, index) => (
        <Tab.Screen
          key={index}
          name={item}
          component={AppScreen[item]}
          options={{
            tabBarActiveTintColor: '#3947e9', // tab text color
            scrollEnabled: true,
            upperCaseLabel: false,
            tabBarLabelStyle: {
              fontSize: 9,
            },
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
