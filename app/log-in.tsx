import { ActivityIndicator, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { Button, Text, TextInput } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import useAuth from "@/state/auth";

const LoginScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { signIn } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmail = (text: string) => setEmail(text);
  const handlePassword = (text: string) => setPassword(text);
  const handleLoginButtonPress = async () => {
    if (email && password) {
      const response = await signIn(email, password);
      if (response) {
        console.log(response);
      }
    }
  };
  const handleSingUpButtonPress = () => router.push("sign-in");

  return (
    <View style={{ ...styles.container, marginTop: top, marginBottom: bottom }}>
      <View style={styles.wrapper}>
        <View style={{ alignItems: "center" }}>
          <Text variant="displayMedium">LOGIN</Text>
        </View>
        <TextInput
          label={"E-mail"}
          mode="outlined"
          onChangeText={handleEmail}
        />
        <TextInput
          label={"Password"}
          mode="outlined"
          secureTextEntry
          onChangeText={handlePassword}
        />
        <Button mode="contained" onPress={handleLoginButtonPress}>
          Login
        </Button>
        <Text style={{ textAlign: "center" }}>
          If you don't have an account, please{" "}
          <Text variant="titleMedium" onPress={handleSingUpButtonPress}>
            SIGN UP
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;

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
