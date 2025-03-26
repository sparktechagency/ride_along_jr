import { Image, Text, View } from "react-native";

import { IconNotification } from "@/assets/icon/Icon";
import React from "react";
import { SvgXml } from "react-native-svg";
import tw from "@/lib/tailwind";

const notification = () => {
  const [isNotification, setIsNotification] = React.useState(false);
  return (
    <>
      <View style={tw`flex-row items-center justify-between px-4 `}>
        <Text
          style={tw`text-start text-xl font-bold my-5 font-NunitoSansRegular`}
        >
          Notifications
        </Text>
        {isNotification && (
          <Text
            style={tw`text-base font-semibold font-NunitoSansRegular text-[#5C7B7E]`}
          >
            Read All
          </Text>
        )}
      </View>

      {isNotification ? (
        <>
          {/* ------------------ dynamic data ------------ */}
          <View style={tw`px-4 `}>
            <View style={tw`border-b border-gray-300`}>
              <View style={tw`flex-row justify-between items-center py-4`}>
                <View style={tw`flex-row items-center gap-4`}>
                  <Image
                    source={require("../assets/images/notification-payment.png")}
                    style={tw`w-12 h-12 rounded-full`}
                  />
                  <View style={tw`w-64 text-start`}>
                    <Text style={tw`text-base font-bold text-[#172B4D]`}>
                      Payment successful
                    </Text>
                    <Text style={tw`text-sm font-normal text-[#3E4F6B]`}>
                      Your payment of $124 has been successfully paid.
                    </Text>
                  </View>
                </View>
                <Text
                  style={tw`text-sm font-normal text-[#333333] font-NunitoSansRegular`}
                >
                  12:00 PM
                </Text>
              </View>
            </View>
            <View style={tw`border-b border-gray-300`}>
              <View style={tw`flex-row justify-between items-center py-4`}>
                <View style={tw`flex-row items-center gap-4`}>
                  <Image
                    source={require("../assets/images/notification-payment.png")}
                    style={tw`w-12 h-12 rounded-full`}
                  />
                  <View style={tw`w-64 text-start`}>
                    <Text style={tw`text-base font-bold text-[#172B4D]`}>
                      Payment successful
                    </Text>
                    <Text style={tw`text-sm font-normal text-[#3E4F6B]`}>
                      Your payment of $124 has been successfully paid.
                    </Text>
                  </View>
                </View>
                <Text
                  style={tw`text-sm font-normal text-[#333333] font-NunitoSansRegular`}
                >
                  12:00 PM
                </Text>
              </View>
            </View>
            <View style={tw`border-b border-gray-300`}>
              <View style={tw`flex-row justify-between items-center py-4`}>
                <View style={tw`flex-row items-center gap-4`}>
                  <Image
                    source={require("../assets/images/notification-payment.png")}
                    style={tw`w-12 h-12 rounded-full`}
                  />
                  <View style={tw`w-64 text-start`}>
                    <Text style={tw`text-base font-bold text-[#172B4D]`}>
                      Payment successful
                    </Text>
                    <Text style={tw`text-sm font-normal text-[#3E4F6B]`}>
                      Your payment of $124 has been successfully paid.
                    </Text>
                  </View>
                </View>
                <Text
                  style={tw`text-sm font-normal text-[#333333] font-NunitoSansRegular`}
                >
                  12:00 PM
                </Text>
              </View>
            </View>
            <View style={tw`border-b border-gray-300`}>
              <View style={tw`flex-row justify-between items-center py-4`}>
                <View style={tw`flex-row items-center gap-4`}>
                  <Image
                    source={require("../assets/images/notification-payment.png")}
                    style={tw`w-12 h-12 rounded-full`}
                  />
                  <View style={tw`w-64 text-start`}>
                    <Text style={tw`text-base font-bold text-[#172B4D]`}>
                      Payment successful
                    </Text>
                    <Text style={tw`text-sm font-normal text-[#3E4F6B]`}>
                      Your payment of $124 has been successfully paid.
                    </Text>
                  </View>
                </View>
                <Text
                  style={tw`text-sm font-normal text-[#333333] font-NunitoSansRegular`}
                >
                  12:00 PM
                </Text>
              </View>
            </View>
            <View style={tw`border-b border-gray-300`}>
              <View style={tw`flex-row justify-between items-center py-4`}>
                <View style={tw`flex-row items-center gap-4`}>
                  <Image
                    source={require("../assets/images/notification-payment.png")}
                    style={tw`w-12 h-12 rounded-full`}
                  />
                  <View style={tw`w-64 text-start`}>
                    <Text style={tw`text-base font-bold text-[#172B4D]`}>
                      Payment successful
                    </Text>
                    <Text style={tw`text-sm font-normal text-[#3E4F6B]`}>
                      Your payment of $124 has been successfully paid.
                    </Text>
                  </View>
                </View>
                <Text
                  style={tw`text-sm font-normal text-[#333333] font-NunitoSansRegular`}
                >
                  12:00 PM
                </Text>
              </View>
            </View>
            <View style={tw`border-b border-gray-300`}>
              <View style={tw`flex-row justify-between items-center py-4`}>
                <View style={tw`flex-row items-center gap-4`}>
                  <Image
                    source={require("../assets/images/notification-payment.png")}
                    style={tw`w-12 h-12 rounded-full`}
                  />
                  <View style={tw`w-64 text-start`}>
                    <Text style={tw`text-base font-bold text-[#172B4D]`}>
                      Payment successful
                    </Text>
                    <Text style={tw`text-sm font-normal text-[#3E4F6B]`}>
                      Your payment of $124 has been successfully paid.
                    </Text>
                  </View>
                </View>
                <Text
                  style={tw`text-sm font-normal text-[#333333] font-NunitoSansRegular`}
                >
                  12:00 PM
                </Text>
              </View>
            </View>
          </View>
        </>
      ) : (
        <>
          <View style={tw`py-12 px-24 justify-center gap-4`}>
            <SvgXml xml={IconNotification} />
            <Text
              style={tw`text-3xl text-center font-bold font-NunitoSansRegular`}
            >
              Nothing to show
            </Text>
            <Text style={tw`text-base text-center font-semibold mb-3`}>
              We’ll notify you here for every updates.
            </Text>
          </View>
        </>
      )}
    </>
  );
};

export default notification;
