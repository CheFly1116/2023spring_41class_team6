import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import Chats from "./screen/Chats";
import Login from "./screen/Login";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
  <NavigationContainer>    
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Chats" component={Chats} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}