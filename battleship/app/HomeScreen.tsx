import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

interface HomeScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to the Battleship Game!</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.buttonText}>Go to Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { marginTop: 20 }]} 
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#fce4ec", // Light pink background color
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ff69b4", // Pink color
    textAlign: "center",
    marginBottom: 50, 
  },
  button: {
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

export default HomeScreen;
