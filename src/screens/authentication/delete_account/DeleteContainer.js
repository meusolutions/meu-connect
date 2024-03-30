import React, {useEffect, useState} from 'react';
import DeleteMainView from './DeleteMainView';
import RootNavigation from '../../../navigation/RootNavigation';
import {deleteAccount, deleteOtp} from '../login/LoginSlice';
import {ToastMessage} from '../../../utils/MessageUtil';
import {APP_NAVIGATE_SCREEN} from '../../../utils/constant';
import Utils from '../../../utils';
const DeleteAccountContainer = props => {
  const {navigation, dispatch} = props;
  const [timeLeft, setTimeLeft] = useState(60);

  const handleDeleteAccount = async data => {
    const {email, otpCode, password} = data;

    const payload = {
      otp: otpCode,
    };
    try {
      const res = await dispatch(deleteAccount(payload));
      const {success} = Utils.getValues(res, 'payload', false);
      if (success) {
        ToastMessage({
          title: 'Xóa tài khoản thành công',
        });
        RootNavigation.navigate(APP_NAVIGATE_SCREEN.LOGIN);
      } else {
        ToastMessage({
          title: 'Xóa tài khoản thất bại',
          type: 'error',
        });
      }
    } catch (err) {
      console.error(err);
      ToastMessage({
        title: 'Xóa tài khoản thất bại',
        message: err,
        type: 'error',
      });
    }
  };
  const handleSendDeleteOtp = async () => {
    if (timeLeft > 0) return;
    try {
      const res = await dispatch(deleteOtp());
      const {success, message} = Utils.getValues(res, 'payload', false);
      if (success) {
        ToastMessage({
          title: 'Gửi mã otp thành công!!!',
        });
        setTimeLeft(60);
      } else {
        ToastMessage({
          message: message,
          type: 'error',
        });
      }
    } catch (err) {
      console.log(err);
      ToastMessage({
        message: err,
        type: 'error',
      });
    }
  };
  const onBack = () => {
    navigation.goBack();
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    if (timeLeft === 0) {
      clearTimeout(timer);
    }
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const deleteProps = {
    timeLeft,
    onBack,
    handleDeleteAccount,
    handleSendDeleteOtp,
  };

  return <DeleteMainView {...deleteProps} />;
};

export default DeleteAccountContainer;
