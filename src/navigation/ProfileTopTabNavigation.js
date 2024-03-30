import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import * as React from 'react';

import AlbumScreen from '../screens/album';
import ProfileScreen from '../screens/profile';
import {APP_NAVIGATE_SCREEN} from '../utils/constant';

const {HOME_PROFILE, ALBUM_PROFILE, PRODUCTION_PROFILE} = APP_NAVIGATE_SCREEN;

const AppScreen = {
  [HOME_PROFILE]: ProfileScreen,
  [ALBUM_PROFILE]: AlbumScreen,
  [PRODUCTION_PROFILE]: AlbumScreen,
};
const Tab = createMaterialTopTabNavigator();

export default function ProfileTopTabNavigation() {
  return (
    <Tab.Navigator screenOptions={{swipeEnabled: false}}>
      {Object.keys(AppScreen).map((item, index) => (
        <Tab.Screen
          key={index}
          name={item}
          component={AppScreen[item]}
          options={{
            tabBarActiveTintColor: '#3947e9', // tab text color
            scrollEnabled: false,
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
