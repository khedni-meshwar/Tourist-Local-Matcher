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
import auth from "../../../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Toast from "react-native-root-toast";

const { width } = Dimensions.get("screen");

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { height } = useWindowDimensions();

  const onSignUpPressed = () => {
    navigation.navigate("SignUpScreen");
  };

  const onForgotPasswordPressed = () => {};
  
  const auth = getAuth();
  const onLoginPressed = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with: ", user.email);
        let toast = Toast.show("Successfully logged in.", {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
        // navigation.navigate("MainScreen");
        navigation.navigate("CreateProfileScreen");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

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
              onPress={onSignUpPressed}
              type="TERTIARY"
            />

            <CustomInput
              placeholder="Email"
              value={email}
              setValue={setEmail}
            />
            <CustomInput
              placeholder="Password"
              value={password}
              setValue={setPassword}
              secureTextEntry
            />
            <CustomButton text="Sign In" onPress={onLoginPressed} />
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
