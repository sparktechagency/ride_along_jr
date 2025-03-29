import * as ImagePicker from "expo-image-picker";

import { CameraView, useCameraPermissions } from "expo-camera";
import { IconDriverDocument, IconUploadSmall } from "@/assets/icon/Icon";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";

import BackButton from "@/lib/backHeader/BackButton";
import Icon from "@expo/vector-icons/Feather";
import { PrimaryColor } from "@/utils/utils";
import { SvgXml } from "react-native-svg";
import TButton from "@/lib/buttons/TButton";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";

const driving_license = () => {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [currentSide, setCurrentSide] = useState<"front" | "back">("front");
  const [imageFont, setImageFont] = useState<string | undefined>(undefined);
  const [imageBack, setImageBack] = useState<string | undefined>(undefined);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isPreview, setIsPreview] = useState(false);

  const pickImageFont = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setImageFont(result.assets[0].uri);
    }
  };

  const pickImageBack = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setImageBack(result.assets[0].uri);
    }
  };

  const startCameraProcess = async () => {
    if (!permission?.granted) {
      await requestPermission();
    }
    if (imageFont) {
      setCurrentSide("back");
    } else {
      setCurrentSide("front");
    }
    setIsCameraActive(true);
    setIsPreview(false);
    setCapturedImage(null);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1,
          skipProcessing: true,
        });
        setCapturedImage(photo?.uri as string);
        setIsPreview(true);
        cameraRef.current?.pausePreview();
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    }
  };

  const savePicture = () => {
    if (capturedImage) {
      if (currentSide === "front") {
        setImageFont(capturedImage);
        // Move to back side
        setCurrentSide("back");
        setIsPreview(false);
        setCapturedImage(null);
        cameraRef.current?.resumePreview();
        // setIsCameraActive(false);
      } else {
        setImageBack(capturedImage);
        setIsCameraActive(false);
      }
    }
  };

  const retakePicture = () => {
    setIsPreview(false);
    setCapturedImage(null);
    cameraRef.current?.resumePreview();
  };

  const cancelCamera = () => {
    setIsCameraActive(false);
    setCurrentSide("front");
    setIsPreview(false);
    setCapturedImage(null);
  };

  return (
    <View style={tw`flex-1 bg-base`}>
      <BackButton onPress={() => router.back()} />

      {isCameraActive ? (
        <View style={tw`flex-1`}>
          <Text
            style={tw`text-lg font-semibold text-center text-deepBlue300 py-2`}
          >
            {currentSide === "front"
              ? "Please take photo of front side"
              : "Please take photo of back side"}
          </Text>

          {isPreview ? (
            <View style={tw`flex-1 m-4 rounded-lg bg-gray-100 justify-center`}>
              <Image
                source={{ uri: capturedImage || "" }}
                style={tw`flex-1 max-w-full aspect-video rounded-lg`}
                resizeMode="contain"
              />
              <View style={tw`flex-row justify-around py-6`}>
                <TouchableOpacity onPress={retakePicture} style={tw``}>
                  <Icon name="rotate-ccw" size={50} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={savePicture} style={tw``}>
                  <Icon name="check" size={50} color={PrimaryColor} />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <>
              <CameraView
                ref={cameraRef}
                style={tw`flex-1 m-4 rounded-lg`}
                facing={"back"}
              />
              <View style={tw`flex-row justify-around py-6`}>
                <TouchableOpacity onPress={cancelCamera} style={tw``}>
                  <Icon name="x" size={50} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={takePicture} style={tw``}>
                  <Icon name="camera" size={50} color={PrimaryColor} />
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      ) : (
        <ScrollView>
          <View style={tw`gap-6 py-4`}>
            <View style={tw` justify-center items-center`}>
              <SvgXml xml={IconDriverDocument} />
            </View>
            <View style={tw`px-4 gap-5 `}>
              <Text
                style={tw`text-3xl  text-center text-deepBlue300 leading-tight font-NunitoSansExtraBold`}
              >
                Upload both side of your Driving license
              </Text>
            </View>
          </View>

          <View style={tw`px-4 gap-5 mt-4`}>
            <TouchableOpacity
              onPress={pickImageFont}
              style={tw`flex-row gap-3 p-3 border border-gray-400 rounded-lg border-dashed items-center justify-center`}
            >
              {imageFont ? (
                <>
                  <Image
                    source={{ uri: imageFont }}
                    style={tw`w-full aspect-video rounded-lg`}
                    resizeMode="contain"
                  />
                  <TouchableOpacity
                    onPress={() => setImageFont(undefined)}
                    style={tw`absolute top-2 right-2 bg-white rounded-md`}
                  >
                    <Icon name="x" size={30} color="black" />
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <SvgXml xml={IconUploadSmall} />
                  <Text
                    style={tw`text-gray-600 text-base font-NunitoSansRegular`}
                  >
                    Upload front side
                  </Text>
                </>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={pickImageBack}
              style={tw`flex-row gap-3 p-3 border border-gray-400 rounded-lg border-dashed items-center justify-center`}
            >
              {imageBack ? (
                <>
                  <Image
                    source={{ uri: imageBack }}
                    style={tw`w-full aspect-video rounded-lg`}
                    resizeMode="contain"
                  />
                  <TouchableOpacity
                    onPress={() => setImageBack(undefined)}
                    style={tw`absolute top-2 right-2 bg-white rounded-md`}
                  >
                    <Icon name="x" size={30} color="black" />
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <SvgXml xml={IconUploadSmall} />
                  <Text
                    style={tw`text-gray-600 text-base font-NunitoSansRegular`}
                  >
                    Upload back side
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
          <View style={tw`gap-3 px-4 py-10`}>
            <TButton
              onPress={startCameraProcess}
              title="Take a photo"
              containerStyle={tw`bg-deepBlue50`}
              titleStyle={tw`text-deepBlue400`}
            />
            <TButton
              title="Next 4/6"
              //   disabled={!imageFont || !imageBack}

              onPress={() => {
                // Handle next step
                router?.push("/driver/take_passport_photo");
              }}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default driving_license;
