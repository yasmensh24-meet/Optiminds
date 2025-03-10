import { Text, View,Button, ImageBackground, StyleSheet, ScrollView, FlatList , TouchableOpacity} from "react-native";
import React from "react";
import {Link, useRouter} from "expo-router";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

// another function to create buttons for the levels 
function FButton({title , onPress}){
    return(
        <TouchableOpacity style={styles.levelButton} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    ) ;
}


export default function Index() {
    const[Clevel,setClevel] = useState(null); 
// using the usestate hook to update the user on what level hes on 
// here im just defining the variable Clevel and setting the value to null

 
  return (
    <ScrollView >

    <View style={styles.container} >
        <Text style={styles.text}>U have 6 levels in this unit  </Text>
       <Text style={styles.text}>your current level is : {Clevel}</Text>
     
       {/* now each time the user click on the level they are on, it sets the value to the number of the level  */}
      <FButton title="Level 1 " onPress={() => setClevel(1)} />
      <FButton title="Level 2 "  onPress={() => setClevel(2)}/>
      <FButton title="Level 3 "  onPress={() => setClevel(3)}/>
      <FButton title="Level 4"  onPress={() => setClevel(4)}/>
      <FButton title="Level 5 " onPress={() => setClevel(5)} />
      <FButton title="Level 6 "  onPress={() => setClevel(6)}/>
     
        <FButton title="restart" onPress={()=> setClevel(null)}/>
    </View>
    
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2C3E50', // Dark blue-gray background for a premium look
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    text: {
      fontSize: 20,
      fontWeight: '600',
      color: '#FFFFFF', // White for readability on dark background
      textAlign: 'center',
      marginBottom: 20,
      letterSpacing: 1, // Subtle spacing for a clean feel
    },
    link: {
      fontSize: 16,
      color: '#9B59B6', // Deep purple for links
      textDecorationLine: 'underline',
      marginTop: 10,
      fontWeight: '500', // Slightly lighter for subtlety
    },
    textInput: {
      width: '100%',
      height: 50,
      backgroundColor: '#34495E', // Dark grayish-blue for inputs
      borderRadius: 30, // More rounded for a soft and clean look
      paddingHorizontal: 20,
      borderWidth: 1.5, // Slim border for a refined look
      borderColor: '#9B59B6', // Purple border for contrast
      fontSize: 18,
      marginBottom: 20,
      color: '#FFFFFF', // White text for clarity
      fontWeight: '400', // Light font for minimalism
    },
    button: {
      backgroundColor: '#8E44AD', // Rich purple for action buttons
      paddingVertical: 15,
      paddingHorizontal: 35,
      borderRadius: 50, // Oval, modern button shape
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#8E44AD',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 5, // More elevated effect for depth
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '700',
      textTransform: 'uppercase', // Bold and clean capitalized text
    },
    levelButton: {
      backgroundColor: '#3498DB', // Calming blue for progress
      paddingVertical: 15,
      paddingHorizontal: 35,
      borderRadius: 50, // Oval shape for consistency
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1.5,
      borderColor: '#9B59B6', // Purple border for contrast
      marginVertical: 10,
      shadowColor: '#3498DB',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4, // Elevated for depth
    },
    levelButtonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '600',
      textTransform: 'uppercase', // Uniform button text styling
    },
  });
  