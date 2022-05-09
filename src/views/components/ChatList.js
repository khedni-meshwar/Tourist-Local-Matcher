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

const ChatList = ({ userId }) => {
  // const { auth } = await firebase.auth();
  // let userUid = currentUser.uid;

  const [matches, setMatches] = useState([]);
  const { user } = userId;
  console.log(userId);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "users"),
          where("matches", "array-contains", userId.replace(/\s/g, ""))
        ),
        (snapshot) =>
          setMatches(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [user]
  );

  return matches.length > 0 ? (
    <FlatList
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ChatRow matchDetails={item} />}
    />
  ) : (
    <View>
      <Text> No matches at the moment :(</Text>
    </View>
  );
};

export default ChatList;
