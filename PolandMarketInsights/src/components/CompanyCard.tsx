import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Company } from "../types";

interface CompanyCardProps {
  company: Company;
  onPress: (companyId: string) => void;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(company.id)}
      testID={`company-card-${company.id}`}
    >
      <View style={styles.header}>
        <Text style={styles.name}>{company.name}</Text>
        <Text style={styles.krsNumber}>KRS: {company.krsNumber}</Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.industry}>Branża: {company.industry}</Text>
        <Text style={styles.address}>{company.address}</Text>
        <Text style={styles.status}>Status: {company.legalStatus}</Text>
      </View>

      {company.financials && (
        <View style={styles.financials}>
          <Text style={styles.financialText}>
            Przychód (ostatni rok):{" "}
            {new Intl.NumberFormat("pl-PL", {
              style: "currency",
              currency: "PLN",
              maximumFractionDigits: 0,
            }).format(
              company.financials.revenue[company.financials.revenue.length - 1]
            )}
          </Text>
          {company.financials.marketShare && (
            <Text style={styles.financialText}>
              Udział w rynku: {company.financials.marketShare}%
            </Text>
          )}
        </View>
      )}
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
  krsNumber: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  details: {
    marginBottom: 12,
  },
  industry: {
    fontSize: 16,
    color: "#444",
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    color: "#666",
  },
  financials: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 12,
  },
  financialText: {
    fontSize: 14,
    color: "#0066cc",
    marginBottom: 4,
  },
});

export default CompanyCard;
