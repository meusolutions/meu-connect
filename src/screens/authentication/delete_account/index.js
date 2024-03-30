import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import DeleteContainer from './DeleteContainer';
import RootNavigation from '../../../navigation/RootNavigation';

const DeleteAccountScreen = props => {
  const dispatch = useDispatch();
  const {navigation} = props;
  const DeleteContainerProps = {
    dispatch,
    navigation,
  };
  return <DeleteContainer {...DeleteContainerProps} />;
};

export default DeleteAccountScreen;
