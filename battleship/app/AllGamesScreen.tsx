import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Dimensions } from "react-native";
import { getAllGames } from "./BattleshipAPI"; 

const { width } = Dimensions.get("window");

const AllGamesScreen = () => {
  const [games, setGames] = useState<any[]>([]);

  const fetchGames = async () => {
    try {
      const data = await getAllGames();
      setGames(data.games); 
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to fetch games");
      console.error("fetchGames error:", error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Text style={styles.cardText}>Game ID: {item.id}</Text>
      <Text style={styles.cardText}>Status: {item.status}</Text>
      <Text style={styles.cardText}>Player1: {item.player1.email}</Text>
      <Text style={styles.cardText}>Player2: {item.player2.email}</Text>
      <TouchableOpacity style={styles.joinButton} onPress={() => { /* to do */ }}>
        <Text style={styles.buttonText}>Join Game</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.detailsButton} onPress={() => { /* to do */ }}>
        <Text style={styles.buttonText}>Game Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Games</Text>
      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2} 
        columnWrapperStyle={styles.row} 
        ListEmptyComponent={<Text style={styles.emptyText}>No games available</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fce4ec", // Light pink background color 
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ff69b4", // Pink color
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 15,
    width: (width / 2) - 30, // Adjust width for two columns, maye it will work now yeeeeey
    margin: 10,
    alignItems: "center",
  },
  cardText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  joinButton: {
    backgroundColor: "#ff69b4", // Pink color
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  detailsButton: {
    backgroundColor: "#ff69b4", // Pink color
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  emptyText: {
    fontSize: 18,
    color: "#ff69b4", // Pink color
    textAlign: "center",
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
});

export default AllGamesScreen;
