import ExploreScreen from "./ExploreScreen";
import ChatScreen from "./ChatScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MatchingScreen from "./MatchingScreen";
import ProfileScreen from "./ProfileScreen";

const Tab = createMaterialBottomTabNavigator();

export default function MainScreen({ navigation }) {
  return (
    <Tab.Navigator
      labeled={false}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;
          if (route.name === "MatchingScreen") {
            iconName = "users";
            size = focused ? 25 : 20;
          } else if (route.name === "ExploreScreen") {
            iconName = "search";
            size = focused ? 25 : 20;
          } else if (route.name === "ChatScreen") {
            iconName = "comments";
            size = focused ? 25 : 20;
          } else if (route.name === "ProfileScreen") {
            iconName = "user";
            size = focused ? 25 : 20;
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
      activeColor="#04555c"
      inactiveColor="#555"
      barStyle={{ backgroundColor: "#ffffff" }}
    >
      <Tab.Screen name="MatchingScreen" component={MatchingScreen} />
      <Tab.Screen name="ExploreScreen" component={ExploreScreen} />
      <Tab.Screen name="ChatScreen" component={ChatScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
