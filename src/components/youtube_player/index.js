import { width } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import React from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';

const YoutubePlayerComponent = ({ playing, onStateChange, videoId, height }) => {
  return (
    <YoutubePlayer
      width={width | 300}
      height={height | 120}
      play={playing}
      videoId={videoId}
      onChangeState={onStateChange}
    />
  );
};

export default YoutubePlayerComponent;
