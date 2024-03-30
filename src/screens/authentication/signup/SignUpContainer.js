import React, { useEffect, useState } from 'react';

import SignUpScreen from './SignUpScreen';
import { useTranslation } from 'react-i18next';
import RootNavigation from '../../../navigation/RootNavigation';
import { APP_NAVIGATE_SCREEN } from '../../../utils/constant';
import { REG_EMAIL } from '../../../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../login/LoginSlice';
import Utils from '../../../utils';
import { ToastMessage } from '../../../utils/MessageUtil';
import { loaderSelector } from '../../../app/selectors';

const SignUpContainer = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false)
  const [userInfo, setUserInfo] = useState({
    // name: 'Nguyễn Dũng',
    // email: '123@gmail.com',
    // password: '123456',
    // re_password: '123456',
    name: '',
    email: '',
    password: '',
    re_password: '',
  });
  const { t, i18n } = useTranslation();

  const onSubmitRegister = async () => {
    if (
      !validateInputUserInfo('name', userInfo.name) ||
      !validateInputUserInfo('email', userInfo.email) ||
      !validateInputUserInfo('password', userInfo.password) ||
      !validateInputUserInfo('re_password', userInfo.re_password)
    )
      return;
    const splitName = userInfo.name.split(' ');
    const payload = {
      first_name: splitName[0],
      middle_name: (splitName.length > 2 && splitName[1]) || '',
      last_name: (splitName.length >= 3 && splitName[2]) || splitName[1] || '',
      email: userInfo.email,
      password: userInfo.password,
    };
    setIsLoading(true)
    try {
      const res = await dispatch(signUp(payload));

      const { success } = Utils.getValues(res, 'payload', false);
      if (success) {
        setIsLoading(false)
        navigateToLogin();
      } else {
        const { message } = Utils.getValues(res, 'payload', 'Đăng ký thất bại');
        ToastMessage({
          title: t('System'),
          message: message,
          type: 'error',
        });
        setIsLoading(false)
      }
    } catch (e) {
      setIsLoading(false)
      console.error(e);
    }
  };

  const validateInputUserInfo = (key, data) => {
    const validate = {
      name: data.length > 2,
      email: data.length > 0 && data.toLowerCase().match(REG_EMAIL),
      password: data.length >= 6,
      re_password: data === userInfo.password,
    };
    return validate[key];
  };
  const navigateToLogin = () => {
    RootNavigation.navigate(APP_NAVIGATE_SCREEN.LOGIN);
  };

  const signupProps = {
    t,
    userInfo,
    setUserInfo,
    navigateToLogin,
    onSubmitRegister,
    isLoading,
  };
  return <SignUpScreen {...signupProps} />;
};

export default SignUpContainer;
