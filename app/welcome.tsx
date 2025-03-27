import { IconCardBlack, IconUserWhite } from "@/assets/icon/Icon";
import { Image, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ImgWeather } from "@/assets/images";
import IwtButton from "@/lib/buttons/IwtButton";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";
import { useStripe } from "@stripe/stripe-react-native";

const welcome = () => {
  const route = useRouter();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`/payment-sheet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { paymentIntent, ephemeralKey, customer } = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: "Jane Doe",
      },
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    // see below
    const res = await presentPaymentSheet();

    console.log(res);
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);
  return (
    <View style={tw`flex-1 bg-base`}>
      <View style={tw`flex-1 `}>
        <Image source={ImgWeather} resizeMode="contain" />

        <View style={tw`justify-center items-center gap-3 my-8`}>
          <Text style={tw`text-deepBlue text-4xl font-NunitoSansExtraBold`}>
            Book. Drive. Earn
          </Text>
          <Text
            style={tw`text-base text-black font-NunitoSansRegular text-center`}
          >
            Book a ride for your child's destination and start earning as a
            driver on this incredible platform.
          </Text>
        </View>
      </View>

      <View style={tw`px-4 pb-12`}>
        <IwtButton
          title="Need to book a ride for my kid"
          svg={IconUserWhite}
          onPress={async () => {
            await AsyncStorage.setItem("role", "passenger");
            // route.push("/auth/login");
            // route.push("/history");
            // route.push("/notification");
            // route.push("/payment");
            route.push("/namePage");
            // openPaymentSheet();
          }}
        />
        <IwtButton
          title="I'd like to drive"
          svg={IconCardBlack}
          containerStyle={tw`mt-4 bg-deepBlue50 `}
          titleStyle={tw`text-black text-base `}
          onPress={async () => {
            await AsyncStorage.setItem("role", "driver");
            route.push("/auth/login");
          }}
        />
      </View>
      {/* <SearchModal /> */}
    </View>
  );
};

export default welcome;
