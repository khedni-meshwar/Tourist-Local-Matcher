import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import { GiftedChat, Bubble, Send } from "react-native-gifted-chat";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getFirestore,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";
import COLORS from "../../consts/colors";
import { StyleSheet, View, Text, ScrollView } from "react-native";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { async } from "@firebase/util";


const auth = getAuth();
const db = getFirestore();
const chatsRef = collection(db, "chats");


const MessageScreen = ({ route, navigation}) => {

  const [matchedUser, setMatchedUser] = useState();

  async function fetchMainUser() {
    const userSnapshot = await getDocs(
      query(
        collection(db, "users"),
        where("authId", "==", route.params)
      )
    );
    userSnapshot.forEach(async (doc) => {
      await setMatchedUser({ id: doc.id, ...doc.data() });
    });
  }

  const [messages, setMessages] = useState([]);

  useEffect(async() => {
    await fetchMainUser();
    setMessages([
      {
        _id: 1,
        text: "Hello",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: matchedUser.firstName + " " + matchedUser.lastName,
          avatar: matchedUser.image,
        },
      },
    ]);

  }, []);

  const onSend = useCallback(async (messages = []) => {
    setMessages(
      async (previousMessages) =>
        await GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    await addDoc(collection(db, "chats"), {
      _id,
      createdAt,
      text,
      user,
      convo: concUsers,
    });
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={32}
            color={COLORS.primary}
          />
        </View>
      </Send>
    );
  };
  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      renderUsernameOnMessage={true}
      renderSend={renderSend}
      onPressAvatar={() =>
        navigation.navigate("UserProfileScreen", { matchedUser: matchedUser })
      }
      user={{
        _id: user.id, // add real userid, name, and avatar here
        name: user.firstName + " " + user.lastName,
        avatar: user.image,
      }}
      renderBubble={(props) => {
        return (
          <Bubble
            {...props}
            textStyle={{
              right: {
                color: "white",
              },
              left: {
                color: "white",
              },
            }}
            wrapperStyle={{
              left: {
                backgroundColor: "#667b80",
              },
              right: {
                backgroundColor: "#04555c",
              },
            }}
          />
        );
      }}
    />
  );
};
const styles = StyleSheet.create({
  header: {
    display: "flex",
    backgroundColor: COLORS.primary,
    width: "100%",
  },
});
export default MessageScreen;
