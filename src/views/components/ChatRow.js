import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";

const ChatRow = ({ matchDetails }) => {
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);

  useEffect(() => {
      setMatchedUserInfo(matchDetails);
      // console.log(matchedUserInfo)
  }, [matchDetails]);

  return (
    <TouchableOpacity>
      <Image />
      {console.log(matchedUserInfo)}
      <Text>ChatRow</Text>
    </TouchableOpacity>
  );
};

export default ChatRow;
