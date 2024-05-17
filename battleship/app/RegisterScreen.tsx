import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const RegisterScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#b19cd9" />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#b19cd9" secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={() => alert('Register clicked')}>
        <Text style={styles.buttonText}>Register</Text>
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
    backgroundColor: "#fce4ec", // Light pink background color to match HomeScreen
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ff69b4", // Pink color
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ff69b4", 
    marginBottom: 20,
    borderRadius: 30,
    backgroundColor: "#fff", // White background for input fields
    color: "#ff69b4", // Pink text color
  },
  button: {
    backgroundColor: "#ff69b4", 
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

export default RegisterScreen;
