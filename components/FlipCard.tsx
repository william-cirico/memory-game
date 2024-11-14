import { ReactNode } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { CARD_SIZE, ROTATION_DURATION } from "../constants/card";

interface Props {
  isFlipped: boolean;
  frontContent: ReactNode;
  backContent: ReactNode;
  onPress: () => void;
}

export function FlipCard({
  frontContent: FrontContent,
  backContent: BackContent,
  isFlipped,
  onPress,
}: Props) {
  const frontCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped), [0, 1], [0, 180]);
    const rotateValue = withTiming(`${spinValue}deg`, {
      duration: ROTATION_DURATION,
    });

    return {
      transform: [{ rotateY: rotateValue }],
    };
  });

  const backCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped), [0, 1], [180, 360]);
    const rotateValue = withTiming(`${spinValue}deg`, {
      duration: ROTATION_DURATION,
    });

    return {
      transform: [{ rotateY: rotateValue }],
    };
  });

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Animated.View
        style={[styles.frontCardContainer, styles.card, frontCardAnimatedStyle]}
      >
        {FrontContent}
      </Animated.View>
      <Animated.View
        style={[styles.backCardContainer, styles.card, backCardAnimatedStyle]}
      >
        {BackContent}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  frontCardContainer: {
    position: "absolute",
    zIndex: 1,
  },
  backCardContainer: {
    backfaceVisibility: "hidden",
    zIndex: 2,
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
  },
});
