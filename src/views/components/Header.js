import React from "react";
import { View, Text } from "react-native";
import { style as tw } from "twrnc";
import { Foundation } from "@expo/vector-icons";
import { Iconicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { TouchableOpacity } from "react-native-gesture-handler";
const Header = ({ title }) => {
  return (
    <View style={tw("p-2 flex-row items-center justify-between")}>
      <View style={tw("flex flex-row items-center")}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw("p-2")}
        >
          {/* <Iconicons name="chevron-back-outline" size={34} color="04555C" /> */}
        </TouchableOpacity>
        <Text style={tw("p-1")}></Text>
        <Text style={tw("p-1")}>title</Text>
      </View>
    </View>
  );
};
export default Header;
