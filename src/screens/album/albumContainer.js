import React, {useCallback, useState, useEffect} from 'react';
import AlbumMainView from './template/AlbumMainView';
import albumPropsProvider from './albumPropsProvider';
import {launchImageLibrary} from 'react-native-image-picker';
import {useTranslation} from 'react-i18next';
import {addNewAlbum, getAlbumByID} from './albumSlice';
import Utils from '../../utils';

const AlbumContainer = props => {
  const {dispatch, ToastMessage, userDetails, albums} = props;
  const {t, i18n} = useTranslation();

  const [playing, setPlaying] = useState(false);
  const [pageName, setPageName] = useState();
  const [addNewAlbumInfo, setAddNewAlbumInfo] = useState();

  const onSwitchPage = page => {
    setPageName(page);
  };

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const onAddNewAlbumChange = useCallback((text, key) => {
    setAddNewAlbumInfo(prev => ({...prev, [key]: text}));
  }, []);

  const openGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
      },
      response => {
        if (!response.didCancel) {
          setAddNewAlbumInfo(prev => ({...prev, image: response.assets}));
        }
      },
    );
  };

  const onPressDeleteGallery = () =>
    setAddNewAlbumInfo(prev => ({...prev, image: null}));

  const onSubmitAddNewAlbum = () => {
    if (addNewAlbumInfo?.title && addNewAlbumInfo?.link) {
      const payload = {
        title: addNewAlbumInfo?.title,
        link: addNewAlbumInfo?.link,
        type: 'youtube',
      };
      dispatch(addNewAlbum(payload)).then(res => {
        const {success} = Utils.getValues(res, 'payload', false);
        if (success) {
          ToastMessage({title: 'Thêm mới thành công'});
          setAddNewAlbumInfo(null);
        } else {
          ToastMessage({title: 'Thêm mới thất bại', type: 'error'});
        }
      });
    }
  };

  const getVideoId = url => {
    let regex =
      /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
    return regex.exec(url)[3];
  };

  useEffect(() => {
    const onLoadAlbum = () => {
      dispatch(getAlbumByID({user_id: userDetails?.id}));
    };
    onLoadAlbum();
  }, []);

  const albumProps = {
    playing,
    pageName,
    addNewAlbumInfo,
    albums,
    t,
    onStateChange,
    onSwitchPage,
    onAddNewAlbumChange,
    openGallery,
    onPressDeleteGallery,
    onSubmitAddNewAlbum,
    getVideoId
  };
  return <AlbumMainView {...albumPropsProvider(albumProps)} />;
};

export default AlbumContainer;
