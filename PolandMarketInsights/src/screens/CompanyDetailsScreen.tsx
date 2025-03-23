import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  addCompanyToWatchlist,
  removeCompanyFromWatchlist,
} from "../store/slices/userSlice";
import { Ionicons } from "@expo/vector-icons";
import api from "../services/api";
import { Company } from "../types";

const CompanyDetailsScreen = ({ route, navigation }) => {
  const { companyId } = route.params;
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const userWatchlist = useAppSelector(
    (state) => state.user.data?.watchlist.companies || []
  );
  const language = useAppSelector(
    (state) => state.user.data?.preferences.language || "pl"
  );

  const isInWatchlist = userWatchlist.includes(companyId);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const data = await api.getCompanyById(companyId);
        setCompany(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, [companyId]);

  const handleToggleWatchlist = () => {
    if (isInWatchlist) {
      dispatch(removeCompanyFromWatchlist(companyId));
    } else {
      dispatch(addCompanyToWatchlist(companyId));
    }
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

  if (!company) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {language === "pl" ? "Nie znaleziono firmy" : "Company not found"}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.companyName}>{company.name}</Text>
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

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {language === "pl" ? "Informacje Podstawowe" : "Basic Information"}
        </Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>KRS:</Text>
          <Text style={styles.infoValue}>{company.krsNumber}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>
            {language === "pl" ? "Branża" : "Industry"}:
          </Text>
          <Text style={styles.infoValue}>{company.industry}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>
            {language === "pl" ? "Adres" : "Address"}:
          </Text>
          <Text style={styles.infoValue}>{company.address}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>
            {language === "pl" ? "Status" : "Status"}:
          </Text>
          <Text style={styles.infoValue}>{company.legalStatus}</Text>
        </View>
      </View>

      {company.contactInfo && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {language === "pl" ? "Kontakt" : "Contact"}
          </Text>
          {company.contactInfo.phone && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                {language === "pl" ? "Telefon" : "Phone"}:
              </Text>
              <Text style={styles.infoValue}>{company.contactInfo.phone}</Text>
            </View>
          )}
          {company.contactInfo.email && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>{company.contactInfo.email}</Text>
            </View>
          )}
          {company.contactInfo.website && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                {language === "pl" ? "Strona www" : "Website"}:
              </Text>
              <Text style={styles.infoValue}>
                {company.contactInfo.website}
              </Text>
            </View>
          )}
        </View>
      )}

      {company.financials && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {language === "pl" ? "Dane Finansowe" : "Financial Data"}
          </Text>
          <View style={styles.financialInfo}>
            <Text style={styles.financialLabel}>
              {language === "pl" ? "Przychody" : "Revenue"} (
              {company.financials?.years.join(", ")})
            </Text>
            <View style={styles.financialDataRow}>
              {company.financials?.years.map((year, index) => (
                <View key={year} style={styles.financialDataItem}>
                  <Text style={styles.financialYear}>{year}</Text>
                  <Text style={styles.financialValue}>
                    {new Intl.NumberFormat("pl-PL", {
                      style: "currency",
                      currency: "PLN",
                      maximumFractionDigits: 0,
                    }).format(company.financials?.revenue[index] || 0)}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.financialInfo}>
            <Text style={styles.financialLabel}>
              {language === "pl" ? "Zysk" : "Profit"}
            </Text>
            <View style={styles.financialDataRow}>
              {company.financials?.years.map((year, index) => (
                <View key={year} style={styles.financialDataItem}>
                  <Text style={styles.financialYear}>{year}</Text>
                  <Text style={styles.financialValue}>
                    {new Intl.NumberFormat("pl-PL", {
                      style: "currency",
                      currency: "PLN",
                      maximumFractionDigits: 0,
                    }).format(company.financials?.profit[index] || 0)}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {company.financials?.marketShare && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                {language === "pl" ? "Udział w rynku" : "Market Share"}:
              </Text>
              <Text style={styles.infoValue}>
                {company.financials.marketShare}%
              </Text>
            </View>
          )}
        </View>
      )}

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
  companyName: {
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
    width: "35%",
  },
  infoValue: {
    color: "#333",
    flex: 1,
  },
  financialInfo: {
    marginVertical: 10,
  },
  financialLabel: {
    fontWeight: "bold",
    color: "#666",
    marginBottom: 10,
  },
  financialDataRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  financialDataItem: {
    alignItems: "center",
  },
  financialYear: {
    color: "#666",
    fontSize: 12,
  },
  financialValue: {
    color: "#0066cc",
    fontWeight: "bold",
    marginTop: 4,
  },
  footer: {
    height: 40,
  },
});

export default CompanyDetailsScreen;
