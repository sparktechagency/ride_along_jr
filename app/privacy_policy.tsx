import { LogBox, ScrollView, View, useWindowDimensions } from "react-native";

import BackButton from "@/lib/backHeader/BackButton";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";
import React from "react";
import RenderHTML from "react-native-render-html";

LogBox.ignoreAllLogs(); //

const privacy_policy = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const source = {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Privacy Policy</title>
</head>
<body>
    <header>
        <h1>Privacy Policy</h1>
        <p>Last updated: March 12, 2025</p>
    </header>

    <section>
        <h2>Introduction</h2>
        <p>Welcome to [Your Company Name] ("we", "us", "our"). We are committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website [your website URL] or use our services. Please read this policy carefully to understand our views and practices regarding your personal data and how we will treat it.</p>
    </section>

    <section>
        <h2>Information We Collect</h2>
        <p>We may collect and process the following data:</p>
        <ul>
            <li><strong>Personal Identification Information:</strong> Name, email address, phone number, and other similar contact data.</li>
            <li><strong>Technical Data:</strong> Internet Protocol (IP) address, browser type and version, time zone setting, browser plug-in types, and operating system and platform.</li>
            <li><strong>Usage Data:</strong> Information about how you use our website, products, and services.</li>
            <li><strong>Marketing Data:</strong> Your preferences in receiving marketing from us and your communication preferences.</li>
        </ul>
    </section>

    <section>
        <h2>How We Use Your Information</h2>
        <p>We use the information we collect in the following ways:</p>
        <ul>
            <li>To provide, operate, and maintain our services.</li>
            <li>To improve, personalize, and expand our services.</li>
            <li>To communicate with you, including sending updates, newsletters, and promotional materials.</li>
            <li>To monitor and analyze usage to improve the user experience.</li>
            <li>To comply with legal obligations and resolve disputes.</li>
        </ul>
    </section>

    <section>
        <h2>How We Protect Your Information</h2>
        <p>We implement a variety of security measures to maintain the safety of your personal information. We use encryption to protect sensitive data during transmission, and we store your personal information on secure servers. However, please note that no method of data transmission or storage is 100% secure.</p>
    </section>

    <section>
        <h2>Third-Party Services</h2>
        <p>We may use third-party services, such as payment processors, analytics providers, and hosting services, that may collect and use your data in accordance with their privacy policies. We are not responsible for the privacy practices of these third parties, so please review their privacy policies carefully.</p>
    </section>

    <section>
        <h2>Your Rights</h2>
        <p>Depending on your location, you may have the right to access, correct, or delete your personal information. You can also object to or restrict the processing of your personal data in certain circumstances. To exercise any of these rights, please contact us using the information provided at the end of this policy.</p>
    </section>

    <section>
        <h2>Cookies</h2>
        <p>We use cookies to enhance your experience on our website. Cookies are small text files stored on your device that help us remember your preferences, track usage patterns, and provide a more personalized service. You can control cookie settings through your browser settings. Please note that disabling cookies may affect the functionality of our website.</p>
    </section>

    <section>
        <h2>Changes to This Privacy Policy</h2>
        <p>We reserve the right to update or change this Privacy Policy at any time. Any changes will be reflected on this page, and we will notify you if significant changes are made. We encourage you to review this policy periodically to stay informed about how we protect your information.</p>
    </section>

    <section>
        <h2>Contact Us</h2>
        <p>If you have any questions about this Privacy Policy or the way we handle your data, please contact us at:</p>
        <p>Email: [Your Email Address]</p>
        <p>Phone: [Your Phone Number]</p>
        <p>Address: [Your Physical Address]</p>
    </section>
</body>
</html>

`,
  };

  return (
    <View style={tw`flex-1 bg-base`}>
      <BackButton onPress={() => router.back()} />
      <ScrollView style={tw`px-4`}>
        <RenderHTML contentWidth={width} source={source} />
      </ScrollView>
    </View>
  );
};

export default privacy_policy;
