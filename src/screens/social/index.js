import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ToastMessage} from '../../utils/MessageUtil';
import {
  loaderSelector,
  userInfoSelector,
  contactSelector,
  roleSelector,
  socialSelector,
  myCompanyInfoSelector,
} from '../../app/selectors';
import {useTranslation} from 'react-i18next';
import SocialContainer from './SocialContainer';
export default function SocialScreen(props) {
  const {route, navigation} = props;
  const {t, i18n} = useTranslation();

  const dispatch = useDispatch();
  const isLoading = useSelector(loaderSelector);
  const userDetails = useSelector(userInfoSelector);
  const socialList = useSelector(socialSelector);

  const socialProps = {
    dispatch,
    ToastMessage,
    isLoading,
    userDetails,
    route,
    navigation,
    socialList,
    t,
  };
  return <SocialContainer {...socialProps} />;
}
