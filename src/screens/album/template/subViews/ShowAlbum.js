import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../../albumStyles';
import colors from '../../../../values/colors';
import { IMAGES } from '../../../../values/images';
import Config from '../../../../configuration';
import YoutubePlayerComponent from '../../../../components/youtube_player';
import Alert from 'react-native-awesome-alerts';
const Item = React.memo(
  props => {
    const { item, playing, onStateChange, getVideoId, index, onDeleteAlbum } =
      props;
    return (
      <View style={styles.itemPlayer}>
        <View>
          <YoutubePlayerComponent
            play={playing}
            videoId={getVideoId(item.link)}
            onChangeState={onStateChange}
            height={100}
            index={index}
            onDelete={onDeleteAlbum}
          />
          <View style={styles.playerTitle}>
            <Text
              style={{
                textAlign: 'center',
              }}>
              {item.title}
            </Text>
          </View>
        </View>
      </View>
    );
  },
  (prev, next) => prev.item === next.item && prev.playing === next.playing,
);
const ShowAlbum = props => {
  const {
    playing,
    onStateChange,
    onSwitchPage,
    albums,
    getVideoId,
    onDeleteAlbum,
    showAlert,
    hideAlert,
    onSubmitDeleteAlbum,
  } = props;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={albums}
        renderItem={({ item, index }) => (
          <Item
            item={item}
            playing={playing}
            onStateChange={onStateChange}
            getVideoId={getVideoId}
            index={index}
            onDeleteAlbum={onDeleteAlbum}
          />
        )}
        keyExtractor={item => item.id}
      />

      <TouchableOpacity
        style={styles.btnAddMore}
        onPress={() => onSwitchPage(Config.albumPath.AddNewScreen)}>
        <Image source={IMAGES.IcAddMore} style={{ width: 20, height: 20 }} />
      </TouchableOpacity>
      <Alert
        show={showAlert.isError}
        showProgress={false}
        title={showAlert.title}
        message={showAlert.message}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Xóa"
        confirmButtonColor="#DD6B55"
        cancelText="Đóng"
        showCancelButton={true}
        onCancelPressed={hideAlert}
        onConfirmPressed={onSubmitDeleteAlbum}
      />
    </SafeAreaView>
  );
};

export default ShowAlbum;
