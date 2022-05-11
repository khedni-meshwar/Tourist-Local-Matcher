import { View, Text, Image, Dimensions, ImageBackground } from 'react-native'
import React from 'react'
import COLORS from "../../consts/colors";


const MatchedScreen = ({navigation}) => {
  return (
    <View style={{ flex: 1, opacity:0.89}}>
      <ImageBackground
        style={{ flex: 1 }}
        source={require("../../assets/match.png")}
      >
          <View style ={{marginTop:"50%"}}> 
          </View>
        </ImageBackground>
    </View>
  );
}

export default MatchedScreen