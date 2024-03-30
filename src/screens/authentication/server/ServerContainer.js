import React, {useEffect, useState} from 'react';
import ServerScreen from './ServerScreen';
import RootNavigation from '../../../navigation/RootNavigation';

import {APP_NAVIGATE_SCREEN} from '../../../utils/constant';
import AsyncStorageKeys from '../../../utils/AsyncStorageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SInfo from 'react-native-sensitive-info';
import md5 from '../../../utils/HashService';
import {useDispatch, useSelector} from 'react-redux';
import api from '../../../network/axios';
import {IMAGES, BgIntroduce} from '../../../values/images';
import Toast from 'react-native-toast-message';
import {API_URL} from '../../../utils/constant';
const ServerContainer = props => {
  // console.log("props: ", props)
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [domain, setDomain] = useState(
    'https://clbdoanhnhanhotran.meu-solutions.com',
  );
  const [errorDomain, setErrorDomain] = useState({
    text: '',
    type: null,
    isShow: false,
    icon: null,
    color: 'grey',
  });

  const [showAlert, setShowAlert] = useState({
    isError: false,
    title: '',
    message: '',
  });

  const [chooseLanguage, setChooseLanguage] = useState();
  const [defaultLanguage, setDefaultLanguage] = useState();

  const navigateToLogin = () => {
    RootNavigation.navigate(APP_NAVIGATE_SCREEN.LOGIN);
  };
  const storeDomain = async data => {
    await SInfo.setItem('domain', data, {
      sharedPreferencesName: 'domain',
      keychainService: 'myDomain',
    }).then(
      AsyncStorage.setItem(AsyncStorageKeys.storeCurrentDomain, data).then(
        () => {
          navigateToLogin();
        },
      ),
    );
  };

  const onSubmitDomain = async () => {
    //nextView()
    try {
      setLoading(true);
      if (domain === '' || domain === null) {
        showAlertError('Hệ thống', 'Vui lòng nhập đường dẫn server');
        return;
      }
      if (!validURL(domain)) {
        //console.log("!validURL")
        setErrorDomain({
          text: 'Đường dẫn không hợp lệ!',
          type: true,
          isShow: true,
          icon: BgIntroduce.IcErrorRed,
          color: '#ff5733',
        });
        setLoading(false);
        return;
      }
      let validateDomainApi = domain + '/api/ezLogs/sayHello';
      const now = new Date().getTime();
      const data = {
        url: './api/ezLogs/sayHello',
        body: JSON.stringify(null),
        time: now,
      };
      api.setHeader('Signature', md5(data));
      api.setHeader('Time', now.toString());
      await api.get(validateDomainApi).then(response => {
        if (response.ok) {
          const urlServer = domain.toString() + '/api/';
          api.setBaseURL(urlServer);
          storeDomain(urlServer);
          setLoading(false);
        } else {
          showAlertError('Hệ thống', 'Không tìm thấy server');
        }
      });
    } catch (e) {
      showAlertError('Hệ thống', 'Không tìm thấy server');
      setLoading(false);
      console.log('error login: ', e);
    }
    setLoading(false);
  };
  const onChangeDomain = text => {
    if (!text) {
      setErrorDomain({
        text: 'Đường dẫn không hợp lệ!',
        type: true,
        isShow: true,
        icon: BgIntroduce.IcErrorRed,
        color: '#ff5733',
      });
      setDomain('');
    } else {
      setDomain(text);
    }
  };
  const hideAlert = () => {
    setShowAlert({
      isError: false,
      title: '',
      message: '',
    });
    setDomain('https://');
    setLoading(false);
  };

  const showAlertError = (title, message) => {
    setShowAlert({
      isError: true,
      title: title,
      message: message,
    });
    setLoading(true);
  };
  const validURL = str => {
    var pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i',
    ); // fragment locator
    return !!pattern.test(str);
  };
  const onLoadLanguage = async () => {
    const language = await AsyncStorage.getItem(AsyncStorageKeys.Language);
    //console.log("language", language)
    setDefaultLanguage((language && language) || 'Vn');
  };
  const onChangeLanguage = language => {
    setChooseLanguage(language);
  };
  const onSaveLangChangeSettings = async () => {
    await AsyncStorage.setItem(AsyncStorageKeys.Language, chooseLanguage);
    //console.log(chooseLanguage === 'Tiếng Việt' ? 'vn' : 'en')
    Toast.show({
      type: 'info',
      text1: `Hệ thống`,
      text2: `Ứng dụng sẽ được khởi động lại sau 3 giây`,
      style: {zIndex: 1001},
      visibilityTime: 2000,
    });
    setTimeout(() => {
      CodePush.allowRestart();
      CodePush.restartApp();
    }, 3000);
  };

  useEffect(() => {
    onLoadLanguage();
  }, []);
  useEffect(() => {
    chooseLanguage && onSaveLangChangeSettings();
  }, [chooseLanguage]);

  useEffect(() => {
    if (validURL(domain)) {
      setErrorDomain({
        text: 'Đường dẫn hợp lệ!',
        type: false,
        isShow: true,
        icon: BgIntroduce.IcCheckedGreen,
        color: '#5d78ff',
      });
    }
  }, [domain]);

  const serverProps = {
    loading,
    domain,
    showAlert,
    errorDomain,
    chooseLanguage,
    defaultLanguage,
    onSubmitDomain,
    hideAlert,
    onChangeDomain,
    onChangeLanguage,
  };
  return <ServerScreen {...serverProps} />;
};

export default ServerContainer;
