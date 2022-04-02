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
  KeyboardAvoidingView,
} from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import COLORS from "../../consts/colors";
import auth from "../../../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Toast from "react-native-root-toast";


const { width } = Dimensions.get("screen");

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { height } = useWindowDimensions();

  const onLoginPressed = () => {
    navigation.navigate("LoginScreen");
  };

  const onForgotPasswordPressed = () => {};
  const auth = getAuth();
  const onSignUpPressed = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Signed up with: ", user.email);
        let toast = Toast.show("Successfully signed up.", {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
        navigation.navigate("LoginScreen");
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
          source={require("../../assets/signupimage.png")}
        ></ImageBackground>

        <View style={styles.bottomView}>
          <View style={styles.root}>
            <Text style={styles.headerTitle}>Sign up</Text>
            <CustomButton
              text="Already have an account? Sign in"
              onPress={onLoginPressed}
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
            <CustomInput
              placeholder="Confirm Password"
              value={confirmPassword}
              setValue={setConfirmPassword}
              secureTextEntry
            />
            <CustomButton text="Sign Up" onPress={onSignUpPressed} />
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
