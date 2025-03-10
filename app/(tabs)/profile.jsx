import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react"; 
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { database } from "./appwrite"; 

export default function Profile() {
    const router = useRouter();
    const [name, setName] = useState(null);
    const [symptom, setSymptom] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the user's symptom data when component mounts
        const fetchUserData = async () => {
            try {
                // Fetch user's symptom data from the symptoms collection
                const response = await database.listDocuments(
                    "67bb6307003b0c830ac5", // Database ID
                    "67bb6319000dc48704a1"  // Collection ID (symptoms)
                );

                // If documents exist, get the latest symptom
                if (response.documents.length > 0) {
                    // Sort by creation date to get the latest entry
                    const latestSymptom = response.documents.sort((a, b) => 
                        new Date(b.$createdAt) - new Date(a.$createdAt)
                    )[0];
                    
                    setSymptom(latestSymptom.symptom);
                }

                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const gotouni1 = () => router.push("/levels");
    const gotouni2 = () => router.push("/levels2");
    const gotouni3 = () => router.push("/levels3");
    const gotouni4 = () => router.push("/levels4");

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Profile</Text>

            {loading ? (
                <Text style={styles.loadingText}>Loading user data...</Text>
            ) : (
                <>
                    {/* Display the user's name */}
                    {name ? (
                        <Text style={styles.text}>Hello, {name}</Text>
                    ) : (
                        <Text style={styles.text}>Welcome!</Text>
                    )}

                    {/* Display the user's symptom */}
                    {symptom ? (
                        <View style={styles.symptomContainer}>
                            <Text style={styles.symptomLabel}>Symptom:</Text>
                            <Text style={styles.symptomText}>{symptom}</Text>
                        </View>
                    ) : (
                        <Text style={styles.text}>No symptoms recorded</Text>
                    )}
                </>
            )}

            <View style={styles.buttonContainer}>
                <View style={styles.column}>
                    <TouchableOpacity style={styles.unitButton} onPress={gotouni1}>
                        <Text style={styles.unitButtonText}>Unit 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.unitButton} onPress={gotouni3}>
                        <Text style={styles.unitButtonText}>Unit 3</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.column}>
                    <TouchableOpacity style={styles.unitButton} onPress={gotouni2}>
                        <Text style={styles.unitButtonText}>Unit 2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.unitButton} onPress={gotouni4}>
                        <Text style={styles.unitButtonText}>Unit 4</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <StatusBar />
            <Link href="/" style={styles.link}>Go back to home</Link>
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
    loadingText: {
        fontSize: 16,
        color: "#FFFFFF",
        opacity: 0.8,
        marginBottom: 20,
    },
    symptomContainer: {
        backgroundColor: "#34495E",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        width: "100%",
        alignItems: "center",
    },
    symptomLabel: {
        fontSize: 16,
        color: "#9B59B6",
        marginBottom: 5,
        fontWeight: "700",
    },
    symptomText: {
        fontSize: 18,
        color: "#FFFFFF",
        fontWeight: "500",
    },
    link: {
        fontSize: 16,
        color: "#9B59B6",
        textDecorationLine: "underline",
        marginTop: 10,
        fontWeight: "500",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 20,
    },
    column: {
        width: "45%",
        justifyContent: "space-evenly",
    },
    unitButton: {
        backgroundColor: "#8E44AD",
        paddingVertical: 20,
        paddingHorizontal: 50,
        marginBottom: 20,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    unitButtonText: {
        fontSize: 18,
        color: "#FFFFFF",
    },
});