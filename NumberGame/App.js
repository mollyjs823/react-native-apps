import { useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import Colors from './util/colors';

export default function App() {
  const [userNum, setUserNum] = useState();
  const [isGameOver, setIsGameOver] = useState(true);
  const [rounds, setRounds] = useState(0);

  const [fontLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  if (!fontLoaded) {
    return <AppLoading />
  }

  function pickedNumHandler(pickedNum) {
    setUserNum(pickedNum);
    setIsGameOver(false);
  };

  function gameOverHandler(numRounds) {
    setIsGameOver(true);
    setRounds(numRounds)
  };

  function restartGameHandler() {
    setUserNum(null);
    setRounds(0);
  };

  let screen = <StartGameScreen onConfirm={pickedNumHandler} />;

  if (userNum) {
    screen = <GameScreen userNumber={userNum} onGameOver={gameOverHandler} />;
  };

  if (isGameOver && userNum) {
    screen = <GameOverScreen 
                onRestart={restartGameHandler} 
                userNumber={userNum} 
                rounds={rounds} 
              />;
  };

  return (
    <>
    <StatusBar style="light" />
    <LinearGradient 
      colors={[Colors.primary700, Colors.accent500]} 
      style={styles.rootContainer} 
    >
      <ImageBackground 
        source={require('./assets/images/background.png')} 
        resizeMode="cover"
        style={styles.rootContainer}
        imageStyle={styles.bgImage}
      >
        <SafeAreaView style={styles.rootContainer}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  bgImage: {
    opacity: 0.15,
  },
});
