import { EMOJIS } from "../constants/emojis";
import { PAIRS_COUNT } from "../constants/game";

const getRandomEmojis = (emojis: string[], count: number): string[] => {
  const randomEmojis = new Set<string>();

  while (randomEmojis.size < count) {
    const randomIndex = Math.floor(Math.random() * emojis.length);

    randomEmojis.add(emojis[randomIndex]);
  }

  return [...randomEmojis];
};

export const getInitialCards = () => {
  const cards = getRandomEmojis(EMOJIS, PAIRS_COUNT);

  return cards.concat(cards).sort(() => Math.random() - 0.5);
};
