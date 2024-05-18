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
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Game {item.id}</Text>
        <Text style={styles.cardStatus}>{item.status}</Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardText}>Player 1: {item.player1?.email}</Text>
        <Text style={styles.cardText}>Player 2: {item.player2?.email}</Text>
      </View>
      <View style={styles.cardFooter}>
        <TouchableOpacity style={styles.joinButton} onPress={() => { /* to do */ }}>
          <Text style={styles.buttonText}>Join Game</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.detailsButton} onPress={() => { /* to do*/ }}>
          <Text style={styles.buttonText}>Game Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Games</Text>
      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No games available</Text>}
        contentContainerStyle={styles.listContent}
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
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 15,
    width: width - 40, 
    alignItems: "center",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff69b4", // Pink color
  },
  cardStatus: {
    fontSize: 14,
    color: "#888",
  },
  cardBody: {
    width: "100%",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: "#333",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  joinButton: {
    backgroundColor: "#ff69b4", // Pink color
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    width: "48%",
  },
  detailsButton: {
    backgroundColor: "#ff69b4", // Pink color
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    width: "48%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyText: {
    fontSize: 18,
    color: "#ff69b4", // Pink color
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default AllGamesScreen;
