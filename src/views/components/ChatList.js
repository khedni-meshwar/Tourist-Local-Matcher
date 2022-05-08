import {
  collection,
  onSnapshot,
  query,
  where,
  getFirestore,
} from "@firebase/firestore";
import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { style as tw } from "twrnc";
import ChatRow from "./ChatRow";

const db = getFirestore();

const ChatList = () => {
  const [matches, setMatches] = useState([]);
  const { user } = "I3wA9iAnI2hOc3GSifYw";

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "users"),
          where("matches", "array-contains", "I3wA9iAnI2hOc3GSifYw")
        ),
        (snapshot) =>
          setMatches(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data })))
      ),
    [user]
  );

  console.log(matches);

  return matches.length < 0 ? (
    <FlatList
      style={tw("h-full")}
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ChatRow matchDetails={item} />}
    />
  ) : (
    <View style={tw("p-5")}>
      <Text style={tw("text-center text-lg")}> No matches at the moment :(</Text>
    </View>
  );
};

export default ChatList;
