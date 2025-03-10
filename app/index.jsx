import { Text, View, StyleSheet } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to  OPTIMINDS</Text>
      <Text style={styles.text}>To get started :</Text>

      <StatusBar />
      <Link href="/login" style={styles.link}>log in here</Link>
      <Link href="/signup" style={styles.link}>Signup here</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C3E50", // Dark blue-gray background for a premium look
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF", // White for readability on dark background
    textAlign: "center",
    marginBottom: 20,
    letterSpacing: 1, // Subtle spacing for a clean feel
  },
  link: {
    fontSize: 16,
    color: "#9B59B6", // Deep purple for links
    textDecorationLine: "underline",
    marginTop: 10,
    fontWeight: "500", // Slightly lighter for subtlety
  },

});
