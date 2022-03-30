import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import OnBoardScreen from './src/views/screens/OnBoardScreen';
import ExploreScreen from './src/views/screens/ExploreScreen';
// import DetailsScreen from './src/views/screens/DetailsScreen';
import MainScreen from './src/views/screens/MainScreen';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      { <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="OnBoardScreen" component={OnBoardScreen} />
        <Stack.Screen name="MainScreen" component={MainScreen} />
      </Stack.Navigator> }

    </NavigationContainer>
  );
};

export default App;
