import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  CHAT_SVG,
  HomeActive,
  HomeNotActive,
  MessageActive,
  PhoneActive,
  PhoneNotActive,
  ProfileActive,
  ProfileNotActive,
} from '../assets/svgAsset';
import HeaderComponent from '../components/header/HeaderComponent';
import ChatScreen from '../screens/chat';
import ContactScreen from '../screens/contact';
import {APP_NAVIGATE_SCREEN} from '../utils/constant';
import ProfileTopTabNavigation from './ProfileTopTabNavigation';
import TopTabNavigation from './TopTabNavigation';
const {HOME, PROFILE, CONTACT, CHAT} = APP_NAVIGATE_SCREEN;

const AppScreen = {
  [HOME]: TopTabNavigation,
  [CONTACT]: ContactScreen,
  [CHAT]: ChatScreen,
  [PROFILE]: ProfileTopTabNavigation,
};
const AppIcon = {
  [HOME]: {
    inactive: <HomeNotActive />,
    active: <HomeActive />,
  },
  [PROFILE]: {
    inactive: <ProfileNotActive />,
    active: <ProfileActive />,
  },
  [CONTACT]: {
    inactive: <PhoneNotActive />,
    active: <PhoneActive />,
  },
  [CHAT]: {
    inactive: <CHAT_SVG />,
    active: <MessageActive />,
  },
};

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  return (
    <Tab.Navigator screenOptions={{scrollEnabled: true}}>
      {Object.keys(AppScreen).map((item, index) => (
        <Tab.Screen
          key={index}
          name={item}
          component={AppScreen[item]}
          options={{
            header: props =>
              item !== CHAT ? <HeaderComponent {...props} /> : null,
            tabBarActiveTintColor: '#3947e9', // tab text color
            tabBarLabelPosition: 'below-icon',
            tabBarShowLabel: true,
            tabBarIcon: ({focused, size}) =>
              focused ? AppIcon[item].active : AppIcon[item].inactive,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
