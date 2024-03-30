import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/authentication/login';
import SignUpScreen from '../screens/authentication/signup/SignUpContainer';
import SplashContainer from '../screens/authentication/splash/SlashContainer';
import ProfileContainer from '../screens/profile';
import ForgotPassword from '../screens/authentication/forgot_password/ForgotPasswordContainer';
import IntroContainer from '../screens/authentication/introduction/IntroductionContainer';
import ServerContainer from '../screens/authentication/server/ServerContainer';
import ScanContainer from '../screens/scan/ScanContainer';
import ChargeScreen from '../screens/charge';
import DeleteAccountScreen from '../screens/authentication/delete_account';
import {APP_NAVIGATE_SCREEN} from '../utils/constant';
import BottomTabs from './BottomTabNavigation';
import RootNavigation from './RootNavigation';
import SocialScreen from '../screens/social';
import SettingScreen from '../screens/setting';
import ChatScreen from '../screens/chat';
import ProfileTopTabNavigation from './ProfileTopTabNavigation';
const {
  LOGIN,
  MAIN,
  SIGN_UP,
  SPLASH,
  PROFILE,
  FORGOT_PASS,
  INTRO,
  SERVER,
  SCAN,
  CHARGE,
  DELETE_ACCOUNT,
  SOCIAL,
  SETTING,
  CHAT,
} = APP_NAVIGATE_SCREEN;
const AppScreen = {
  [SPLASH]: SplashContainer,
  [LOGIN]: LoginScreen,
  [SIGN_UP]: SignUpScreen,
  [PROFILE]: ProfileTopTabNavigation,
  [FORGOT_PASS]: ForgotPassword,
  // [MAIN]: Tabs,
  [MAIN]: BottomTabs,
  [INTRO]: IntroContainer,
  [SERVER]: ServerContainer,
  [SCAN]: ScanContainer,
  [CHARGE]: ChargeScreen,
  [DELETE_ACCOUNT]: DeleteAccountScreen,
  [SOCIAL]: SocialScreen,
  [SETTING]: SettingScreen,
  [CHAT]: ChatScreen,
};
const Stack = createNativeStackNavigator();
const linking = {
  prefixes: ['app://clbdn'],
  config: {
    initialRouteName: SPLASH,
    screens: {
      [MAIN]: {
        path: MAIN,
      },
      Profile: {
        path: PROFILE,
      },
    },
  },
};
function AppNavigation() {
  return (
    <NavigationContainer
      linking={linking}
      ref={navigatorRef => {
        RootNavigation.setTopLevelNavigator(navigatorRef);
      }}>
      <Stack.Navigator
        initialRouteName={SPLASH}
        screenOptions={{headerShown: false}}>
        {Object.keys(AppScreen).map((item, index) => (
          <Stack.Screen key={index} name={item} component={AppScreen[item]} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
