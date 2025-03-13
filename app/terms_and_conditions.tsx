import { LogBox, ScrollView, View, useWindowDimensions } from "react-native";

import BackButton from "@/lib/backHeader/BackButton";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";
import React from "react";
import RenderHTML from "react-native-render-html";

LogBox.ignoreAllLogs(); //

const terms_and_conditions = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const source = {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Terms and Conditions</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            padding: 20px;
            margin: 0;
            background-color: #f4f4f4;
        }
        h1, h2 {
            color: #333;
        }
        .content {
            max-width: 800px;
            margin: 0 auto;
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body>
    <div class="content">
        <h1>Terms and Conditions</h1>

        <p>Effective Date: [Insert Date]</p>

        <h2>1. Introduction</h2>
        <p>Welcome to [Your Company Name]! By accessing or using our website and services, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.</p>

        <h2>2. Services</h2>
        <p>[Your Company Name] provides [brief description of the services offered]. These terms apply to all users of our platform, including those who browse, use, or contribute content or services.</p>

        <h2>3. User Responsibilities</h2>
        <p>As a user of [Your Company Name], you agree to use our services in accordance with applicable laws and regulations. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>

        <h2>4. Prohibited Activities</h2>
        <p>You are prohibited from engaging in the following activities:</p>
        <ul>
            <li>Engaging in any fraudulent, illegal, or unethical conduct.</li>
            <li>Distributing harmful content such as malware or viruses.</li>
            <li>Interfering with the normal operation of the website or services.</li>
        </ul>

        <h2>5. Intellectual Property</h2>
        <p>All content, including text, images, logos, and trademarks, is the property of [Your Company Name] or its licensors and is protected by copyright and other intellectual property laws.</p>

        <h2>6. Termination</h2>
        <p>We may suspend or terminate your access to our services if you violate these terms, engage in prohibited activities, or for any other reason at our discretion. Upon termination, you must cease using our services and any licensed content.</p>

        <h2>7. Privacy Policy</h2>
        <p>Your privacy is important to us. Please refer to our Privacy Policy for details on how we collect, use, and protect your personal information.</p>

        <h2>8. Disclaimers</h2>
        <p>Our services are provided "as is" without any warranties of any kind, express or implied. We do not guarantee the availability, accuracy, or security of our platform and services.</p>

        <h2>9. Limitation of Liability</h2>
        <p>In no event shall [Your Company Name] be liable for any indirect, incidental, or consequential damages arising from the use of our services, even if we have been advised of the possibility of such damages.</p>

        <h2>10. Changes to Terms</h2>
        <p>We may update these terms from time to time. Any changes will be posted on this page, and the "Effective Date" will be updated accordingly. By continuing to use our services, you accept any changes to the terms.</p>

        <h2>11. Governing Law</h2>
        <p>These terms are governed by the laws of [Your Country], without regard to its conflict of law principles. Any disputes arising from these terms will be resolved in the courts of [Your Country].</p>

        <h2>12. Contact Information</h2>
        <p>If you have any questions or concerns about these Terms and Conditions, please contact us at [Your Contact Email].</p>
    </div>
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

export default terms_and_conditions;
