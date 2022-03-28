import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MatchingScreen from './screens/MatchingScreen';
import ScreenB from './screens/ScreenB';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            let iconName;
            if (route.name === 'MatchingScreen') {
              iconName = 'users';
              size = focused ? 25 : 20;

            } else if (route.name === 'Screen_B') {
              iconName = 'comments';
              size = focused ? 25 : 20;
            } else if (route.name === 'Screen_C') {
              iconName = 'user';
              size = focused ? 25 : 20;
            }
            
            return (
              <FontAwesome
                name={iconName}
                size={size}
                color={color}
              />
            )
          }
        })}
        tabBarOptions={{
          activeTintColor: '#04555c',
          inactiveTintColor: '#555',
          activeBackgroundColor: '#fff',
          inactiveBackgroundColor: '#999',
          showLabel: false,
          labelStyle: { fontSize: 14 },
          showIcon: true,
        }}
        activeColor='#f0edf6'
        inactiveColor='#3e2465'
        barStyle={{ backgroundColor: '#694fad' }}
      >
        <Tab.Screen
          name="MatchingScreen"
          component={MatchingScreen}
        />
        <Tab.Screen
          name="Screen_B"
          component={ScreenB}
        />
        <Tab.Screen
          name="Screen_C"
          component={ScreenB}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App;