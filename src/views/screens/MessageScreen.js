import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat, Bubble, Send } from "react-native-gifted-chat";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import COLORS from "../../consts/colors";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color= {COLORS.primary}
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
}
const styles = StyleSheet.create({
  header: {
    display: "flex",
    backgroundColor: COLORS.primary,
    width: "100%",
  }
});
export default MessageScreen;
