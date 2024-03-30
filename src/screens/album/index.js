import React from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {
  albumSelector,
  loaderSelector,
  userInfoSelector,
} from '../../app/selectors';
import {ToastMessage} from '../../utils/MessageUtil';
import AlbumContainer from './albumContainer';

export default function AlbumScreen(props) {
  const {route, navigation} = props;
  const {t, i18n} = useTranslation();

  const dispatch = useDispatch();
  const isLoading = useSelector(loaderSelector);
  const userDetails = useSelector(userInfoSelector);
  const albums = useSelector(albumSelector);
  
  const albumContainerProps = {
    dispatch,
    ToastMessage,
    isLoading,
    userDetails,
    albums,
  };
  return <AlbumContainer {...albumContainerProps} />;
}
