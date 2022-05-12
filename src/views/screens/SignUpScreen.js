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
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const { height } = useWindowDimensions();

  const onLoginPressed = () => {
    navigation.navigate("LoginScreen");
  };

  const onForgotPasswordPressed = () => {};
  const auth = getAuth();
  const onSignUpPressed = () => {
    var emailValid = false;
    if (email.length == 0) {
      setEmailError("Email is required");
    } else if (email.length < 6) {
      setEmailError("Email should be minimum 6 characters");
    } else if (email.indexOf(" ") >= 0) {
      setEmailError("Email cannot contain spaces");
    } else {
      setEmailError("");
      emailValid = true;
    }

    var passwordValid = false;
    if (password.length == 0) {
      setPasswordError("Password is required");
    } else if (password.length < 6) {
      setPasswordError("Password should be minimum 6 characters");
    } else if (password.indexOf(" ") >= 0) {
      setPasswordError("Password cannot contain spaces");
    } else {
      setPasswordError("");
      passwordValid = true;
    }
    var confirmPasswordValid = false;
    if (confirmPassword !== password) {
      setConfirmPasswordError("Password is required");
    } else {
      setConfirmPasswordError("");
      confirmPasswordValid = true;
    }
    if (emailValid && passwordValid) {
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
}

  

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <ImageBackground
          style={{ height: Dimensions.get("window").height / 2.5 }}
          source={require("../../assets/signupimage.png")}
        ></ImageBackground>

        <View style={styles.bottomView}>
          <View style={styles.root}>
            <Text style={styles.headerTitle}>Sign up</Text>
            <CustomButton text="Already have an account? Sign in" onPress={onLoginPressed} type="TERTIARY" />

            <CustomInput placeholder="Email" value={email} setValue={setEmail} />
            {emailError.length > 0 && (
              <Text style={styles.error}>{emailError}</Text>
            )}
            <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry />
            {passwordError.length > 0 && (
              <Text style={styles.error}>{passwordError}</Text>)}
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
    </View>
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
  error: {
    textAlign: "right",
    color: "#DD4D44",
  },
});
