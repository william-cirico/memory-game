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

// Fisher-Yates Shuffle
const shuffle = (array: any[]) => {
  const copyArray = [...array];

  for (let i = copyArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));

    [copyArray[i], copyArray[j]] = [copyArray[j], copyArray[i]];
  }

  return copyArray;
}

export const getInitialCards = () => {
  const cards = getRandomEmojis(EMOJIS, PAIRS_COUNT);

  return shuffle(cards.concat(cards));
};
