import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import COLORS from "../../consts/colors";

const ChatRow = ({ matchDetails, navigation, user }) => {

  return (
    <TouchableOpacity
      key={matchDetails.id}
      onPress={() => navigation.navigate("MessageScreen", {matchedUser: matchDetails, user:user})}>
      <View
        style={styles.container}
      >
        <View style={{ flex: 1, marginRight: "5%" }}>
          <Image
            style={{
              width: 70,
              height: undefined,
              aspectRatio: 1,
              borderRadius: 150,
              
            }}
            source={{
              uri: matchDetails.image
            }}
          />
        </View>
        <View style={{ flex: 4 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.initials}>{matchDetails.firstName + " " + matchDetails.lastName}</Text>
            <Text style={styles.time}>{"time"}</Text>
          </View>
          <View>
            <Text style={styles.lastMsg}>{"lastMessage"}</Text>
          </View>
        </View>
      </View>
      <View style={{ width: "90%", height: 1, backgroundColor: COLORS.grey }} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: "1.5%",
    marginTop: "1.5%"
  },
  initials: {
    fontWeight: "bold", 
    fontSize: 20,
    color: COLORS.dark
  },
  time: {
    color: COLORS.secondaryAlternate
  },
  lastMsg: {
    color: COLORS.secondaryAlternate
  }
});


export default ChatRow;
