import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import HomeContainer from './homeContainer';
import {ToastMessage} from '../../utils/MessageUtil';
import {
  loaderSelector,
  userInfoSelector,
  quotationSelector,
  birthdayOfMonthSelector,
} from '../../app/selectors';
export default function HomeScreen(props) {
  const dispatch = useDispatch();
  const isLoading = useSelector(loaderSelector);
  const userDetails = useSelector(userInfoSelector);
  const quotation = useSelector(quotationSelector);
  const birthdayOfMonth = useSelector(birthdayOfMonthSelector);
  const homeContainerProps = {
    dispatch,
    ToastMessage,
    isLoading,
    userDetails,
    quotation,
    birthdayOfMonth,
  };
  return <HomeContainer {...homeContainerProps} />;
}
