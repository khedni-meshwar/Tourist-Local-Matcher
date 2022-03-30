import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";

export default function ChatScreen({ navigation }) {
  const onPressHandler = () => {
    navigation.navigate("MatchingScreen");
  };

  return (
    <View style={styles.body}>
      <Text style={styles.text}>Chat Screen Placeholder</Text>
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
