import { Text, View, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { account } from "./appwrite"; 


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
        secureTextEntry={secureTextEntry} 
    />
);

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleLogin = async () => {
        if (!email || !password) {
            alert("Please enter email and password.");
            return;
        }
        try {
            console.log("Logging in with:", email, password);
            const session = await account.createSession(email, password); 

            console.log("Login successful:", session);
            router.push("/profile"); 
        } catch (error) {
            console.error("Login error:", error);
            alert(`Login failed: ${error.message}`);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Log in here</Text>
            
            <FTextInput placeholder="Email" value={email} onChangeText={setEmail} />
            <FTextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

            <FButton title="Continue" onPress={handleLogin} />
            <StatusBar />
            <Link href="/" style={styles.link}>Go Back</Link>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2C3E50',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    text: {
        fontSize: 20,
        fontWeight: '600',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 20,
        letterSpacing: 1,
    },
    link: {
        fontSize: 16,
        color: '#9B59B6',
        textDecorationLine: 'underline',
        marginTop: 10,
        fontWeight: '500',
    },
    textInput: {
        width: '100%',
        height: 50,
        backgroundColor: '#34495E',
        borderRadius: 30,
        paddingHorizontal: 20,
        borderWidth: 1.5,
        borderColor: '#9B59B6',
        fontSize: 18,
        marginBottom: 20,
        color: "white",
    },
    button: {
        backgroundColor: '#8E44AD',
        paddingVertical: 15,
        paddingHorizontal: 35,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
});