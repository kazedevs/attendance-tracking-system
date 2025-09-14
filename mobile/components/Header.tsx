import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

export default function Header() {
  const handleLogout = () => {
    // Handle logout logic here
    console.log("Logout pressed");
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.logoText}>Attendly</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <MaterialIcons name="logout" size={24} color="#E53935" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#00000020",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  logoText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2B8C4F",
    letterSpacing: 0.5,
  },
  logoutButton: {
    padding: 8,
  },
});
