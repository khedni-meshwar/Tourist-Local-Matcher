import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";

const ChatRow = ({ matchDetails, navigation }) => {

  return (
    <TouchableOpacity
      key={matchDetails.id}
      onPress={() => navigation.navigate("MessageScreen", {matchedUser: matchDetails})}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <View style={{ flex: 1 }}>
          <Image
            style={{
              width: 70,
              height: undefined,
              aspectRatio: 1,
              borderRadius: 150,
            }}
            source={{
              uri: matchDetails.profilePhoto,
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
            <Text>{matchDetails.firstName + " " + matchDetails.lastName}</Text>
            <Text>{"time"}</Text>
          </View>
          <View>
            <Text>{"lastMessage"}</Text>
          </View>
        </View>
      </View>
      <View style={{ width: "90%", height: 1, backgroundColor: "#909090" }} />
    </TouchableOpacity>
  );
};

export default ChatRow;
