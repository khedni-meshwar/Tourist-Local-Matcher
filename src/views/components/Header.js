import React from "react";
import{View, Text} from "react-native";
import tw from "tailwind-rn";
import {Foundation} from "@expo/vector-icons";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/core";
const Header=({title, callEnabled })=>{
  return(
    <View style={tw("p-2 flew-row items-center justify-between")}>
     |<Text>Header here</Text>
    </View>
  );
};
export default Header;