import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

interface LobbyScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const LobbyScreen: React.FC<LobbyScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lobby</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AllGames")}
      >
        <Text style={styles.buttonText}>Show All Games</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CreateGame")}
      >
        <Text style={styles.buttonText}>Create Game</Text>
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
  button: {
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

export default LobbyScreen;
