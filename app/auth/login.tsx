import {
  IconCloseEye,
  IconEmail,
  IconGoogleIcon,
  IconLock,
  IconOpenEye,
} from "@/assets/icon/Icon";
import { Link, useRouter } from "expo-router";
import {
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import BackButton from "@/lib/backHeader/BackButton";
import IwtButton from "@/lib/buttons/IwtButton";
import TButton from "@/lib/buttons/TButton";
import InputText from "@/lib/inputs/InputText";
import tw from "@/lib/tailwind";
import { PrimaryColor } from "@/utils/utils";
import React from "react";
import { Checkbox } from "react-native-ui-lib";

const login = () => {
  const router = useRouter();

  const [checkBox, setCheckBox] = React.useState(false);
  const [IsShow, setIsShow] = React.useState(false);

  const handleKeyboardDismiss = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
      <View style={tw`flex-1 bg-base gap-2`}>
        <BackButton onPress={() => router.back()} />
        <View style={tw`px-4 gap-5 pt-2`}>
          <Text
            style={tw`text-3xl text-deepBlue300 leading-tight font-NunitoSansExtraBold`}
          >
            Booking a fun ride for your kid
          </Text>

          <Text style={tw`text-base text-deepBlue300 font-NunitoSansMedium`}>
            Get started by signing up here.
          </Text>
        </View>
        <View style={tw`px-4 gap-5 mt-8`}>
          <View style={tw``}>
            <InputText
              // label="Email"
              textXValue={-36}
              placeholder="Email"
              svgFirstIcon={IconEmail}
              focusSTyle={tw`border border-primary`}
            />
          </View>
          <View style={tw``}>
            <InputText
              // label="Email"
              placeholder="Password"
              textInputProps={{
                secureTextEntry: !IsShow,
              }}
              svgFirstIcon={IconLock}
              svgSecondIcon={IsShow ? IconOpenEye : IconCloseEye}
              focusSTyle={tw`border border-primary`}
              svgSecondOnPress={() => {
                setIsShow(!IsShow);
              }}
            />
          </View>
        </View>
        <View style={tw`px-4 flex-row items-center mt-5 gap-2 `}>
          <Checkbox
            value={checkBox}
            onValueChange={setCheckBox}
            size={20}
            color={PrimaryColor}
          />
          <TouchableOpacity
            onPress={() => {
              setCheckBox(!checkBox);
            }}
            style={tw`flex-row items-center`}
          >
            <Text style={tw`text-sm font-NunitoSansRegular text-gray-800`}>
              Agree to{" "}
            </Text>
            <Link
              href={"/terms_and_conditions"}
              style={tw`text-sm underline font-NunitoSansRegular text-primary`}
            >
              Terms & conditions{" "}
            </Link>
            <Text style={tw`text-sm font-NunitoSansRegular text-gray-800`}>
              and{" "}
            </Text>
            <Link
              href={"/privacy_policy"}
              style={tw`text-sm underline font-NunitoSansRegular text-primary`}
            >
              Privacy policy.
            </Link>
          </TouchableOpacity>
        </View>
        <View style={tw`px-4 mt-5 gap-5`}>
          <TButton title="Sign up" />
          <IwtButton
            svg={IconGoogleIcon}
            title="Continue with google"
            containerStyle={tw`bg-[#E8EAED] `}
            titleStyle={tw`text-black`}
          />
        </View>
        <View style={tw`flex-row gap-2 justify-center mt-7`}>
          <Text style={tw`text-sm font-NunitoSansRegular text-gray-900`}>
            Already have an account?
          </Text>
          <Text
            style={tw`text-sm font-NunitoSansRegular text-primary underline`}
          >
            Login
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default login;
