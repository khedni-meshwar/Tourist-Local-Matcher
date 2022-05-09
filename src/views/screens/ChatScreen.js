import { View, Text } from 'react-native';
import React, {useState, useEffect} from 'react';
import ChatList from '../components/ChatList';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

const ChatScreen = () => {
  const [user, setUser] = useState([]);
  async function getUser() {
    const currentUser = auth.currentUser;
    setUser(currentUser.uid)
  }

   useEffect(() => {
        getUser()
   }, [])

  return (
    <View>
      <Text>ChatScreen</Text>
      <ChatList userId={user}/>
    </View>
  );
}

export default ChatScreen