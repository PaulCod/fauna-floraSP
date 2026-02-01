import type { SpecieResponseDTO } from "@/dtos/species.dto";
import { getAllSpecies } from "@/services/SpeciesServices";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

export default function MapScreen() {
  const [species, setSpecies] = useState<SpecieResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpecie, setSelectedSpecie] =
    useState<SpecieResponseDTO | null>(null);

  useEffect(() => {
    setLoading(true);
    getAllSpecies()
      .then((data) => setSpecies(data))
      .catch((err) => {
        console.error("ERRO DE REDE:", err);
        alert("Não foi possível conectar ao servidor");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={{ marginTop: 10 }}>Carregando Fauna & Flora...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.floatingHeader}>
        <Text style={styles.brandTitle}>
          FAUNA&FLORA <Text style={{ color: "#3b82f6" }}>SP</Text>
        </Text>
        <Text style={styles.brandSubtitle}>Monitoramento Ambiental</Text>
      </View>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={silverMapStyle}
        onPress={() => setSelectedSpecie(null)}
        initialRegion={{
          latitude: -23.5505,
          longitude: -46.6333,
          latitudeDelta: 4.0,
          longitudeDelta: 4.0,
        }}
        {...({
          cameraBoundary: {
            southWest: SP_BOUNDS.southWest,
            northEast: SP_BOUNDS.northEast,
          },
        } as any)}
      >
        {species.map((s) => (
          <Marker
            key={s.id}
            coordinate={{
              latitude: Number(s.latitude),
              longitude: Number(s.longitude),
            }}
            onPress={(e) => {
              e.stopPropagation();
              setSelectedSpecie(s);
            }}
          >
            <View
              style={[
                styles.markerCircle,
                {
                  backgroundColor:
                    String(s.category) === "ANIMAL" ? "#3b82f6" : "#22c55e",
                },
              ]}
            >
              <View style={styles.markerInnerCircle} />
            </View>
          </Marker>
        ))}
      </MapView>
      {selectedSpecie && (
        <View style={styles.bottomCard}>
          {/* Cabeçalho */}
          <View style={styles.cardHeader}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{selectedSpecie.name}</Text>
              <Text
                style={[
                  styles.cardStatus,
                  {
                    color: selectedSpecie.status.includes("criticamente")
                      ? "#dc2626"
                      : "#3b82f6",
                  },
                ]}
              >
                {selectedSpecie.status}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedSpecie(null)}
            >
              <Text style={{ color: "#666", fontWeight: "bold" }}>X</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.contentRow}>
            {selectedSpecie.imageUrl ? (
              <Image
                source={{
                  uri: selectedSpecie.imageUrl,
                  headers: { "User-Agent": "FaunaFloraApp/1.0" },
                }}
                style={styles.cardImage}
                resizeMode="cover"
                key={selectedSpecie.id}
              />
            ) : (
              <View
                style={[
                  styles.cardImage,
                  { backgroundColor: "#f3f4f6", justifyContent: "center" },
                ]}
              >
                <Text style={{ fontSize: 10, textAlign: "center" }}>
                  Sem foto
                </Text>
              </View>
            )}

            <View style={{ flex: 1 }}>
              <Text style={styles.cardDetails} numberOfLines={6}>
                {selectedSpecie.details}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: "100%", height: "100%" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  floatingHeader: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 12,
    borderRadius: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  brandTitle: { fontSize: 16, fontWeight: "900", color: "#1f2937" },
  brandSubtitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#6b7280",
    textTransform: "uppercase",
  },

  markerCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  markerInnerCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#ffffff",
  },

  bottomCard: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    zIndex: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
  },
  cardStatus: {
    fontSize: 12,
    color: "#3b82f6",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  closeButton: {
    backgroundColor: "#f3f4f6",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  contentRow: {
    flexDirection: "row",
    gap: 15,
    marginTop: 10,
    alignItems: "flex-start",
  },
  cardImage: {
    width: 110,
    height: 110,
    borderRadius: 12,
    backgroundColor: "#e5e7eb", // Cor de fundo enquanto carrega
  },
  cardDetails: {
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 20,
    flexShrink: 1,
  },
});

const SP_BOUNDS = {
  southWest: { latitude: -25.35, longitude: -53.11 },
  northEast: { latitude: -19.77, longitude: -44.16 },
};

const silverMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#c9c9c9" }],
  },
];
