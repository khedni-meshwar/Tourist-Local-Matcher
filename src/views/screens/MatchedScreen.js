import { View, Text, Image, Dimensions, ImageBackground } from 'react-native'
import React from 'react'
import COLORS from "../../consts/colors";
import CustomButton from '../components/CustomButton';


const MatchedScreen = ({navigation}) => {
  return (
    <View style={{ flex: 1, opacity:0.89}}>
      <ImageBackground
        style={{ flex: 1 }}
        source={require("../../assets/match.png")}
      >
          <View style ={{marginTop:"50%"}}>
          <CustomButton text="Send a Message"  key={matchDetails.id} onPress={() => navigation.navigate("MessageScreen", {matchedUser: matchDetails})}/>
          </View>
        </ImageBackground>
    </View>
  );
}

export default MatchedScreen