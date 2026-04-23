import React, { useState } from 'react';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import { useVideoPlayer, VideoView } from 'react-native-video';
import Orientation from 'react-native-orientation-locker';

const VideoPlayerScreen = () => {
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const player = useVideoPlayer(
    'https://www.w3schools.com/html/mov_bbb.mp4',
    _player => {
      _player.play();
    },
  );

  const toggleFullscreen = () => {
    if (isFullscreen) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
    setIsFullscreen(prev => !prev);
  };

  const togglePlay = () => {
    if (paused) player.play();
    else player.pause();
    setPaused(prev => !prev);
  };

  const toggleMute = () => {
    player.muted = !muted;
    setMuted(prev => !prev);
  };

  const seekForward = () => {
    player.currentTime = Math.min(player.currentTime + 5, player.duration);
  };

  const seekBackward = () => {
    player.currentTime = Math.max(player.currentTime - 5, 0);
  };

  return (
    <Container>
      <StyledVideo
        player={player}
        resizeMode="contain"
        isLandscape={isLandscape}
        screenWidth={width}
        screenHeight={height}
      />

      {!isLandscape && (
        <Buttons>
          <Btn onPress={seekBackward}>
            <BtnText>-5s</BtnText>
          </Btn>
          <Btn onPress={togglePlay}>
            <BtnText>{paused ? '▶️' : '⏸️'}</BtnText>
          </Btn>
          <Btn onPress={seekForward}>
            <BtnText>+5s</BtnText>
          </Btn>
          <Btn onPress={toggleMute}>
            <BtnText>{muted ? '🔕' : '🔔'}</BtnText>
          </Btn>
          <Btn onPress={toggleFullscreen}>
            <BtnText>↔️</BtnText>
          </Btn>
        </Buttons>
      )}

      {isLandscape && (
        <Overlay pointerEvents="box-none">
          <ExitBtn onPress={toggleFullscreen}>
            <BtnText>📱 exit</BtnText>
          </ExitBtn>
        </Overlay>
      )}
    </Container>
  );
};

export default VideoPlayerScreen;

const Container = styled.View`
  flex: 1;
  background-color: black;
  justify-content: center;
  position: relative;
`;

const StyledVideo = styled(VideoView)<{
  isLandscape: boolean;
  screenWidth: number;
  screenHeight: number;
}>`
  width: ${({ screenWidth }) => screenWidth}px;
  height: ${({ isLandscape, screenHeight }) =>
    isLandscape ? screenHeight : 250}px;
`;

const Buttons = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
`;

const Btn = styled(TouchableOpacity)`
  background-color: #333;
  padding: 12px 20px;
  margin: 10px;
  border-radius: 8px;
`;

const Overlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  justify-content: flex-start;
  align-items: flex-end;
`;

const ExitBtn = styled(TouchableOpacity)`
  margin-top: 60px;
  margin-right: 16px;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 8px 14px;
  border-radius: 8px;
`;

const BtnText = styled.Text`
  color: white;
  font-size: 16px;
`;
