import React, {useEffect, useState, useRef} from 'react';
import ChargeMainView from './templates/ChargeMainView';
import {getMemberShip, addMemberShipByAdmin} from './chargeSlice';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import Utils from '../../utils';
const ChargeContainer = props => {
  const {dispatch, navigation, memberList = []} = props;

  const goBack = () => navigation.goBack();

  const onLoadMembership = () => {
    dispatch(getMemberShip());
  };
  const addNewMembership = async (user_id, fee) => {
    if (!fee || fee == 0) {
      Toast.show({
        type: 'error',
        text1: 'Hệ thống',
        text2: 'Số tiền không được nhỏ hơn hoặc 0',
      });
      return;
    }
    const payload = {
      created_at: moment().format(),
      expired_at: moment().add(1, 'M'),
      user_id: user_id,
      charge: Number(fee),
    };
    const res = await dispatch(addMemberShipByAdmin(payload));
    const {success} = Utils.getValues(res, 'payload', false);
    if (success) {
      onLoadMembership();
    }
  };
  useEffect(() => {
    onLoadMembership();
  }, []);
  const chargeProps = {
    memberList,
    addNewMembership,
    goBack,
  };

  return <ChargeMainView {...chargeProps} />;
};

export default ChargeContainer;
