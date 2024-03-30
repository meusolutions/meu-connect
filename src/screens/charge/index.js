import React, {useEffect, useState} from 'react';
import ChargeContainer from './chargeContainer';
import {useDispatch, useSelector} from 'react-redux';
import {memberSelector} from '../../app/selectors';
const ChargeScreen = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const memberList = useSelector(memberSelector);
  const chargeProps = {
    dispatch,
    navigation,
    memberList,
  };
  return <ChargeContainer {...chargeProps} />;
};

export default ChargeScreen;
