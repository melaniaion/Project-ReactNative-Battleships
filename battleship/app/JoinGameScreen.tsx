import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import { joinGame, getGameDetails } from "./BattleshipAPI";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  JoinGame: { gameId: string };
};

type JoinGameScreenRouteProp = RouteProp<RootStackParamList, "JoinGame">;
type JoinGameScreenNavigationProp = StackNavigationProp<RootStackParamList, "JoinGame">;

type Props = {
  route: JoinGameScreenRouteProp;
  navigation: JoinGameScreenNavigationProp;
};

const JoinGameScreen: React.FC<Props> = ({ route, navigation }) => {
  const { gameId } = route.params;
  const [gameDetails, setGameDetails] = useState<any>(null);

  useEffect(() => {
    const joinAndFetchDetails = async () => {
      try {
        await joinGame(gameId);
        Alert.alert("Success", "Joined game successfully");

        const data = await getGameDetails(gameId);
        setGameDetails(data);
      } catch (error: any) {
        Alert.alert("Error", error.message || "Failed to join game");
        console.error("joinGame error:", error);
      }
    };

    joinAndFetchDetails();
  }, [gameId]);

  if (!gameDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Joining game and fetching details...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Game Details</Text>
        <Text style={styles.info}>Status: {gameDetails.status}</Text>
        <Text style={styles.info}>Player 1: {gameDetails.player1?.email}</Text>
        <Text style={styles.info}>Player 2: {gameDetails.player2?.email}</Text>
        <Text style={styles.info}>Moves:</Text>
        {gameDetails.moves && gameDetails.moves.length > 0 ? (
          gameDetails.moves.map((move: any, index: number) => (
            <View key={index} style={styles.move}>
              <Text style={styles.moveText}>Move {index + 1}:</Text>
              <Text style={styles.moveDetail}>X: {move.x}, Y: {move.y}</Text>
              <Text style={styles.moveDetail}>Result: {move.result ? "Hit" : "Miss"}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noMoves}>No moves made yet.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f3e5f5",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#8e24aa",
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
  move: {
    marginBottom: 10,
  },
  moveText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#8e24aa",
  },
  moveDetail: {
    fontSize: 16,
    color: "#555",
  },
  noMoves: {
    fontSize: 16,
    color: "#999",
    fontStyle: "italic",
  },
  loadingText: {
    fontSize: 18,
    color: "#999",
  },
});

export default JoinGameScreen;
