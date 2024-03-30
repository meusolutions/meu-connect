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
import {IMAGES} from '../../../../values/images';
import Config from '../../../../configuration';
import YoutubePlayerComponent from '../../../../components/youtube_player';

const Item = React.memo(
  props => {
    const {item, playing, onStateChange, getVideoId} = props;
    return (
      <View style={styles.itemPlayer}>
        <View>
          <YoutubePlayerComponent
            play={playing}
            videoId={getVideoId(item.link)}
            onChangeState={onStateChange}
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
  const {playing, onStateChange, onSwitchPage, albums, getVideoId} = props;

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={albums}
        renderItem={({item}) => (
          <Item
            item={item}
            playing={playing}
            onStateChange={onStateChange}
            getVideoId={getVideoId}
          />
        )}
        keyExtractor={item => item.id}
      />

      <TouchableOpacity
        style={styles.btnAddMore}
        onPress={() => onSwitchPage(Config.albumPath.AddNewScreen)}>
        <Image source={IMAGES.IcAddMore} style={{width: 20, height: 20}} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ShowAlbum;
