import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SymptomsScreen from "../screens/patient/SymptomsScreen";


const Stack = createNativeStackNavigator();

export default function PatientNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Symptoms" component={SymptomsScreen} />
        </Stack.Navigator>
    );
}