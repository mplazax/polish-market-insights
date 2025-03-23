import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  addSectorToWatchlist,
  removeSectorFromWatchlist,
} from "../store/slices/userSlice";
import { Ionicons } from "@expo/vector-icons";
import api from "../services/api";
import { Sector, Company } from "../types";
import CompanyCard from "../components/CompanyCard";

const SectorDetailsScreen = ({ route, navigation }) => {
  const { sectorId } = route.params;
  const [sector, setSector] = useState<Sector | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const userWatchlist = useAppSelector(
    (state) => state.user.data?.watchlist.sectors || []
  );
  const language = useAppSelector(
    (state) => state.user.data?.preferences.language || "pl"
  );

  const isInWatchlist = userWatchlist.includes(sectorId);

  useEffect(() => {
    const fetchSectorDetails = async () => {
      try {
        const sectorData = await api.getSectorById(sectorId);
        setSector(sectorData);

        // Fetch companies in this sector
        if (sectorData.companies.length > 0) {
          const companyPromises = sectorData.companies.map((id) =>
            api.getCompanyById(id)
          );
          const companyData = await Promise.all(companyPromises);
          setCompanies(companyData);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSectorDetails();
  }, [sectorId]);

  const handleToggleWatchlist = () => {
    if (isInWatchlist) {
      dispatch(removeSectorFromWatchlist(sectorId));
    } else {
      dispatch(addSectorToWatchlist(sectorId));
    }
  };

  const handleCompanyPress = (companyId: string) => {
    navigation.navigate("CompanyDetails", { companyId });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text style={styles.loadingText}>
          {language === "pl" ? "Ładowanie..." : "Loading..."}
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {language === "pl" ? "Wystąpił błąd: " : "Error: "}
          {error}
        </Text>
      </View>
    );
  }

  if (!sector) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {language === "pl" ? "Nie znaleziono sektora" : "Sector not found"}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectorName}>{sector.name}</Text>
        <TouchableOpacity
          style={styles.watchlistButton}
          onPress={handleToggleWatchlist}
        >
          <Ionicons
            name={isInWatchlist ? "star" : "star-outline"}
            size={24}
            color={isInWatchlist ? "#FFD700" : "#666"}
          />
        </TouchableOpacity>
      </View>

      {sector.trends && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {language === "pl" ? "Trendy Sektora" : "Sector Trends"}
          </Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              {language === "pl" ? "Wzrost" : "Growth Rate"}:
            </Text>
            <Text style={styles.infoValue}>{sector.trends.growthRate}%</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              {language === "pl" ? "Średni Przychód" : "Average Revenue"}:
            </Text>
            <Text style={styles.infoValue}>
              {new Intl.NumberFormat("pl-PL", {
                style: "currency",
                currency: "PLN",
                maximumFractionDigits: 0,
              }).format(sector.trends.averageRevenue)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              {language === "pl" ? "Średnia Marża" : "Average Profit Margin"}:
            </Text>
            <Text style={styles.infoValue}>
              {sector.trends.averageProfitMargin}%
            </Text>
          </View>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {language === "pl" ? "Firmy w Sektorze" : "Companies in Sector"}
        </Text>
        {companies.length > 0 ? (
          companies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              onPress={handleCompanyPress}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>
            {language === "pl"
              ? "Brak firm w tym sektorze"
              : "No companies in this sector"}
          </Text>
        )}
      </View>

      <View style={styles.footer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
  },
  header: {
    backgroundColor: "white",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sectorName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  watchlistButton: {
    padding: 8,
  },
  section: {
    backgroundColor: "white",
    margin: 10,
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  infoLabel: {
    fontWeight: "bold",
    color: "#666",
    width: "50%",
  },
  infoValue: {
    color: "#333",
    flex: 1,
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    padding: 20,
  },
  footer: {
    height: 40,
  },
});

export default SectorDetailsScreen;
