import React, {useEffect, useState} from 'react';
import IntroScreen from './IntroductionScreen';
import RootNavigation from '../../../navigation/RootNavigation';
import {APP_NAVIGATE_SCREEN} from '../../../utils/constant';
import {useTranslation} from 'react-i18next';
const IntroductionContainer = props => {
  // console.log("props: ", props)
  const {t, i18n} = useTranslation();

  const [indexSwiper, setIndex] = useState(0);
  const [showsPagination, setShowPagination] = useState(true);
  const [scroll, setScrollEnabled] = useState(true);

  const nextView = () => {
    setIndex(indexSwiper + 1);
  };
  const preView = () => {
    setIndex(indexSwiper - 1);
  };

  const hidePagination = () => {
    //console.log("hidePagination")
    setShowPagination(false);
  };
  const showPagination = () => {
    //console.log("hidePagination")
    setShowPagination(true);
  };
  const scrollEnabled = () => {
    setScrollEnabled(true);
  };
  const disableScroll = () => {
    setScrollEnabled(false);
  };
  const onSwiper = index => {
    //console.log(index)
    setIndex(index);
    if (index >= 3) {
      hidePagination();
      disableScroll();
    } else {
      showPagination();
      scrollEnabled();
    }
  };
  const navigateToDomain = () => {
   
    RootNavigation.navigate(APP_NAVIGATE_SCREEN.SERVER)
  }
  const introProps = {
    indexSwiper,
    showsPagination,
    scroll,
    nextView,
    preView,
    onSwiper,
    navigateToDomain
  };
  return <IntroScreen {...introProps} />;
};

export default IntroductionContainer;
