import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormFiled from "../../components/FormFiled";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appWrite";
const SignUp = () => {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!form.userName || !form.email || !form.password) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log(form.email, form.password, form.userName);
      const result = await createUser(form.email, form.password, form.userName);

      setUser(result);
      setIsLoggedIn(true);

      router.replace("home");
    } catch (error) {
      Alert.alert("Error", error?.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full min-h-[85vh] justify-center px-4 my-6">
          <Image
            source={images.logo}
            className="w-[115px] h-[35px]"
            resizeMode="contain"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Sign Up to Aora
          </Text>

          <FormFiled
            title="Username"
            value={form.userName}
            handleChangeText={(e) => setForm({ ...form, userName: e })}
            otherStyles="mt-10"
          />

          <FormFiled
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormFiled
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign Up"
            handlePress={handleSubmit}
            containerStyle="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap 2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?{" "}
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
