import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  useWindowDimensions,
  Text,
  ImageBackground,
  Dimensions,
  ScrollView,
} from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import SocialSignInButtons from "../components/SocialSignInButtons";
import COLORS from "../../consts/colors";

const { width } = Dimensions.get("screen");

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { height } = useWindowDimensions();

  const onSignInPressed = () => {
    navigation.navigate("MainScreen");
  };

  const onForgotPasswordPressed = () => {};

  const onSignUpPress = () => {};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <ImageBackground
          style={{ height: Dimensions.get("window").height / 2.5 }}
          source={require("../../assets/loginimage.png")}
        ></ImageBackground>

        <View style={styles.bottomView}>
          <View style={styles.root}>
            <Text style={styles.headerTitle}>Log in</Text>
            <CustomButton
              text="Don't have an account? Create one"
              onPress={onSignUpPress}
              type="TERTIARY"
            />

            <CustomInput
              placeholder="Username"
              value={username}
              setValue={setUsername}
            />
            <CustomInput
              placeholder="Password"
              value={password}
              setValue={setPassword}
              secureTextEntry
            />
            <CustomButton text="Sign In" onPress={onSignInPressed} />
            <CustomButton
              text="Forgot password?"
              onPress={onForgotPasswordPressed}
              type="TERTIARY"
              style={{ alignItems: "right" }}
            />
            <SocialSignInButtons />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.primary,
    alignItems: "center",
    textAlign: "center",
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    margin: 10,
    color: "#04555c",
  },
  headerTitle: {
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
  },
  bottomView: {
    top: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    flex: 0.3,
  },
});
