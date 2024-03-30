import React, {useEffect, useState} from 'react';
import RootNavigation from '../../../navigation/RootNavigation';
import LoginScreen from './LoginScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import Utils from '../../../utils';
import AsyncStorageKeys from '../../../utils/AsyncStorageKeys';
import {APP_NAVIGATE_SCREEN} from '../../../utils/constant';
import {getMyInfo, login, getMyRole} from './LoginSlice';
const LoginContainer = props => {
  // console.log("props: ", props)
  const {dispatch, ToastMessage, t} = props;

  const [indexSwiper, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(true);

  const [userAccount, setUserAccount] = useState({
    username: '',
    password: '',
    // username: 'dangdoan@meu-solutions.com',
    // password: 'meu@2022',
  });

  const [chooseLanguage, setChooseLanguage] = useState();
  const [defaultLanguage, setDefaultLanguage] = useState();

  const [isAccept, setAccept] = useState(false);
  const [isOpenWebView, setOpenWebView] = useState(false);

  const handleUserName = text => {
    if (text != null) {
      setUserAccount({username: text, password: userAccount.password});
    }
  };
  const handlePassword = text => {
    if (text != null) {
      setUserAccount({username: userAccount.username, password: text});
    }
  };

  const preView = () => {
    setIndex(indexSwiper - 1);
  };

  const handleSetAccount = () => {
    if (
      userAccount.username.length === 0 ||
      userAccount.password.length === 0
    ) {
      setLoading(false);
      ToastMessage({
        title: t('System'),
        message: t('Enter_account'),
        type: 'error',
      });
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      if (!isAccept) {
        ToastMessage({
          title: t('System'),
          message: t('Agree_policy'),
          type: 'error',
        });
        setLoading(false);
        return;
      }

      if (!handleSetAccount()) return;
      const res = await dispatch(
        login({
          name: userAccount.username,
          pass: encodeURIComponent(userAccount.password),
        }),
      );
      const {success} = Utils.getValues(res, 'payload', false);

      if (success) {
        dispatch(getMyInfo());
        dispatch(getMyRole());
        RootNavigation.navigate(APP_NAVIGATE_SCREEN.MAIN);
      } else {
        const {message} = Utils.getValues(
          res,
          'payload',
          'Tài khoản hoặc mật khẩu không đúng',
        );
        ToastMessage({
          title: 'Hệ thống',
          message: message,
          type: 'error',
        });
      }
      setLoading(false);
    } catch (e) {
      console.log('error login: ', e);
      setLoading(false);
      ToastMessage({
        title: 'Hệ thống',
        message: e.toString(),
        type: 'error',
      });
    }
  };

  const onLoadLanguage = async () => {
    const language = await AsyncStorage.getItem(AsyncStorageKeys.Language);

    setDefaultLanguage((language && language) || 'Vn');
  };
  const onSaveLangChangeSettings = async () => {
    await AsyncStorage.setItem(AsyncStorageKeys.Language, chooseLanguage);
    Toast.show({
      type: 'info',
      text1: `Hệ thống`,
      text2: `Ứng dụng sẽ được khởi động lại sau 3 giây`,
      visibilityTime: 2000,
    });
  };
  const onCloseWebView = () => {
    setOpenWebView(false);
  };
  useEffect(() => {
    onLoadLanguage();
  }, []);
  useEffect(() => {
    if (props.route?.params?.index) {
      setIndex(3);
    }
  }, [props.route]);
  useEffect(() => {
    chooseLanguage && onSaveLangChangeSettings();
  }, [chooseLanguage]);

  const loginProps = {
    loading,
    showPass,
    preView,
    handleLogin,
    setShowPass,
    userAccount,
    handleUserName,
    handlePassword,
    isAccept,
    setAccept,
    isOpenWebView,
    setOpenWebView,
    onCloseWebView,
  };
  return <LoginScreen {...loginProps} />;
};

export default LoginContainer;
