import "react-native-gesture-handler";
import React from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnBoardScreen from "./src/views/screens/OnBoardScreen";
import MainScreen from "./src/views/screens/MainScreen";
import LoginScreen from "./src/views/screens/LoginScreen";
import SignUpScreen from "./src/views/screens/SignUpScreen";
import GettingStartedScreen from "./src/views/screens/GettingStartedScreen";
import CreateProfileScreen from "./src/views/screens/CreateProfileScreen";
import DetailsScreen from "./src/views/screens/DetailsScreen";
import MessageScreen from "./src/views/screens/MessageScreen";
import UserProfileScreen from "./src/views/screens/UserProfileScreen";
import QueryScreen from "./src/views/screens/QueryScreen";
import { RootSiblingParent } from "react-native-root-siblings";
import MatchedScreen from "./src/views/screens/MatchedScreen";
import MatchingScreen from "./src/views/screens/MatchingScreen";

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();



const App = () => {
  return (
    <RootSiblingParent >
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} >
          <Stack.Screen name="OnBoardScreen" component={OnBoardScreen} />
          <Stack.Screen
            name="GettingStartedScreen"
            component={GettingStartedScreen}
          />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="MainScreen" component={MainScreen} />
          <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
          <Stack.Screen
            name="CreateProfileScreen"
            component={CreateProfileScreen}
          />
          <Stack.Screen name="MessageScreen" component={MessageScreen} />
          <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
          <Stack.Screen name="QueryScreen" component={QueryScreen} />
          <Stack.Screen name="MatchedScreen" component={MatchedScreen} />
          <Stack.Screen name="MatchingScreen" component={MatchingScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
  );
};

export default App;
