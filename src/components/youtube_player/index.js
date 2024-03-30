import React from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';

const YoutubePlayerComponent = ({playing, onStateChange, videoId, height}) => {
  return (
    <YoutubePlayer
      height={height | 220}
      play={playing}
      videoId={videoId}
      onChangeState={onStateChange}
    />
  );
};

export default YoutubePlayerComponent;
