import React, { useState, useEffect } from 'react';
import { TouchableOpacity, ToastAndroid } from 'react-native';
import styled from 'styled-components/native';
import { useVideoPlayer, VideoView, useEvent } from 'react-native-video';
import Slider from '@react-native-community/slider';

const VideoPlayerScreen = () => {
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  const player = useVideoPlayer(
    'https://www.w3schools.com/html/mov_bbb.mp4',
    _player => {
      _player.play();
    },
  );

  useEvent(player, 'onError', error => {
    ToastAndroid.show('ERROR: ' + error.message, ToastAndroid.LONG);
  });

  useEvent(player, 'onLoad', () => {
    setDuration(player.duration);
    ToastAndroid.show('VIDEO LOADED', ToastAndroid.SHORT);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isSeeking && player.duration > 0) {
        setCurrentTime(player.currentTime);
        setProgress(player.currentTime / player.duration);
        setDuration(player.duration);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [isSeeking]);

  const togglePlayPause = () => {
    if (paused) {
      player.play();
    } else {
      player.pause();
    }
    setPaused(prev => !prev);
  };

  const toggleMute = () => {
    player.muted = !muted;
    setMuted(prev => !prev);
  };

  const seekForward = () => {
    player.currentTime = Math.min(player.currentTime + 10, player.duration);
  };

  const seekBackward = () => {
    player.currentTime = Math.max(player.currentTime - 10, 0);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <Container>
      <StyledVideo player={player} controls={false} resizeMode="contain" />

      <ControlsWrapper>
        <TimeRow>
          <TimeText>{formatTime(currentTime)}</TimeText>
          <TimeText>{formatTime(duration)}</TimeText>
        </TimeRow>

        <Slider
          style={{ width: '100%', height: 40 }}
          value={progress}
          minimumTrackTintColor="#fff"
          maximumTrackTintColor="#555"
          thumbTintColor="#fff"
          onSlidingStart={() => {
            setIsSeeking(true);
            player.pause();
          }}
          onValueChange={val => {
            setProgress(val);
            setCurrentTime(val * duration);
          }}
          onSlidingComplete={val => {
            player.currentTime = val * duration;
            setIsSeeking(false);
            if (!paused) player.play();
          }}
        />

        <Buttons>
          <Btn onPress={seekBackward}>
            <BtnText>-10s</BtnText>
          </Btn>

          <Btn onPress={togglePlayPause} primary>
            <BtnText>{paused ? '▶' : '⏸'}</BtnText>
          </Btn>

          <Btn onPress={seekForward}>
            <BtnText>+10s</BtnText>
          </Btn>

          <Btn onPress={toggleMute}>
            <BtnText>{muted ? '🔇' : '🔊'}</BtnText>
          </Btn>
        </Buttons>
      </ControlsWrapper>
    </Container>
  );
};

export default VideoPlayerScreen;

// --- Styled Components ---

const Container = styled.View`
  flex: 1;
  background-color: black;
  justify-content: center;
`;

const StyledVideo = styled(VideoView)`
  width: 100%;
  aspect-ratio: 1.777;
`;

const ControlsWrapper = styled.View`
  padding-horizontal: 16px;
  padding-top: 8px;
`;

const TimeRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const TimeText = styled.Text`
  color: #ccc;
  font-size: 12px;
`;

const Buttons = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
`;

const Btn = styled(TouchableOpacity)<{ primary?: boolean }>`
  background-color: ${({ primary }) => (primary ? '#555' : '#333')};
  padding-horizontal: ${({ primary }) => (primary ? '24px' : '18px')};
  padding-vertical: 10px;
  border-radius: 8px;
`;

const BtnText = styled.Text`
  color: white;
  font-size: 16px;
`;
