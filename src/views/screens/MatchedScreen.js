import { View, Text, Image, Dimensions, ImageBackground, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import COLORS from "../../consts/colors";
import CustomButton from "../components/CustomButton";

const MatchedScreen = ({navigation, route}) => {
  const {currentSignedInUser, matchedUser} = route.params;
  return (
    <View style={{ flex: 1, opacity:0.89}}>
      <ImageBackground
        style={{ flex: 1 }}
        source={require("../../assets/match.png")}
      >
        <Pressable style={styles.button} onPress={()=>{navigation.navigate("MessageScreen", {matchedUser: matchedUser, user: currentSignedInUser})}}>
          <Text style={styles.btnText}>Say Hi!</Text>
        </Pressable>

        <Pressable style={[styles.button, {marginTop: "5%"}]} onPress={()=>{navigation.navigate("MainScreen")}}>
          <Text style={styles.btnText}>Keep Matching</Text>
        </Pressable>

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: COLORS.orange,
    marginTop: "100%",
    maxWidth: 250,
    maxHeight: 50,
    marginLeft: "18.5%"
  },
  btnText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  }
});

export default MatchedScreen