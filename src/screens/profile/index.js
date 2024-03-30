import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ProfileContainer from './profileContainer';
import {ToastMessage} from '../../utils/MessageUtil';
import {
  loaderSelector,
  userInfoSelector,
  contactSelector,
  roleSelector,
  socialSelector,
  myCompanyInfoSelector,
  isActiveMemberSelector,
} from '../../app/selectors';
import {useTranslation} from 'react-i18next';
export default function ProfileScreen(props) {
  const {route, navigation} = props;
  const {t, i18n} = useTranslation();

  const dispatch = useDispatch();
  const isLoading = useSelector(loaderSelector);
  const userDetails = useSelector(userInfoSelector);
  const contactList = useSelector(contactSelector);
  const myRole = useSelector(roleSelector);
  const socialList = useSelector(socialSelector);
  const myCompanyInfo = useSelector(myCompanyInfoSelector);
  const isActiveMember = useSelector(isActiveMemberSelector);
  const profileContainerProps = {
    dispatch,
    ToastMessage,
    isLoading,
    userDetails,
    contactList,
    route,
    myRole,
    navigation,
    socialList,
    t,
    myCompanyInfo,
    isActiveMember,
  };
  return <ProfileContainer {...profileContainerProps} />;
}
