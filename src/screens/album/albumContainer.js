import React, { useCallback, useState, useEffect } from 'react';
import AlbumMainView from './template/AlbumMainView';
import albumPropsProvider from './albumPropsProvider';
import { launchImageLibrary } from 'react-native-image-picker';
import { useTranslation } from 'react-i18next';
import { addNewAlbum, deleteAlbum, getAlbumByID } from './albumSlice';
import Utils from '../../utils';

const AlbumContainer = props => {
  const { dispatch, ToastMessage, userDetails, albums } = props;
  const { t, i18n } = useTranslation();

  const [playing, setPlaying] = useState(false);
  const [pageName, setPageName] = useState();
  const [addNewAlbumInfo, setAddNewAlbumInfo] = useState();
  const [chooseVideoId, setChooseVideoId] = useState();
  const [showAlert, setShowAlert] = useState({
    isError: false,
    title: '',
    message: '',
  });

  const onSwitchPage = page => {
    setPageName(page);
  };

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const onAddNewAlbumChange = useCallback((text, key) => {
    setAddNewAlbumInfo(prev => ({ ...prev, [key]: text }));
  }, []);

  const openGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
      },
      response => {
        if (!response.didCancel) {
          setAddNewAlbumInfo(prev => ({ ...prev, image: response.assets }));
        }
      },
    );
  };

  const onPressDeleteGallery = () =>
    setAddNewAlbumInfo(prev => ({ ...prev, image: null }));

  const onSubmitAddNewAlbum = () => {
    if (addNewAlbumInfo?.title && addNewAlbumInfo?.link) {
      const payload = {
        title: addNewAlbumInfo?.title,
        link: addNewAlbumInfo?.link,
        type: 'youtube',
      };
      dispatch(addNewAlbum(payload)).then(res => {
        const { success } = Utils.getValues(res, 'payload', false);
        if (success) {
          onLoadAlbum()
          ToastMessage({ title: 'Thêm mới thành công' });
          setAddNewAlbumInfo(null);
        } else {
          ToastMessage({ title: 'Thêm mới thất bại', type: 'error' });
        }
      });
    }
  };

  const getVideoId = url => {
    if (!url) return '';
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
  };
  const onLoadAlbum = () => {
    dispatch(getAlbumByID({ user_id: userDetails?.id }));
  };

  const onDeleteAlbum = (index) => {
    setChooseVideoId(index)
    setShowAlert({
      isError: true,
      title: 'Hệ thống',
      message: 'Bạn chắc xóa album này chứ ?',
    });

  }
  const hideAlert = () => {
    setShowAlert({
      isError: false,
      title: '',
      message: '',
    });

  };

  const onSubmitDeleteAlbum = () => {
    dispatch(deleteAlbum({ id: albums[chooseVideoId].id })).then((res) => {
      const { success } = Utils.getValues(res, 'payload', false)
      if (success) {
        ToastMessage({ title: 'Xóa thành công' });
        onLoadAlbum();
      }
      hideAlert()
    })
  }

  useEffect(() => {
    onLoadAlbum();
  }, [userDetails]);

  const albumProps = {
    playing,
    pageName,
    addNewAlbumInfo,
    albums,
    showAlert,
    t,
    onStateChange,
    onSwitchPage,
    onAddNewAlbumChange,
    openGallery,
    onPressDeleteGallery,
    onSubmitAddNewAlbum,
    getVideoId,
    onDeleteAlbum,
    hideAlert,
    onSubmitDeleteAlbum
  };
  return <AlbumMainView {...albumPropsProvider(albumProps)} />;
};

export default AlbumContainer;
