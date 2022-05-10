import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Alert } from "react-native";
import Constants from "expo-constants";
import axios from "axios";
import BottomBar from "../components/BottomBar";
import Swipes from "../components/Swipes";
import {
  doc,
  addDoc,
  collection,
  Timestamp,
  getFirestore,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, updateProfile } from "firebase/auth";

const auth = getAuth();
const db = getFirestore();

export default function MatchingScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [type, setType] = useState(null);
  const swipesRef = useRef(null);

  const onPressHandler = () => {
    navigation.navigate("Screen_B");
  };


  async function fetchUsers() {
    const currentType = auth.currentUser.displayName;
    let users = [];
    let newType = "";
    if (currentType === "tourist") newType = "resident";
    else if (currentType === "resident") newType = "tourist";
    const q = query(collection(db, "users"), where("type", "==", newType));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      users.push(doc.data());
    });
    setUsers(users);
  };

  useEffect(() => {
    fetchUsers();
  }, [type]);

  function handleLike() {
    console.log("like");
    nextUser();
  }

  function handlePass() {
    console.log("pass");
    nextUser();
  }

  function nextUser() {
    const nextIndex = users.length - 2 === currentIndex ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
  }

  function handleLikePress() {
    swipesRef.current.openLeft();
  }
  function handlePassPress() {
    swipesRef.current.openRight();
  }

  return (
    <View style={styles.container}>
      <View style={styles.swipes}>
        {users.length > 1 &&
          users.map(
            (u, i) =>
              currentIndex === i && (
                <Swipes
                  key={i}
                  ref={swipesRef}
                  currentIndex={currentIndex}
                  users={users}
                  handleLike={handleLike}
                  handlePass={handlePass}
                ></Swipes>
              )
          )}
      </View>
      <BottomBar
        handleLikePress={handleLikePress}
        handlePassPress={handlePassPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  swipes: {
    flex: 1,
    padding: 10,
    paddingTop: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
});
