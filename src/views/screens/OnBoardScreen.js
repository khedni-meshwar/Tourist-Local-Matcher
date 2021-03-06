import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import COLORS from "../../consts/colors";
import { getAuth } from "firebase/auth";

const OnBoardScreen = ({ navigation }) => {
  // const isAuthenticated = async() => {
  //   // console.log(firebase.auth().currentUser);
  //   // return firebase.auth().currentUser;
  //   let loginStatus=await AsyncStorage.getItem('@userId');
  //   console.log("loginStatus");
  //   console.log("loginStatus");
  //   return (loginStatus!==null);
  // };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground
        style={{ flex: 1 }}
        source={require("../../assets/onboardImage4.jpg")}
      >
        <View style={style.details}>
          <Text
            style={{ color: COLORS.white, fontSize: 35, fontWeight: "bold" }}
          >
            Discover
          </Text>
          <Text
            style={{ color: COLORS.white, fontSize: 35, fontWeight: "bold" }}
          >
            Lebanon with us
          </Text>
          <Text style={{ color: COLORS.white, lineHeight: 25, marginTop: 15 }}>
            Meet new people, discover hidden gems, and get to know Lebanon on a
            deeper level.
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              // if (isAuthenticated) navigation.navigate("MainScreen");
              // else
              navigation.navigate("GettingStartedScreen");
            }}
          >
            <View style={style.btn}>
              <Text style={{ fontWeight: "bold" }}>Get Started</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const style = StyleSheet.create({
  details: {
    height: "50%",
    bottom: 0,
    position: "absolute",
    paddingHorizontal: 40,
  },
  btn: {
    height: 50,
    width: 120,
    backgroundColor: COLORS.white,
    marginTop: 20,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default OnBoardScreen;
