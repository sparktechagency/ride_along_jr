import { View, Text, Keyboard, TouchableOpacity, Modal, Animated } from 'react-native'
import React, { useEffect } from 'react'
import tw from '@/lib/tailwind';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import BackButton from '@/lib/backHeader/BackButton';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import InputText from '@/lib/inputs/InputText';
import { IconCloseEye, IconEmail, IconLock, IconOpenEye, IconSmallRightTick } from '@/assets/icon/Icon';
import TButton from '@/lib/buttons/TButton';
import Icon from "react-native-vector-icons/Feather";

const create_new_pass = () => {
    const router = useRouter();
    const [IsShow, setIsShow] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);

    const fadeAnim = React.useRef(new Animated.Value(0)).current; // Initial opacity set to 0

    const handleKeyboardDismiss = () => {
        Keyboard.dismiss();
    };

    useEffect(() => {
        if (modalVisible) {
            const timer = setTimeout(() => {
                setModalVisible(false);
                // Start fade-in animation
                // Animated.timing(fadeAnim, {
                //     toValue: 1,
                //     duration: 300, // 300ms fade-in
                //     useNativeDriver: true,
                // }).start();

                closeModal()

            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [modalVisible]);

    const closeModal = () => {
        // Start fade-out animation
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500, // 300ms fade-out
          useNativeDriver: true,
        }).start(() => setModalVisible(false)); // Close modal after fade-out
      };

    return (
        <View style={tw`flex-1 bg-base gap-2`}>
            <TouchableWithoutFeedback onPress={handleKeyboardDismiss || setModalVisible(false)}>
                <ScrollView
                    keyboardShouldPersistTaps="always"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={tw`pb-10`}
                >
                    <BackButton onPress={() => router.back()} />
                    <View style={tw`px-4 gap-5 pt-2`}>
                        <Text
                            style={tw`text-4xl text-deepBlue300 leading-tight font-NunitoSansExtraBold`}
                        >
                          Enter a new password for your account
                        </Text>

                        <Text style={tw`text-base text-[#3E4F6B] font-NunitoSansMedium`}>
                            {`\u2022`}  Use at least 6 characters
                        </Text>
                        <Text style={tw`text-base text-[#3E4F6B] font-NunitoSansMedium`}>
                            {`\u2022`}  Use a mix of letters, numbers, and special character (e.g. : #$!%)
                        </Text>
                    </View>
                    <Formik
                        initialValues={{ email: "", password: "" }}
                        validate={(values) => {
                            const errors = {} as any;
                            if (!values.email) {
                                errors.email = "Required";
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = "Invalid email address. Please try again. ";
                            }
                            return errors;
                        }}
                        onSubmit={(values) => {
                            console.log(values);
                        }}
                    >
                        {({
                            handleChange,
                            handleBlur,
                            values,
                            errors,
                            touched,
                        }) => (
                            <>
                                <View style={tw`px-4 gap-5 mt-8`}>
                                    <View style={tw``}>
                                        <InputText
                                            value={values.email}
                                            onBlur={handleBlur("email")}
                                            onChangeText={handleChange("email")}
                                            errorText={errors.email}
                                            touched={touched.email}
                                            textXValue={-36}
                                            placeholder="Email"
                                            svgFirstIcon={IconEmail}
                                            svgSecondIcon={
                                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                                    values.email
                                                )
                                                    ? ""
                                                    : IconSmallRightTick
                                            }
                                            focusSTyle={tw`border border-primary`}
                                        />
                                    </View>
                                    <View style={tw``}>
                                        <InputText
                                            placeholder="Password"
                                            textInputProps={{
                                                secureTextEntry: !IsShow,
                                            }}
                                            touched={touched.password}
                                            onBlur={handleBlur("password")}
                                            onChangeText={handleChange("password")}
                                            value={values.password}
                                            svgFirstIcon={IconLock}
                                            errorText={errors.password}
                                            svgSecondIcon={IsShow ? IconOpenEye : IconCloseEye}
                                            focusSTyle={tw`border border-primary`}
                                            svgSecondOnPress={() => {
                                                setIsShow(!IsShow);
                                            }}
                                        />
                                    </View>
                                </View>
                                <View style={tw`self-end mt-3 px-4`}>
                                </View>
                                <TouchableOpacity style={tw`px-4 mt-5 gap-5`}>
                                    <TButton
                                        title="Save Changes"
                                        onPress={() => setModalVisible(true)}
                                    />
                                </TouchableOpacity>
                            </>
                        )}
                    </Formik>
                </ScrollView>
            </TouchableWithoutFeedback>



            {/* =========== Modal Component ============  */}


            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={tw`flex-1 bg-black bg-opacity-50 justify-center items-center`}>
                    <View style={tw`w-7/8 bg-white p-5 rounded-2xl items-center shadow-lg`}>
                        {/* Check Icon */}
                        <Icon name="check-circle" size={60} color="green" />

                        {/* Success Message */}
                        <Text style={tw`text-2xl font-bold mt-3`}>You're All Set!</Text>
                        <Text style={tw`text-base text-gray-500 text-center mt-2`}>
                            Your password has been changed successfully!
                        </Text>

                        {/* Close Button */}
                        {/* <TouchableOpacity onPress={() => setModalVisible(false)} style={tw`bg-blue-500 px-5 py-2 rounded-lg mt-5`}>
                            <Text style={tw`text-white text-lg font-bold`}>OK</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
            </Modal>

        </View>
    )
}

export default create_new_pass