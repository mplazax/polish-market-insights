import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchCompanies } from "../store/slices/companiesSlice";
import { fetchSectors } from "../store/slices/sectorsSlice";
import SearchBar from "../components/SearchBar";
import CompanyCard from "../components/CompanyCard";
import SectorCard from "../components/SectorCard";

const HomeScreen = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const companies = useAppSelector((state) => state.companies.items);
  const sectors = useAppSelector((state) => state.sectors.items);
  const isLoading = useAppSelector(
    (state) => state.companies.loading || state.sectors.loading
  );
  const userLanguage = useAppSelector(
    (state) => state.user.data?.preferences.language
  );

  useEffect(() => {
    dispatch(fetchCompanies());
    dispatch(fetchSectors());
  }, [dispatch]);

  const handleCompanyPress = (companyId: string) => {
    navigation.navigate("CompanyDetails", { companyId });
  };

  const handleSectorPress = (sectorId: string) => {
    navigation.navigate("SectorDetails", { sectorId });
  };

  const renderCompanyItem = ({ item }) => (
    <CompanyCard company={item} onPress={handleCompanyPress} />
  );

  const renderSectorItem = ({ item }) => (
    <SectorCard sector={item} onPress={handleSectorPress} />
  );

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder={
          userLanguage === "pl"
            ? "Szukaj firm, branż..."
            : "Search companies, sectors..."
        }
      />

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>
            {userLanguage === "pl" ? "Ładowanie..." : "Loading..."}
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {userLanguage === "pl" ? "Polskie Firmy" : "Polish Companies"}
            </Text>
            <FlatList
              data={companies.slice(0, 3)}
              renderItem={renderCompanyItem}
              keyExtractor={(item) => item.id}
              horizontal={false}
              scrollEnabled={false}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {userLanguage === "pl" ? "Sektory Rynkowe" : "Market Sectors"}
            </Text>
            <FlatList
              data={sectors}
              renderItem={renderSectorItem}
              keyExtractor={(item) => item.id}
              horizontal={false}
              scrollEnabled={false}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#666",
  },
});

export default HomeScreen;
