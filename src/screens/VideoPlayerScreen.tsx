import React, { useRef } from 'react';
import { ToastAndroid } from 'react-native';
import styled from 'styled-components/native';
import Video, { VideoRef } from 'react-native-video';

type Props = {};

const VideoPlayerScreen = (props: Props) => {
  const videoRef = useRef<VideoRef>(null);

  return (
    <Container>
      <StyledVideo
        ref={videoRef}
        source={{
          uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
        }}
        controls={true}
        resizeMode="cover"
        paused={false}
        onError={e =>
          ToastAndroid.show(
            'VIDEO ERROR: ' + e.error?.errorString,
            ToastAndroid.LONG,
          )
        }
        onLoad={() => ToastAndroid.show('VIDEO LOADED', ToastAndroid.LONG)}
        onBuffer={({ isBuffering }) => {
          if (isBuffering) ToastAndroid.show('BUFFERING', ToastAndroid.LONG);
        }}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

const StyledVideo = styled(Video)`
  width: 100%;
  height: 250px;
`;

export default VideoPlayerScreen;
