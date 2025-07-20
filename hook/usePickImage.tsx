import * as ImagePicker from "expo-image-picker";

export const usePickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({});
  if (result.assets) {
    return result.assets[0].uri;
  }
  return null;
};
