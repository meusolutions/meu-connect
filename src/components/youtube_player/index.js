import { width } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { Menu, MenuItem } from 'react-native-material-menu';
import { IMAGES } from '../../values/images';

const YoutubePlayerComponent = ({ playing, onStateChange, videoId, height, onDelete, index }) => {
  return (
    <View>
      <YoutubePlayer
        width={width | 300}
        height={height | 120}
        play={playing}
        videoId={videoId}
        onChangeState={onStateChange}
      />

      <TouchableOpacity
        onPress={() => onDelete(index)}
        style={{ position: 'absolute', top: 5, right: 10 }}>
        <Image source={IMAGES.IcClose} style={{ width: 20, height: 20 }} />
      </TouchableOpacity>
    </View>

  );
};

export default YoutubePlayerComponent;
