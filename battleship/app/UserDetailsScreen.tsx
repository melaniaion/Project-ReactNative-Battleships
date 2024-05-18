import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { getUserDetails } from "./BattleshipAPI";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

interface UserDetails {
  email: string;
  currentlyGamesPlaying: number;
  gamesLost: number;
  gamesPlayed: number;
  gamesWon: number;
}

interface UserDetailsScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const UserDetailsScreen: React.FC<UserDetailsScreenProps> = ({ navigation }) => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const data = await getUserDetails();
        setUserDetails(data); 
      } catch (error: any) {
        Alert.alert("Error", error.message || "Failed to fetch user details");
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Details</Text>
      {userDetails ? (
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Email:</Text>
            <Text style={styles.cardText}>{userDetails.email}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Currently Games Playing:</Text>
            <Text style={styles.cardText}>{userDetails.currentlyGamesPlaying}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Games Lost:</Text>
            <Text style={styles.cardText}>{userDetails.gamesLost}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Games Played:</Text>
            <Text style={styles.cardText}>{userDetails.gamesPlayed}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Games Won:</Text>
            <Text style={styles.cardText}>{userDetails.gamesWon}</Text>
          </View>
        </View>
      ) : (
        <Text style={styles.detailsText}>Loading user details...</Text>
      )}
      <TouchableOpacity
        style={styles.lobbyButton}
        onPress={() => navigation.navigate("Lobby")}
      >
        <Text style={styles.buttonText}>Check the Lobby</Text>
      </TouchableOpacity>
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
  cardContainer: {
    width: "90%",
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
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff69b4", // Pink color
    marginBottom: 5,
  },
  cardText: {
    fontSize: 16,
    color: "#333",
  },
  detailsText: {
    fontSize: 18,
    color: "#ff69b4", // Pink color for text
    marginBottom: 10,
  },
  lobbyButton: {
    backgroundColor: "#ff69b4", // Pink color
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
    width: "60%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default UserDetailsScreen;
