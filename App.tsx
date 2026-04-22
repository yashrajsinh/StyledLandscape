/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
//screens
import VideoPlayerScreen from './src/screens/VideoPlayerScreen';
function App() {
  return (
    <SafeAreaProvider>
      <ParentView>
        <VideoPlayerScreen />
      </ParentView>
    </SafeAreaProvider>
  );
}

const ParentView = styled.View`
  flex: 1;
`;

export default App;
