import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import ChatList from "../components/ChatList";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  onSnapshot,
  query,
  where,
  getFirestore,
} from "@firebase/firestore";

const auth = getAuth();
const db = getFirestore();

const ChatScreen = ({navigation}) => {
  const [user, setUser] = useState([]);
  const [matches, setMatches] = useState([]);

  async function getUser() {
    const currentUser = auth.currentUser;
    setUser(currentUser.uid);
  }

  useEffect(() => {
    getUser();
  }, []);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "users"),
          where("matches", "array-contains", user)
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

  return (
    <View>
      <Text>ChatScreen</Text>
      <ChatList matches={matches} navigation={navigation} />
    </View>
  );
};

export default ChatScreen;
