import { Text, View } from "react-native";
import { TextField, TextFieldProps } from "react-native-ui-lib"; // Import the type for TextField props

import React from "react";
import { SvgXml } from "react-native-svg";
import tw from "../tailwind";

interface InputTextProps
  extends Omit<TextFieldProps, "containerStyle" | "fieldStyle"> {
  onPress?: () => void;
  svgFirstIcon?: string;
  svgSecondIcon?: string;

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
  ...inputProps // Spread remaining props to pass to TextField
}: InputTextProps) => {
  const [focus, setFocus] = React.useState(false);

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
          tw`flex-row w-full border items-center gap-2 px-4  border-gray-300 rounded-full  h-14 `,
          focus && focusSTyle,
        ]}
      >
        {svgFirstIcon && <SvgXml xml={svgFirstIcon} />}
        <TextField
          ref={ref}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          floatingPlaceholderStyle={tw`-top-1 text-gray-400  font-NunitoSansSemiBold text-base bg-white w-16`}
          containerStyle={[tw`flex-1 `, containerStyle]}
          style={tw`text-black900 font-NunitoSansRegular text-base `}
          fieldStyle={[
            tw`${inputProps?.floatingPlaceholder ? "pb-4 " : "p-0 "}`,
            fieldStyle,
          ]}
          {...inputProps} // Spread props here
        />
        {svgSecondIcon && <SvgXml xml={svgSecondIcon} />}
      </View>
    </View>
  );
};

export default InputText;
