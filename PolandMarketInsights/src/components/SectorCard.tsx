import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Sector } from "../types";

interface SectorCardProps {
  sector: Sector;
  onPress: (sectorId: string) => void;
}

const SectorCard: React.FC<SectorCardProps> = ({ sector, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(sector.id)}
      testID={`sector-card-${sector.id}`}
    >
      <View style={styles.header}>
        <Text style={styles.name}>{sector.name}</Text>
      </View>

      {sector.trends && (
        <View style={styles.trends}>
          <Text style={styles.trendText}>
            Wzrost:{" "}
            <Text style={styles.trendValue}>{sector.trends.growthRate}%</Text>
          </Text>
          <Text style={styles.trendText}>
            Średni przychód:{" "}
            <Text style={styles.trendValue}>
              {new Intl.NumberFormat("pl-PL", {
                style: "currency",
                currency: "PLN",
                maximumFractionDigits: 0,
              }).format(sector.trends.averageRevenue)}
            </Text>
          </Text>
          <Text style={styles.trendText}>
            Średnia marża:{" "}
            <Text style={styles.trendValue}>
              {sector.trends.averageProfitMargin}%
            </Text>
          </Text>
        </View>
      )}

      <View style={styles.footer}>
        <Text style={styles.companies}>
          Liczba firm: {sector.companies.length}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  header: {
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  trends: {
    marginBottom: 12,
  },
  trendText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  trendValue: {
    color: "#0066cc",
    fontWeight: "bold",
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 12,
  },
  companies: {
    fontSize: 14,
    color: "#666",
  },
});

export default SectorCard;
