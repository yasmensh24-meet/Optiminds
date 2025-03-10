import { Stack } from "expo-router";
import React from "react";
import { Slot } from "expo-router";
import { Text,View,StyleSheet } from "react-native";


const RootLayout = () =>{
return(
  <Stack>
    <Stack.Screen name="index" options={{headerShown : false}}>
      
    </Stack.Screen>
  </Stack>
)

}
export default RootLayout
