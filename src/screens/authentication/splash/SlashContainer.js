import React, { useEffect } from 'react';
import Splash from 'react-native-splash-screen';

import RootNavigation from '../../../navigation/RootNavigation';
import AsyncStorageKeys from '../../../utils/AsyncStorageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_NAVIGATE_SCREEN } from '../../../utils/constant';
import { getMyInfo, getMyRole } from '../login/LoginSlice';
import { useDispatch } from 'react-redux';
import SplashScreen from './SplashScreen';
import { useTranslation } from 'react-i18next';
import Utils from '../../../utils';
import Config from '../../../configuration';
import axiosClient from '../../../network/axios';
const SplashContainer = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const checkAccount = async () => {
    const token = await Utils.getData(Config.storageKey.AUTH);
    const language = await AsyncStorage.getItem(AsyncStorageKeys.Language);
    i18n.changeLanguage(language);
    if (Object.keys(token).length > 0) {
      RootNavigation.replace(APP_NAVIGATE_SCREEN.MAIN);
      dispatch(getMyInfo());
      dispatch(getMyRole());
    } else {
      RootNavigation.replace(APP_NAVIGATE_SCREEN.MAIN);
    }
  };
  const checkServer = async () => {
    const server = await Utils.getData(Config.storageKey.SERVER);

    if (Object.keys(server).length > 0) {
      axiosClient.defaults.baseURL = await Utils.searchServer(server);
     
    } else {
      axiosClient.defaults.baseURL = Config.envConfig.devEndPoint;
    }
    setTimeout(checkAccount, 10000);
  };

  useEffect(() => {
    checkServer();

    Splash.hide();
  }, []);

  return <SplashScreen />;
};

export default SplashContainer;
