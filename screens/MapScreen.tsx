import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  Pressable,
} from "react-native";
import React, { useRef, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import useTheme from "@/hooks/useTheme";
import { ColorSchemeTypes, PrimaryColorTypes, ThemeTypes } from "@/types";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface MarkerData {
  id: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  title: string;
  description: string;
}

const INITIAL_REGION = {
  latitude: 23.8103,
  longitude: 90.4125,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const SAMPLE_MARKERS: MarkerData[] = [
  {
    id: "1",
    coordinate: { latitude: 23.8103, longitude: 90.4125 },
    title: "Dhaka",
    description: "Capital of Bangladesh",
  },
  {
    id: "2",
    coordinate: { latitude: 23.8223, longitude: 90.4225 },
    title: "Gulshan",
    description: "Business District",
  },
  {
    id: "3",
    coordinate: { latitude: 23.7985, longitude: 90.4025 },
    title: "Dhanmondi",
    description: "Residential Area",
  },
];

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);
  const [region, setRegion] = useState<Region>(INITIAL_REGION);
  const [markers, setMarkers] = useState<MarkerData[]>(SAMPLE_MARKERS);
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mapType, setMapType] = useState<"standard" | "satellite" | "hybrid">(
    "standard"
  );

  const { colorScheme, theme, primaryColor } = useTheme();

  const styles = createStyles(theme, colorScheme, primaryColor);

  // Animate to a specific location
  const animateToRegion = (lat: number, lng: number) => {
    const newRegion = {
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    };
    mapRef.current?.animateToRegion(newRegion, 1000);
  };

  //   Add Marker on long press
  const handleLongPress = (event: any) => {
    const { coordinate } = event.nativeEvent;
    const newMarker: MarkerData = {
      id: Date.now().toString(),
      coordinate,
      title: "New Location",
      description: "Custom marker",
    };
    setMarkers([...markers, newMarker]);
  };

  // Get user location (requires expo-location)
  const goToMyLocation = () => {
    // This is a placeholder - implement with expo-location
    // import * as Location from 'expo-location'
    animateToRegion(23.8103, 90.4125);
  };

  // Zoom controls
  const zoomIn = () => {
    const newRegion = {
      ...region,
      latitudeDelta: region.latitudeDelta / 2,
      longitudeDelta: region.longitudeDelta / 2,
    };
    mapRef.current?.animateToRegion(newRegion, 300);
  };

  const zoomOut = () => {
    const newRegion = {
      ...region,
      latitudeDelta: region.latitudeDelta * 2,
      longitudeDelta: region.longitudeDelta * 2,
    };
    mapRef.current?.animateToRegion(newRegion, 300);
  };

  // Toggle map type
  const toggleMapType = () => {
    const types: ("standard" | "satellite" | "hybrid")[] = [
      "standard",
      "satellite",
      "hybrid",
    ];
    const currentIndex = types.indexOf(mapType);
    const newIndex = (currentIndex + 1) % types.length;
    setMapType(types[newIndex]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Map */}
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        mapType={mapType}
        showsUserLocation
        showsMyLocationButton={false}
        showsCompass
        showsScale
        onRegionChangeComplete={setRegion}
        onLongPress={handleLongPress}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            onPress={() => setSelectedMarker(marker)}
          />
        ))}
      </MapView>

      {/* Search Bar - OUTSIDE MapView */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Location..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Map Controls - OUTSIDE MapView */}
      <View style={styles.controlsContainer}>
        {/* My Location Button */}
        <Pressable style={styles.controlButton} onPress={goToMyLocation}>
          <MaterialIcons name="my-location" size={24} color="#333" />
        </Pressable>

        {/* Zoom Controls */}
        <View style={styles.zoomControls}>
          <Pressable style={styles.controlButton} onPress={zoomIn}>
            <MaterialIcons name="add" size={24} color="#333" />
          </Pressable>
          <View style={styles.divider} />
          <Pressable style={styles.controlButton} onPress={zoomOut}>
            <MaterialIcons name="remove" size={24} color="#333" />
          </Pressable>
        </View>

        {/* Map Type Toggle */}
        <Pressable style={styles.controlButton} onPress={toggleMapType}>
          <MaterialIcons name="layers" size={24} color="#333" />
        </Pressable>
      </View>

      {/* Selected Marker Info - OUTSIDE MapView */}
      {selectedMarker && (
        <View style={styles.markerInfo}>
          <View style={styles.markerInfoContent}>
            <Text style={styles.markerTitle}>{selectedMarker.title}</Text>
            <Text style={styles.markerDescription}>
              {selectedMarker.description}
            </Text>
            <Text style={styles.markerCoords}>
              {selectedMarker.coordinate.latitude.toFixed(4)},{" "}
              {selectedMarker.coordinate.longitude.toFixed(4)}
            </Text>
          </View>
          <Pressable
            style={styles.closeButton}
            onPress={() => setSelectedMarker(null)}
          >
            <MaterialIcons name="close" size={20} color="#333" />
          </Pressable>
        </View>
      )}

      {/* Info Text - OUTSIDE MapView */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Long press to add markers • Tap markers for info
        </Text>
      </View>
    </SafeAreaView>
  );
}

function createStyles(
  theme: ThemeTypes,
  colorScheme: ColorSchemeTypes,
  primaryColor: PrimaryColorTypes
) {
  return StyleSheet.create({
    container: {
      backgroundColor: "#fff",
    },
    map: {
      width: "100%",
      height: "100%",
    },
    searchContainer: {
      position: "absolute",
      top: 60,
      left: 16,
      right: 16,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "white",
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      // IOS shadow
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      // Android shadow
      elevation: 5,
    },
    searchInput: {
      flex: 1,
      marginLeft: 12,
      fontSize: 16,
      color: "#333",
    },
    controlsContainer: {
      position: "absolute",
      right: 16,
      bottom: 100,
      gap: 12,
    },
    controlButton: {
      backgroundColor: "white",
      borderRadius: 8,
      width: 48,
      height: 48,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    zoomControls: {
      backgroundColor: "white",
      borderRadius: 8,
      overflow: "hidden",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    divider: {
      height: 1,
      backgroundColor: "#E0E0E0",
    },
    markerInfo: {
      position: "absolute",
      bottom: 20,
      left: 16,
      right: 16,
      backgroundColor: "white",
      borderRadius: 12,
      padding: 16,
      flexDirection: "row",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    markerInfoContent: {
      flex: 1,
    },
    markerTitle: {
      fontSize: 18,
      fontWeight: "600" as any,
      color: "#333",
      marginBottom: 4,
    },
    markerDescription: {
      fontSize: 14,
      color: "#666",
      marginBottom: 4,
    },
    markerCoords: {
      fontSize: 12,
      color: "#999",
    },
    closeButton: {
      padding: 4,
    },
    infoBox: {
      position: "absolute",
      top: 130,
      left: 16,
      right: 16,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      borderRadius: 8,
      padding: 12,
      alignItems: "center",
    },
    infoText: {
      color: "white",
      fontSize: 12,
    },
  });
}