import {
  IconBackArray,
  IconCar,
  IconDot,
  IconMinus,
  IconNormalUser,
  IconPlus,
  IconRightArrow,
  IconVisaCard,
} from "@/assets/icon/Icon";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { ImgCar } from "@/assets/images";
import React from "react";
import { SvgXml } from "react-native-svg";
import TButton from "@/lib/buttons/TButton";
import tw from "@/lib/tailwind";

interface EstimatedDetailsProps {
  setSteps: (step: number) => void;
}

const EstimatedDetails = ({ setSteps }: EstimatedDetailsProps) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => setSteps(0)}
        style={tw`flex-row items-center gap-2 px-4 pb-4`}
      >
        <SvgXml xml={IconBackArray} />
        <Text style={tw`text-base font-NunitoSansBold`}>Estimated Details</Text>
      </TouchableOpacity>
      <View>
        <View>
          <Image source={ImgCar} style={tw` self-center`} />
        </View>
        <View style={tw`px-4 flex-row justify-between items-end`}>
          <View>
            <SvgXml xml={IconCar} />
            <View style={tw`flex-row items-center `}>
              <Text
                style={tw`text-base font-NunitoSansRegular text-deepBlue100`}
              >
                In 15 min
              </Text>
              <SvgXml xml={IconDot} />
              <View style={tw`flex-row items-center gap-2`}>
                <SvgXml xml={IconNormalUser} />
                <Text
                  style={tw`text-base font-NunitoSansRegular text-deepBlue100`}
                >
                  2 kids
                </Text>
              </View>
            </View>
          </View>
          <View style={tw`flex-row items-center gap-2`}>
            <Text style={tw`text-2xl font-NunitoSansBold text-black`}>
              $240.00
            </Text>
          </View>
        </View>
      </View>
      <View
        style={tw`flex-row justify-between items-center px-4 py-5 border-b border-b-gray-200`}
      >
        <Text style={tw`text-base font-NunitoSansRegular text-deepBlue100 `}>
          Kids
        </Text>
        <View style={tw`flex-row items-center gap-6`}>
          <TouchableOpacity>
            <SvgXml xml={IconMinus} />
          </TouchableOpacity>
          <Text style={tw`text-base font-NunitoSansBold`}>2</Text>
          <TouchableOpacity>
            <SvgXml xml={IconPlus} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={tw`flex-row items-center justify-between px-4 py-5`}
      >
        <View>
          <Text style={tw`text-base font-NunitoSansBold text-black  `}>
            Payment method
          </Text>
        </View>
        <View style={tw`flex-row items-center`}>
          <SvgXml xml={IconVisaCard} />
          <SvgXml xml={IconRightArrow} />
        </View>
      </TouchableOpacity>
      <View style={tw`px-4`}>
        <TButton title="Request Now" />
      </View>
    </View>
  );
};

export default EstimatedDetails;
