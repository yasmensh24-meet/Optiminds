import { Text, View, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { account, database, ID } from "./appwrite"; 


const FButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const FTextInput = ({ placeholder, value, onChangeText, secureTextEntry = false }) => (
  <TextInput
    style={styles.textInput}
    placeholder={placeholder}
    placeholderTextColor="#ccc"
    value={value}
    onChangeText={onChangeText}
    secureTextEntry={secureTextEntry} // Hide password input 
  />
);

export default function SignUp() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const submit = async () => {
      if (!name || !email || !username || !password) {
        alert("Please fill in all fields");
        return; }

      try {
        const user = await account.create(ID.unique(), email,password, name);
        const userDoc = await database.createDocument(
          "67bb6307003b0c830ac5", // Database ID
          "67bb6347001d32ea3bb5", // Collection ID
          ID.unique(),
          { name, email, username, userId: user.$id } 
        );
    
        alert("Sign-up successful!");
      
        router.push("/sym"); 
      } catch (error) {
        console.error("Sign-up error:", error);
        alert(`Failed to sign up: ${error.message}`);
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.text}>To get started, sign up here</Text>
        <FTextInput placeholder="Name" value={name} onChangeText={setName} />
        <FTextInput placeholder="Email" value={email} onChangeText={setEmail} />
        <FTextInput placeholder="Username" value={username} onChangeText={setUsername} />
        <FTextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
        <FButton title="Continue" onPress={submit} />
        <StatusBar />
        <Link href="/" style={styles.link}>Go Back</Link>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C3E50",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 20,
    letterSpacing: 1,
  },
  link: {
    fontSize: 16,
    color: "#9B59B6",
    textDecorationLine: "underline",
    marginTop: 10,
    fontWeight: "500",
  },
  textInput: {
    width: "100%",
    height: 50,
    backgroundColor: "#34495E",
    borderRadius: 30,
    paddingHorizontal: 20,
    borderWidth: 1.5,
    borderColor: "#9B59B6",
    fontSize: 18,
    marginBottom: 20,
    color: "white",
  },
  button: {
    backgroundColor: "#8E44AD",
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    textTransform: "uppercase",
  },
});