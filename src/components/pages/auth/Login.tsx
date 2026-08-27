import React from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { demoStyles } from "../../../styles/LoginStyles";

export default function Login() {

  return (
    <SafeAreaView style={demoStyles.container}>
      {/* Title */}
      <View style={{ alignItems: "center", marginBottom: 20 }}>
      <Text style={{ color: "white", fontSize: 20, marginBottom: 20 }}>
        Vitality Logistics
      </Text>
      <Text style={{ color: "white", fontSize: 16 }}>
        Welcome to the Vitality Logistics app! Please log in to continue.
      </Text>
      </View>

    </SafeAreaView>
  );
}