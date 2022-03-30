import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon, FontAwesome } from "@expo/vector-icons";

export default function TopBar() {
  const [peoplePressed, setPeoplePressed] = useState(true);
  const [msgPressed, setMsgPressed] = useState(false);
  const [userPressed, setUserPressed] = useState(false);

  const peopleHandler = () => {
    setPeoplePressed(true);
    setMsgPressed(false);
    setUserPressed(false);
  };

  const msgHandler = () => {
    setUserPressed(false);
    setMsgPressed(true);
    setPeoplePressed(false);
  };

  const userHandler = () => {
    setUserPressed(true);
    setMsgPressed(false);
    setPeoplePressed(false);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={peopleHandler}>
        <FontAwesome
          name="users"
          size={27}
          color={peoplePressed ? "#04555c" : "#5c5c5c"}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={msgHandler}>
        <FontAwesome
          name="comments"
          size={27}
          color={msgPressed ? "#04555c" : "#5c5c5c"}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={userHandler}>
        <FontAwesome
          name="user"
          size={27}
          color={userPressed ? "#04555c" : "#5c5c5c"}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.12,
    shadowRadius: 5.46,
    elevation: 9,
  },
});
