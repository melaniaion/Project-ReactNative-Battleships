import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";
import { createGame } from "./BattleshipAPI";

const CreateGameScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const handleCreateGame = async () => {
    try {
      const newGame = await createGame();
      Alert.alert("Success", "Game created successfully");
      navigation.navigate("GameDetails", { gameId: newGame.id }); 
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to create game");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Game</Text>
      <TouchableOpacity style={styles.createButton} onPress={handleCreateGame}>
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
  createButton: {
    backgroundColor: "#ff69b4", // Pink color
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    width: "60%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CreateGameScreen;
