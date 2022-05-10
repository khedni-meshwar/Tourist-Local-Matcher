import {
  collection,
  onSnapshot,
  query,
  where,
  getFirestore,
} from "@firebase/firestore";
import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import ChatRow from "./ChatRow";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Icon from 'react-native-vector-icons/AntDesign';
import COLORS from "../../consts/colors";

const auth = getAuth();
const db = getFirestore();

const ChatList = ({ matches, navigation }) => {
  console.log(matches)
  return matches.length > 0 ? (
    <View>
    <View style={styles.header}>
          <Text style={styles.headerText}>Messages</Text>
    </View>
    <FlatList
      style={{height: "100%", width: "100%"}}
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ChatRow matchDetails={item} navigation={navigation}/>}
    />
    </View>
  ) : (
    <View>
    <View style={styles.header}>
          <Text style={styles.headerText}>Messages</Text>
    </View>
    <View style={styles.noMatches}>
      <Icon style={{marginBottom: "10%"}} name="message1" size={200} color="#04555c" />
      <Text style={styles.noMatchesText}> No matches at the moment :(</Text>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: "flex",
    marginLeft: "5%",
    marginTop: "5%",
    marginBottom: "5%"
  },
  headerText: {
    fontSize: 40,
    fontWeight: "bold",
    color: COLORS.primary,
    paddingBottom:10,
    paddingTop:20
  },
  noMatches: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    marginTop: "60%"
  },
  noMatchesText: {
    fontSize: 20
  },
  chat: {
    marginTop: "100%",
    marginBottom: "100%"
  }
});

export default ChatList;
