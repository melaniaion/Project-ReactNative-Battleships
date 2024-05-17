// app/index.tsx

import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import RegisterScreen from "./RegisterScreen";
import LoginScreen from "./LoginScreen";
import UserDetailsScreen from "./UserDetailsScreen";

const Stack = createStackNavigator();

export default function Index() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#b19cd9", // Light purple for header background
      },
      headerTintColor: "#fff", // White color for header text
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name = "Login" component={LoginScreen} />
      <Stack.Screen name="UserDetails" component={UserDetailsScreen}/>
    </Stack.Navigator>
  );
}