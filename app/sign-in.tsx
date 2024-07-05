import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Button, Text, TextInput } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { IRegisterForm } from "@/constants/Interfaces";
import useAuth from "@/state/auth";

const RegisterScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { signUp } = useAuth();
  const [form, setForm] = useState<IRegisterForm>({
    email: "",
    password: "",
    repeatPassword: "",
    username: "",
  });

  const handleProfileInfoChange = (
    text: string,
    field: keyof IRegisterForm
  ) => {
    setForm({ ...form, [field]: text });
  };

  const handleUsername = (text: string) =>
    handleProfileInfoChange(text, "username");
  const handleEmail = (text: string) => handleProfileInfoChange(text, "email");
  const handlePassword = (text: string) =>
    handleProfileInfoChange(text, "password");
  const handleRepeatPassword = (text: string) =>
    handleProfileInfoChange(text, "repeatPassword");

  const handleRegisterButtonPress = async () => {
    if (form.password === form.repeatPassword) {
      await signUp({
        email: form.email,
        password: form.password,
        username: form.username,
      });
    } else {
      Alert.alert("Error", "Passwords are incorrect");
    }
  };
  const handleLogInButtonPress = () => router.push("log-in");
  return (
    <View style={{ ...styles.container, marginTop: top, marginBottom: bottom }}>
      <View style={styles.wrapper}>
        <View style={{ alignItems: "center" }}>
          <Text variant="displayMedium">REGISTER</Text>
        </View>
        <TextInput
          label={"Username"}
          mode="outlined"
          value={form.username}
          onChangeText={handleUsername}
          autoCapitalize={"none"}
        />
        <TextInput
          label={"E-mail"}
          mode="outlined"
          value={form.email}
          onChangeText={handleEmail}
          autoCapitalize={"none"}
        />
        <TextInput
          label={"Password"}
          mode="outlined"
          secureTextEntry
          value={form.password}
          onChangeText={handlePassword}
          autoCapitalize={"none"}
        />
        <TextInput
          label={"Repeat passowrd"}
          mode="outlined"
          secureTextEntry
          value={form.repeatPassword}
          onChangeText={handleRepeatPassword}
          autoCapitalize={"none"}
        />
        <Button mode="contained" onPress={handleRegisterButtonPress}>
          Register
        </Button>
        <Text style={{ textAlign: "center" }}>
          If you already have an account, please{" "}
          <Text onPress={handleLogInButtonPress}>LOG IN</Text>
        </Text>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 16,
  },
  wrapper: {
    flex: 1,
    gap: 16,
    justifyContent: "center",
  },
});
