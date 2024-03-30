import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ContactContainer from './contactContainer';
import {ToastMessage} from '../../utils/MessageUtil';
import {
  loaderSelector,
  userInfoSelector,
  contactSelector,
} from '../../app/selectors';
import Utils from '../../utils';
export default function ContactScreen(props) {
  const {route = {}} = props;
  const dispatch = useDispatch();
  const isLoading = useSelector(loaderSelector);
  const userDetails = useSelector(userInfoSelector);
  const contactList = useSelector(contactSelector);
  const homeContainerProps = {
    dispatch,
    ToastMessage,
    isLoading,
    userDetails,
    contactList,
    route,
  };
  return <ContactContainer {...homeContainerProps} />;
}
