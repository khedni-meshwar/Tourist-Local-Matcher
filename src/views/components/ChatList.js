import {
  collection,
  onSnapshot,
  query,
  where,
  getFirestore,
} from "@firebase/firestore";
import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import ChatRow from "./ChatRow";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
const db = getFirestore();

const ChatList = ({ matches, navigation }) => {
  // const { auth } = await firebase.auth();
  // let userUid = currentUser.uid; 
  console.log(matches)
  return matches.length > 0 ? (
    <FlatList
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ChatRow matchDetails={item} navigation={navigation}/>}
    />
  ) : (
    <View>
      <Text> No matches at the moment :(</Text>
    </View>
  );
};

export default ChatList;
