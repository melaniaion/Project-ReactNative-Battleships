import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Dimensions } from "react-native";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { getAllGames, getUserDetails } from "./BattleshipAPI";

const { width } = Dimensions.get("window");

const AllGamesScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [email, setEmail] = useState<string>("");
  const [games, setGames] = useState<any[]>([]);
  const [filteredGames, setFilteredGames] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>("All Games");

  const fetchGames = async () => {
    try {
      const data = await getAllGames();
      setGames(data.games);
      setFilteredGames(data.games); // Initialize with all games
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to fetch games");
      console.error("fetchGames error:", error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const userDetails = await getUserDetails();
      setEmail(userDetails.email);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to fetch user details");
      console.error("fetchUserDetails error:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchGames();
  }, []);

  useEffect(() => {
    switch (filter) {
      case "All Games":
        setFilteredGames(games);
        break;
      case "Available Games":
        setFilteredGames(games.filter(game => !game.player2));
        break;
      case "My Games":
        setFilteredGames(games.filter(game => game.player1?.email === email || game.player2?.email === email));
        break;
    }
  }, [filter, games, email]);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Game {item.id}</Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardStatus}>Status: {item.status}</Text>
        <Text style={styles.cardText}>Player 1: {item.player1?.email}</Text>
        <Text style={styles.cardText}>Player 2: {item.player2?.email}</Text>
      </View>
      <View style={styles.cardFooter}>
        <TouchableOpacity
          style={styles.joinButton}
          onPress={() => navigation.navigate("JoinGame", { gameId: item.id })}
        >
          <Text style={styles.buttonText}>Join Game</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => navigation.navigate("GameDetails", { gameId: item.id })}
        >
          <Text style={styles.buttonText}>Game Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Battleship Games</Text>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === "All Games" && styles.activeFilterButton]}
          onPress={() => setFilter("All Games")}
        >
          <Text style={styles.filterButtonText}>All Games</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === "Available Games" && styles.activeFilterButton]}
          onPress={() => setFilter("Available Games")}
        >
          <Text style={styles.filterButtonText}>Available Games</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === "My Games" && styles.activeFilterButton]}
          onPress={() => setFilter("My Games")}
        >
          <Text style={styles.filterButtonText}>My Games</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredGames}
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
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  filterButton: {
    flex: 1,
    padding: 10,
    backgroundColor: "#ff69b4",
    borderRadius: 20,
    marginHorizontal: 5,
    alignItems: "center",
  },
  activeFilterButton: {
    backgroundColor: "#ff1493", // Darker pink for active filter
  },
  filterButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
