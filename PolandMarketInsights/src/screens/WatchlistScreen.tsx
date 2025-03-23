import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useAppSelector } from "../store/hooks";
import CompanyCard from "../components/CompanyCard";
import SectorCard from "../components/SectorCard";
import api from "../services/api";
import { Company, Sector } from "../types";

const WatchlistScreen = ({ navigation }) => {
  const [watchlistCompanies, setWatchlistCompanies] = useState<Company[]>([]);
  const [watchlistSectors, setWatchlistSectors] = useState<Sector[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const watchlist = useAppSelector((state) => state.user.data?.watchlist);
  const language = useAppSelector(
    (state) => state.user.data?.preferences.language || "pl"
  );

  useEffect(() => {
    const fetchWatchlistData = async () => {
      if (!watchlist) return;

      setLoading(true);
      setError(null);

      try {
        // Fetch companies in watchlist
        if (watchlist.companies.length > 0) {
          const companyPromises = watchlist.companies.map((id) =>
            api.getCompanyById(id)
          );
          const companies = await Promise.all(companyPromises);
          setWatchlistCompanies(companies);
        } else {
          setWatchlistCompanies([]);
        }

        // Fetch sectors in watchlist
        if (watchlist.sectors.length > 0) {
          const sectorPromises = watchlist.sectors.map((id) =>
            api.getSectorById(id)
          );
          const sectors = await Promise.all(sectorPromises);
          setWatchlistSectors(sectors);
        } else {
          setWatchlistSectors([]);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlistData();
  }, [watchlist]);

  const handleCompanyPress = (companyId: string) => {
    navigation.navigate("CompanyDetails", { companyId });
  };

  const handleSectorPress = (sectorId: string) => {
    navigation.navigate("SectorDetails", { sectorId });
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {language === "pl"
          ? "Twoja lista obserwowanych jest pusta."
          : "Your watchlist is empty."}
      </Text>
      <Text style={styles.emptySubText}>
        {language === "pl"
          ? "Dodaj firmy i sektory do listy, aby śledzić ich aktualizacje."
          : "Add companies and sectors to keep track of updates."}
      </Text>
    </View>
  );

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

  return (
    <View style={styles.container}>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {language === "pl" ? "Wystąpił błąd: " : "Error: "}
            {error}
          </Text>
        </View>
      ) : (
        <FlatList
          data={[]}
          ListHeaderComponent={() => (
            <>
              {watchlistCompanies.length === 0 &&
              watchlistSectors.length === 0 ? (
                renderEmptyList()
              ) : (
                <>
                  {watchlistCompanies.length > 0 && (
                    <View style={styles.section}>
                      <Text style={styles.sectionTitle}>
                        {language === "pl"
                          ? "Obserwowane Firmy"
                          : "Watched Companies"}
                      </Text>
                      {watchlistCompanies.map((company) => (
                        <CompanyCard
                          key={company.id}
                          company={company}
                          onPress={handleCompanyPress}
                        />
                      ))}
                    </View>
                  )}

                  {watchlistSectors.length > 0 && (
                    <View style={styles.section}>
                      <Text style={styles.sectionTitle}>
                        {language === "pl"
                          ? "Obserwowane Sektory"
                          : "Watched Sectors"}
                      </Text>
                      {watchlistSectors.map((sector) => (
                        <SectorCard
                          key={sector.id}
                          sector={sector}
                          onPress={handleSectorPress}
                        />
                      ))}
                    </View>
                  )}
                </>
              )}
            </>
          )}
          renderItem={() => null}
        />
      )}
    </View>
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
  emptyContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 10,
    textAlign: "center",
  },
  emptySubText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    color: "#333",
  },
});

export default WatchlistScreen;
