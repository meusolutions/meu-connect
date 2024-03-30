import React from 'react';
import {SafeAreaView} from 'react-native';
import styles from '../albumStyles';
import AddNew from './subViews/AddNew';
import ShowAlbum from './subViews/ShowAlbum';
import Config from '../../../configuration';
const {albumPath} = Config;
const AlbumMainView = props => {
  const {pageName, showAlbumProps, addNewAlbumProps} = props;

  let AlbumComponent;
  switch (pageName) {
    case albumPath.ShowScreen:
      AlbumComponent = <ShowAlbum {...showAlbumProps} />;
      break;
    case albumPath.AddNewScreen:
      AlbumComponent = <AddNew {...addNewAlbumProps} />;
      break;
    default:
      AlbumComponent = <ShowAlbum {...showAlbumProps} />;
      break;
  }
  return <SafeAreaView style={styles.container}>{AlbumComponent}</SafeAreaView>;
};

export default AlbumMainView;
