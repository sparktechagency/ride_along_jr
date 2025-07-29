import * as ImagePicker from "expo-image-picker";

export const usePickImage =
  async (): Promise<ImagePicker.ImagePickerAsset | null> => {
    const result = await ImagePicker.launchImageLibraryAsync({});
    if (result.assets) {
      return result.assets[0];
    }
    return null;
  };
