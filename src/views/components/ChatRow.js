import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";

const ChatRow = ({ matchDetails }) => {
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);

  useEffect(() => {
      setMatchedUserInfo(matchDetails)
  }, [matchDetails]);
  
  return (
    <TouchableOpacity>
      <Image />
      <Text>ChatRow</Text>
    </TouchableOpacity>
  );
};

export default ChatRow;
