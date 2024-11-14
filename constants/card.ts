import { Dimensions } from "react-native";
import { COLUMNS_COUNT } from "./game";

const { width } = Dimensions.get("screen");

export const ROTATION_DURATION = 500;
export const CARD_SIZE = width / COLUMNS_COUNT - 16;