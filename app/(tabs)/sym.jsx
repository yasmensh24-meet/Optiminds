import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { database, ID } from "./appwrite"; 

function RadiooButton({ title, selected, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.radioButton, selected && styles.selectedRadioButton]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>
        {selected ? "● " : "○ "} {title}
      </Text>
    </TouchableOpacity>
  );
}

export default function Index() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false);

  const options = ["Anxiety attacks", "I can't sleep", "A lot of stress", "I can't focus", "Angry all the time"];

  const submitSymptom = async () => {
    if (!selectedOption) {
      alert("Please select an answer.");
      return;
    }

    setLoading(true);

    try {

      await database.createDocument(
        "67bb6307003b0c830ac5", // Database ID
        "67bb6319000dc48704a1", // Collection id
        ID.unique(), 
        { symptom: selectedOption } 
      );

      alert("Symptom saved successfully!");
      router.push("/profile"); 
    } catch (error) {
      console.error("Error saving symptom:", error);
      alert(`Failed to save symptom: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>What do you suffer from?</Text>
      {options.map((option, index) => (
        <RadiooButton
          key={index}
          title={option}
          selected={selectedOption === option}
          onPress={() => setSelectedOption(option)}
        />
      ))}

      <TouchableOpacity
        style={[styles.button, loading && styles.disabledButton]}
        onPress={submitSymptom}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Submit</Text>}
      </TouchableOpacity>
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
  radioButton: {
    backgroundColor: "#34495E",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRadioButton: {
    backgroundColor: "#8E44AD",
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
  disabledButton: {
    opacity: 0.7,
  },
});