import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import RootNavigation from '../../../navigation/RootNavigation';
import {sendEmailRecovery} from '../login/LoginSlice';
import Utils from '../../../utils';
const ForgotPasswordContainer = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [isError, setError] = useState({
    text: '',
    type: false,
  });
  const [txtResponse, setTxtResponse] = useState();
  const emailValidator = text => {
    let reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (reg.test(text) === false) {
      setError({text: 'Please enter a valid email address', type: true});
      return false;
    } else {
      return true;
    }
  };
  const onSubmit = async () => {
    const isValidEmail = emailValidator(email);
    if (isValidEmail) {
      if (email && email.length > 0) {
        //console.log("email.length > 0")
        const res = await dispatch(sendEmailRecovery(email));
        const {success} = Utils.getValues(res, 'payload', false);
        if (success) {
          setTxtResponse(res.message);
          setEmail('');
        }
        return;
      }
    }
    setError(prev => ({
      ...prev,
      type: true,
    }));
  };
  const onChangeText = text => {
    if (!text) {
      setError({
        type: true,
        text: 'Vui lòng nhập email',
      });
      setEmail('');
    } else {
      setEmail(text);
      setError({
        type: false,
        text: '',
      });
    }
  };
  const goBack = () => {
    RootNavigation.goBack();
  };
  const forgotProps = {
    email,
    isError,
    txtResponse,
    setEmail,
    onSubmit,
    goBack,
    onChangeText,
  };
  return <ForgotPasswordScreen {...forgotProps} />;
};

export default ForgotPasswordContainer;
