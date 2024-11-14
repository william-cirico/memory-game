import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { FlipCard } from "./components/FlipCard";
import { useEffect, useState } from "react";
import { getInitialCards } from "./utils/gameUtils";
import { Board } from "./components/Board";
import { Header } from "./components/Header";

const INITIAL_POINTS = {
  1: 0,
  2: 0,
};

export default function Game() {
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [points, setPoints] = useState(INITIAL_POINTS);
  const [key, setKey] = useState(0);

  const increasePlayerPoints = () => {
    setPoints({ ...points, [currentPlayer]: points[currentPlayer] + 1 });
  };

  const restartGame = () => {
    setPoints(INITIAL_POINTS);
    setCurrentPlayer(1);
    setKey(key + 1);
  };

  const changePlayer = () => setCurrentPlayer(currentPlayer === 1 ? 2 : 1);

  return (
    <View style={styles.container}>
      <Header currentPlayer={currentPlayer} points={points} />
      <Board
        key={key}
        restartGame={restartGame}
        increasePlayerPoints={increasePlayerPoints}
        changePlayer={changePlayer}
        points={points}
        currentPlayer={currentPlayer}
      />
      <Button color={"orange"} title="Reiniciar o jogo" onPress={restartGame} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 16,
  },
});
