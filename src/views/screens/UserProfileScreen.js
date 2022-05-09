import { View, Text, StyleSheet } from "react-native";
import React from "react";

const UserProfileScreen = ({ route, navigation }) => {
  const { matchedUser } = route.params;
  return (
    <View>
      <Text style={{fontSize:20}}>{matchedUser.firstName + " " + matchedUser.lastName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default UserProfileScreen;
