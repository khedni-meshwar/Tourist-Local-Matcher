import React from "react";
import { SafeAreaView, Text } from "react-native";
import Header from "../components/Header";

const ChatScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Header title="Chat" />
    </SafeAreaView>
  );
};
export default ChatScreen;
