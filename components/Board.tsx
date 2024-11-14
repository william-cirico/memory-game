import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { CARD_SIZE } from "../constants/card";
import { getInitialCards } from "../utils/gameUtils";
import { FlipCard } from "./FlipCard";

interface Props {
  restartGame: () => void;
  increasePlayerPoints: () => void;
  changePlayer: () => void;
  currentPlayer: 1 | 2;
  points: { 1: number; 2: number };
}

export function Board({
  restartGame,
  increasePlayerPoints,
  changePlayer,
  currentPlayer,
  points,
}: Props) {
  const [cards] = useState<string[]>(getInitialCards());
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [isFlipping, setIsFlipping] = useState(false); // Estado para evitar que seja possível abrir uma terceira carta

  const handleCardClick = (index: number) => {
    // Se estiver comparando ou a carta já estiver virada/pareada, ignorar o clique
    if (
      isFlipping ||
      flippedCards.includes(index) ||
      matchedCards.includes(index)
    ) {
      return;
    }

    // Se for a segunda carta virada no turno
    if (flippedCards.length === 1) {
      setFlippedCards([...flippedCards, index]);
      setIsFlipping(true);
    } else {
      setFlippedCards([index]);
    }
  };

  // Efeito para checar se as cartas viradas são pares
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards;

      if (cards[firstIndex] === cards[secondIndex]) {
        setMatchedCards([...matchedCards, firstIndex, secondIndex]); // Se forem iguais deixar elas abertas
        increasePlayerPoints();
      } else {
        changePlayer();
      }

      // Definindo um temporizador para fechar as cartas se forem diferentes
      setTimeout(() => {
        setFlippedCards([]);
        setIsFlipping(false);
      }, 700);
    }
  }, [flippedCards]);

  // Efeito para checar se o jogo acabou
  useEffect(() => {
    if (cards.length && matchedCards.length === cards.length) {
      const player1Points = points[1];
      const player2Points = points[2];

      if (player1Points === player2Points) {
        Alert.alert(
          "Empate!",
          `Ambos os jogadores terminaram com ${player1Points} pontos!`,
          [{ text: "Jogar novamente", onPress: restartGame }]
        );
      } else {
        const winningPlayer = player1Points > player2Points ? 1 : 2;
        Alert.alert(
          "Fim de Jogo",
          `O jogador ${winningPlayer} venceu o jogo com ${points[winningPlayer]} pontos!`,
          [{ text: "Jogar novamente", onPress: restartGame }]
        );
      }
    }
  }, [matchedCards]);

  return (
    <View style={styles.boardContainer}>
      {cards.map((card, index) => {
        const isFlipped =
          flippedCards.includes(index) || matchedCards.includes(index);
        return (
          <FlipCard
            key={index}
            frontContent={<View style={[styles.card, styles.cardFront]} />}
            backContent={
              <View style={[styles.card, styles.cardBack]}>
                <Text style={styles.cardEmoji}>{card}</Text>
              </View>
            }
            isFlipped={isFlipped}
            onPress={() => handleCardClick(index)}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  boardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    backgroundColor: "blue",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    width: CARD_SIZE,
    height: CARD_SIZE,
  },
  cardFront: {
    backgroundColor: "#ccc",
  },
  cardBack: {
    backgroundColor: "orange",
  },
  cardEmoji: {
    fontSize: 44,
  },
});
