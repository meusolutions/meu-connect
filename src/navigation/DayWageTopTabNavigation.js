import * as React from 'react';
import {Text, View, Image} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import ShiftScreen from '../screens/shift/ShiftContainer';
import SalaryScreen from '../screens/salary/SalaryContainer';
import WorkLoadScreen from '../screens/workload/WorkLoadContainer';
import {APP_NAVIGATE_SCREEN} from '../utils/constant';

const {SALARY, SHIFT, WORK_LOAD} = APP_NAVIGATE_SCREEN;

const AppScreen = {
  [WORK_LOAD]: WorkLoadScreen,
  [SALARY]: SalaryScreen,
  [SHIFT]: ShiftScreen,
};
const Tab = createMaterialTopTabNavigator();

export default function DayWageTopTabNavigation() {
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
            // tabBarIcon: ({ focused, size }) => (
            //     <Image source={AppIcon[item]} style={{ width: 24, height: 24 }} />
            // )
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
