import { StyleSheet, Text, View } from "react-native";

interface Props {
  currentPlayer: 1 | 2;
  points: { 1: number; 2: number };
}

export function Header({ currentPlayer, points }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.pointsContainer}>
        <Text style={styles.pointsText}>Jogador 1: {points[1]} pontos</Text>
        <Text style={styles.pointsText}>Jogador 2: {points[2]} pontos</Text>
      </View>
      <Text>Vez do Jogador: {currentPlayer}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  pointsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pointsText: {
    fontSize: 18,
  },
});
