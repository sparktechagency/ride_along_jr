import {
  Animated,
  Easing,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import React from "react";
import { SvgXml } from "react-native-svg";
import tw from "../tailwind";

interface InputTextProps {
  onPress?: () => void;
  svgFirstIcon?: string;
  svgSecondIcon?: string;
  svgSecondOnPress?: () => void;

  textInputProps?: InputTextProps & { secureTextEntry?: boolean };

  containerStyle?: any;
  fieldStyle?: any;
  Component?: React.ReactNode;
  focusSTyle?: any;
  ref?: any;
  label?: string;
  labelStyle?: any;
  required?: boolean;
  errorText?: string;
  touched?: boolean;
  placeholderStyle?: any;
  placeholder?: string;
  textXValue?: number;
}
const InputText = ({
  onPress,
  svgFirstIcon,
  containerStyle,
  fieldStyle,
  focusSTyle,
  Component,
  ref,
  label,
  errorText,
  required,
  touched,
  labelStyle,
  svgSecondIcon,
  placeholder,
  textXValue = -28,
  textInputProps,
  svgSecondOnPress,
}: InputTextProps) => {
  const [focus, setFocus] = React.useState(false);
  const [text, setText] = React.useState("");

  const textY = React.useRef(new Animated.Value(0));

  const handleFocus = () => {
    Animated.timing(textY.current, {
      toValue: -28,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
    setFocus(true);
  };
  const handleBlur = () => {
    if (!text) {
      Animated.timing(textY.current, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start();
    }
    setFocus(false);
  };

  const textX = textY.current.interpolate({
    inputRange: [textXValue, 0],
    outputRange: [25, 41],
    extrapolate: "clamp",
  });
  const textScale = textY.current.interpolate({
    inputRange: [-28, 0],
    outputRange: [0.8, 1],
    extrapolate: "clamp",
  });
  const textBgOpacity = textY.current.interpolate({
    inputRange: [-28, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <View style={tw``}>
      {label && (
        <Text
          style={[
            tw`text-sm font-NunitoSansRegular px-4 py-2 text-gray-400`,
            labelStyle,
          ]}
        >
          {label} {required && <Text style={tw`text-red-500`}> *</Text>}
        </Text>
      )}

      <View
        style={[
          tw`flex-row w-full border items-center  px-4  border-gray-300 rounded-full  h-14 `,
          focus && focusSTyle,
        ]}
      >
        {svgFirstIcon && <SvgXml xml={svgFirstIcon} />}
        <Animated.Text
          numberOfLines={1}
          style={[
            tw`absolute  bg-white rounded-full text-base font-NunitoSansRegular  py-2 px-2 
              
              text-gray-400
             `,
            fieldStyle,

            {
              transform: [
                { translateY: textY.current },
                { translateX: textX },
                { scale: textScale },
              ],
            },
          ]}
        >
          {placeholder}
        </Animated.Text>
        <TextInput
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={(text) => {
            setText(text);
          }}
          style={tw`flex-1 px-2 text-base font-NunitoSansSemiBold`}
          {...textInputProps}
        />
        {svgSecondIcon && (
          <TouchableOpacity
            onPress={svgSecondOnPress}
            disabled={!svgSecondOnPress}
          >
            <SvgXml xml={svgSecondIcon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default InputText;
