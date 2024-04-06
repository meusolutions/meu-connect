export default function albumPropsProvider(props) {
  const {
    playing,
    pageName,
    onStateChange,
    onSwitchPage,
    addNewAlbumInfo,
    onAddNewAlbumChange,
    openGallery,
    onPressDeleteGallery,
    onSubmitAddNewAlbum,
    t,
    albums,
    getVideoId,
    onDeleteAlbum,
    showAlert,
    hideAlert,
    onSubmitDeleteAlbum
  } = props;
  return {
    pageName,
    showAlbumProps: {
      playing,
      onStateChange,
      onSwitchPage,
      albums,
      getVideoId,
      onDeleteAlbum,
      showAlert,
      hideAlert,
      onSubmitDeleteAlbum
    },
    addNewAlbumProps: {
      addNewAlbumInfo,
      onAddNewAlbumChange,
      openGallery,
      onPressDeleteGallery,
      t,
      onSubmitAddNewAlbum,
      onSwitchPage,
    },
  };
}
