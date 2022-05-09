import React from "react";
import { StyleSheet, View, Text, Pressable, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

export default function ProfileScreen({ navigation }) {
  const onPressHandler = () => {
    navigation.navigate("MatchingScreen");
  };

  const clearLoginData = async () => {
    try {
      await AsyncStorage.setItem("@userId", null);
    } catch (e) {
      // saving error
    }
  };

  const onSignOutPress = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
    clearLoginData();
    navigation.navigate("LoginScreen");
  };

  return (
    <View style={styles.body}>
      <Text style={styles.text}>Profile Screen Placeholder</Text>
      <Button title="Signout" onPress={onSignOutPress}/>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    margin: 10,
  },
});
