import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

const auth = getAuth();

const db = getFirestore();
const chatsRef = collection(db, "chats");

const MessageScreen = ({ route, navigation}) => {
  const { matchedUser } = route.params;

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log(matchedUser)
    setMessages([
      {
        _id: 1,
        text: "Hello",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: matchedUser.firstName + " " + matchedUser.lastName,
          avatar: matchedUser.profilePhoto,
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      renderUsernameOnMessage={true}
      onSend={(messages) => onSend(messages)}
      onPressAvatar={() => navigation.navigate("UserProfileScreen", {matchedUser: matchedUser})}
      user={{
        _id: 1,
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
export default MessageScreen;
