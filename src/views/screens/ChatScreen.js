import { View, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import ChatList from "../components/ChatList";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  onSnapshot,
  query,
  where,
  getFirestore,
  getDocs
} from "@firebase/firestore";

const auth = getAuth();
const db = getFirestore();

const ChatScreen = ({ navigation }) => {
  const [user, setUser] = useState([]);
  const [matches, setMatches] = useState([]);

  async function getUser() {
    const userSnapshot = await getDocs(
      query(
        collection(db, "users"),
        where("authId", "==", auth.currentUser.uid)
      )
    );
    userSnapshot.forEach(async (doc) => {
      await setUser({id: doc.id, ...doc.data()});
    });
  }

  useEffect(async () => {
    await getUser();
  }, []);

  async function fetchMatches() {
    let matches = [];
    const querySnapshot = await getDocs(
      query(collection(db, "users"), where("matches", "array-contains", user.id))
    );
    querySnapshot.forEach(async (doc) => {
      matches.push({ id: doc.id, ...doc.data() });
    });
    setMatches(matches);
    console.log(matches);
    console.log("matches");
  }
  useEffect(()=>{fetchMatches()},[user]);

  // useEffect(
  //   () =>
  //     onSnapshot(
  //       query(
  //         collection(db, "users"),
  //         where("matches", "array-contains", user)
  //       ),
  //       (snapshot) =>
  //         setMatches(
  //           snapshot.docs.map((doc) => ({
  //             id: doc.id,
  //             ...doc.data(),
  //           }))
  //         )
  //     ),
  //   [user]
  // );

  return (
    <View>
      <ChatList matches={matches} navigation={navigation} user={user}/>
    </View>
  );
};

export default ChatScreen;
