import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { getGameDetails } from "./BattleshipAPI";

// Define the types for the route parameters
type RootStackParamList = {
  GameDetails: { gameId: string };
};

// Define the props for the screen
type GameDetailsScreenRouteProp = RouteProp<RootStackParamList, "GameDetails">;
type GameDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, "GameDetails">;

type Props = {
  route: GameDetailsScreenRouteProp;
  navigation: GameDetailsScreenNavigationProp;
};

const GameDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { gameId } = route.params;
  const [gameDetails, setGameDetails] = useState<any>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getGameDetails(gameId);
        setGameDetails(data);
      } catch (error: any) {
        Alert.alert("Error", error.message || "Failed to fetch game details");
        console.error("fetchGameDetails error:", error);
      }
    };

    fetchDetails();
  }, [gameId]);

  if (!gameDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading game details...</Text>
      </View>
    );
  }

  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Game Details</Text>
      
      <View style={styles.section}>
        <Text style={styles.label}>Status:</Text>
        <Text style={styles.info}>{gameDetails.status}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.label}>Player 1:</Text>
        <Text style={styles.info}>{gameDetails.player1?.email}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.label}>Player 2:</Text>
        <Text style={styles.info}>{gameDetails.player2?.email}</Text>
      </View>

      <View style={styles.divider} />

      <Text style={styles.label}>Moves:</Text>
      {gameDetails.moves && gameDetails.moves.length > 0 ? (
        gameDetails.moves.map((move: any, index: number) => (
          <View key={index} style={styles.moveSection}>
            <Text style={styles.moveText}>Move {index + 1}:</Text>
            <Text style={styles.moveDetail}>X: {move.x}, Y: {move.y}</Text>
            <Text style={styles.moveDetail}>Result: {move.result ? "Hit" : "Miss"}</Text>
            <View style={styles.moveDivider} />
          </View>
        ))
      ) : (
        <Text style={styles.noMoves}>No moves made yet.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f3e5f5", 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffe4e1", 
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ff69b4", 
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 15,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  info: {
    fontSize: 18,
    color: "#333",
    marginLeft: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#ff69b4", 
    marginVertical: 15,
  },
  moveSection: {
    marginBottom: 15,
  },
  moveText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff69b4",
  },
  moveDetail: {
    fontSize: 18,
    color: "#555",
    marginLeft: 10,
  },
  moveDivider: {
    height: 1,
    backgroundColor: "#ff69b4", 
    marginVertical: 10,
  },
  noMoves: {
    fontSize: 18,
    color: "#999",
    fontStyle: "italic",
    textAlign: "center",
  },
  loadingText: {
    fontSize: 20,
    color: "#ff69b4", 
  },
});

export default GameDetailsScreen;
