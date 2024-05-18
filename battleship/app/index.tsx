import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import RegisterScreen from "./RegisterScreen";
import LoginScreen from "./LoginScreen";
import UserDetailsScreen from "./UserDetailsScreen";
import LobbyScreen from "./LobbyScreen";
import AllGamesScreen from "./AllGamesScreen";
import GameDetailsScreen from "./GameDetailsScreen";
import JoinGameScreen from "./JoinGameScreen";
import CreateGameScreen from "./CreateGameScreen";

type RootStackParamList = {
  Home: undefined;
  Register: undefined;
  Login: undefined;
  UserProfile: undefined;
  Lobby: undefined;
  AllGames: undefined;
  GameDetails: { gameId: string };
  JoinGame: undefined;
  CreateGame: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

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
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="UserProfile" component={UserDetailsScreen} />
      <Stack.Screen name="Lobby" component={LobbyScreen} />
      <Stack.Screen name="AllGames" component={AllGamesScreen} />
      <Stack.Screen name="GameDetails" component={GameDetailsScreen} />
      <Stack.Screen name="JoinGame" component={JoinGameScreen} />
      <Stack.Screen name="CreateGame" component={CreateGameScreen} />
    </Stack.Navigator>
  );
}
