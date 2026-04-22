import React from 'react';
import { StyleSheet, View, ToastAndroid } from 'react-native';
import { useVideoPlayer, VideoView, useEvent } from 'react-native-video';
//styled RN
import styled from 'styled-components/native';

const VideoPlayerScreen = () => {
  const player = useVideoPlayer(
    'https://www.w3schools.com/html/mov_bbb.mp4',
    _player => {
      _player.play(); // auto-play
    },
  );

  useEvent(player, 'onError', error => {
    ToastAndroid.show('ERROR: ' + error.message, ToastAndroid.LONG);
  });

  useEvent(player, 'onLoad', () => {
    ToastAndroid.show('VIDEO LOADED', ToastAndroid.LONG);
  });

  return (
    <View style={styles.container}>
      <VideoView
        player={player}
        style={styles.video}
        controls
        resizeMode="cover"
      />
    </View>
  );
};

const Cotainer = styled.View`
 flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
`;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  video: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
});

export default VideoPlayerScreen;
