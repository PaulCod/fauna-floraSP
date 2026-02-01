import { Ionicons } from "@expo/vector-icons";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ExploreScreen() {
  const links = [
    {
      label: "Dê seu feedback",
      icon: "chatbubble-outline",
      url: "https://docs.google.com/...",
      color: "#3b82f6",
    },
    {
      label: "Reportar Bug",
      icon: "bug-outline",
      url: "https://docs.google.com/...",
      color: "#ef4444",
    },
    {
      label: "GitHub do Projeto",
      icon: "logo-github",
      url: "https://github.com/...",
      color: "#000",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contribua</Text>
      {links.map((link, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => Linking.openURL(link.url)}
        >
          <Ionicons name={link.icon as any} size={24} color={link.color} />
          <Text style={styles.buttonText}>{link.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 30 },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#eee",
  },
  buttonText: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});
