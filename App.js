import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnBoardScreen from "./src/views/screens/OnBoardScreen";
import MainScreen from "./src/views/screens/MainScreen";
import LoginScreen from "./src/views/screens/LoginScreen";
import SignUpScreen from "./src/views/screens/SignUpScreen";
import GettingStartedScreen from "./src/views/screens/GettingStartedScreen";
import CreateProfileScreen from "./src/views/screens/CreateProfileScreen";
import DetailsScreen from "./src/views/screens/DetailsScreen";
import { RootSiblingParent } from "react-native-root-siblings";

const Stack = createStackNavigator();

const App = () => {
  return (
    <RootSiblingParent>
      <NavigationContainer>
        {
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="OnBoardScreen" component={OnBoardScreen} />
            <Stack.Screen
              name="GettingStartedScreen"
              component={GettingStartedScreen}
            />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="MainScreen" component={MainScreen} />
            <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
            <Stack.Screen name="CreateProfileScreen" component={CreateProfileScreen} />
          </Stack.Navigator>
        }
      </NavigationContainer>
    </RootSiblingParent>
  );
};

export default App;
