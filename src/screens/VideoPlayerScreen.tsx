import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useVideoPlayer, VideoView } from 'react-native-video';

const VideoPlayerScreen = () => {
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);

  const player = useVideoPlayer('https://www.w3schools.com/html/mov_bbb.mp4');
  //handles the play pause state
  const togglePlay = () => {
    if (paused) {
      player.play();
    } else {
      player.pause();
    }
    setPaused(!paused);
  };
  //mute the video
  const toggleMute = () => {
    player.muted = !muted;
    setMuted(!muted);
  };
  // to go 5+ seconds
  const seekForward = () => {
    player.currentTime += 5;
  };
  // to go 5- seconds
  const seekBackward = () => {
    player.currentTime -= 5;
  };

  return (
    <Container>
      <StyledVideo player={player} resizeMode="contain" />

      <Buttons>
        <Btn onPress={seekBackward}>
          <BtnText>{-5}</BtnText>
        </Btn>
        <Btn onPress={togglePlay}>
          <BtnText>{paused ? '▶️' : '⏸️'}</BtnText>
        </Btn>
        <Btn onPress={seekForward}>
          <BtnText>
            {'+'} {5}
          </BtnText>
        </Btn>
        <Btn onPress={toggleMute}>
          <BtnText>{muted ? '🔕' : '🔔'}</BtnText>
        </Btn>
      </Buttons>
    </Container>
  );
};

export default VideoPlayerScreen;

const Container = styled.View`
  flex: 1;
  background-color: black;
  justify-content: center;
`;

const StyledVideo = styled(VideoView)`
  width: 100%;
  height: 250px;
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

const BtnText = styled.Text`
  color: white;
  font-size: 16px;
`;
