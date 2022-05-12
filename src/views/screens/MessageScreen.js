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
import { StyleSheet, View, Text, ScrollView, Pressable, Image } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const auth = getAuth();
const db = getFirestore();
const chatsRef = collection(db, "chats");

const MessageScreen = ({ route, navigation }) => {
  const { matchedUser, user } = route.params;
  const [concUsers, setConcUser] = useState(matchedUser.id+user.id);
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    const collectionRef = collection(db, "chats");
    const concUsers1 = matchedUser.id + user.id;
    const concUsers2 = matchedUser.id + user.id;
    const q = query(
      collectionRef,
      orderBy("createdAt", "desc"),
      where("convo", "in", [concUsers1, concUsers2])
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      setMessages(
        QuerySnapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const collectionRef = collection(db, "chats");
    const concUsers1 = matchedUser.id + user.id;
    const concUsers2 = user.id + matchedUser.id;
    const q = query(
      collectionRef,
      orderBy("createdAt", "desc"),
      where("convo", "in", [concUsers1, concUsers2])
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });

    return () => unsubscribe();
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
    <>
    <Pressable style={styles.actionBar} onPress={() => {navigation.navigate("UserProfileScreen", {matchedUser: matchedUser})}}>
      <Image source={matchedUser.image} />
      <Text style={styles.userName}>{matchedUser.firstName + " " + matchedUser.lastName}</Text>
    </Pressable>
    
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
    </>
  );
};
const styles = StyleSheet.create({
  header: {
    display: "flex",
    backgroundColor: COLORS.primary,
    width: "100%",
  },
  actionBar: {
    backgroundColor: COLORS.primary,
    height: 100,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    display: "flex",
    flexDirection: "row",
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white,
    marginLeft: "10%",
    marginTop: "5%"

  }
});
export default MessageScreen;
