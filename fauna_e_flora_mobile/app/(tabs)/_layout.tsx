import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ tabBarActiveTintColor: "#3b82f6", headerShown: false }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Mapa",
          tabBarIcon: ({ color }) => (
            <Ionicons name="map" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Contribua",
          tabBarIcon: ({ color }) => (
            <Ionicons name="megaphone" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
