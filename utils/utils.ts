import { Dimensions } from "react-native";

export const HIGHT = Dimensions.get("screen").height;
export const WIDTH = Dimensions.get("screen").width;

export const PrimaryColor = "#5c7b7e";
export const bytesToMB = (bytes: number) => {
  return (bytes / (1024 * 1024)).toFixed(2);
};
