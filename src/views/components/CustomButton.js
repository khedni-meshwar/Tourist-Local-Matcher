import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import COLORS from "../../consts/colors";

const CustomButton = ({ onPress, text, type = "PRIMARY", bgColor, fgColor }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, styles[`container_${type}`], bgColor ? { backgroundColor: bgColor } : {}]}
    >
      <Text style={[styles.text, styles[`text_${type}`], fgColor ? { color: fgColor } : {}]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
    bottom: -25
  },

  container_PRIMARY: {
    backgroundColor: COLORS.primary,
  },

  container_SECONDARY: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },

  container_TERTIARY: {},

  text: {
    fontWeight: "bold",
    color: "white",
  },

  text_SECONDARY: {
    color: COLORS.primary,
  },

  text_TERTIARY: {
    color: "gray",
  },
});

export default CustomButton;
