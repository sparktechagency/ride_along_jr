import { CameraView, useCameraPermissions } from "expo-camera";
import { FlipType, SaveFormat, manipulateAsync } from "expo-image-manipulator";
import React, { useRef, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { ImgPassport } from "@/assets/images";
import BackButton from "@/lib/backHeader/BackButton";
import TButton from "@/lib/buttons/TButton";
import tw from "@/lib/tailwind";
import { PrimaryColor } from "@/utils/utils";
import Icon from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

const passport_photo = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [currentSide, setCurrentSide] = useState<"front" | "back">("front");
  const [imageFont, setImageFont] = useState<string | undefined>(undefined);

  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isPreview, setIsPreview] = useState(false);

  const startCameraProcess = async () => {
    if (!permission?.granted) {
      await requestPermission();
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
          // Disable any automatic mirroring
          isImageMirror: false,
        });

        // Flip the image back to match the preview
        const manipulatedImage = await manipulateAsync(
          photo?.uri as string,
          [{ flip: FlipType.Horizontal }], // This will undo the automatic flip
          { compress: 1, format: SaveFormat.JPEG }
        );

        setCapturedImage(manipulatedImage.uri);
        setIsPreview(true);
        cameraRef.current?.pausePreview();
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    }
  };

  const savePicture = () => {
    if (capturedImage) {
      setImageFont(capturedImage);

      setIsPreview(false);
      setCapturedImage(null);
      cameraRef.current?.resumePreview();
      setIsCameraActive(false);
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
            {t("driver.profilePhoto.description")}
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
                facing={"front"}
                mirror={false} // Disable preview mirroring
                enableTorch={false}
                autofocus="on"
                zoom={0}
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
              <Image
                source={ImgPassport}
                style={tw`h-52 aspect-square rounded-lg`}
                resizeMode="contain"
              />
            </View>
            <View style={tw`px-4 gap-5 pt-2`}>
              <Text
                style={tw`text-4xl text-deepBlue300 leading-tight font-NunitoSansExtraBold`}
              >
                {t("driver.profilePhoto.title")}
              </Text>

              <Text
                style={tw`text-base text-deepBlue300 font-NunitoSansMedium`}
              >
                {t("driver.profilePhoto.subtitle")}
              </Text>
            </View>
          </View>
          {imageFont && (
            <>
              <View style={tw`px-4 gap-5 mt-4`}>
                <View
                  style={tw`flex-row gap-3 p-3 border border-gray-400 rounded-lg border-dashed items-center justify-center`}
                >
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
                </View>
              </View>
            </>
          )}

          <View style={tw`gap-3 px-4 py-10`}>
            <TButton
              onPress={startCameraProcess}
              title={t("driver.profilePhoto.buttonText")}
              containerStyle={tw`bg-deepBlue50`}
              titleStyle={tw`text-deepBlue400`}
            />
            <TButton
              title={t("driver.profilePhoto.submitButton")}
              //   disabled={!imageFont || !imageBack}

              onPress={() => {
                // Handle next step
                router?.push("/driver/vehicle_information");
              }}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default passport_photo;
