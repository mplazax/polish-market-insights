import axios from "axios";
import { Company, Sector, SearchQuery } from "../types";

// This is a placeholder for the actual API. In a real app, these endpoints would be real.
// For now, we'll use simulated data and setTimeout to mimic API calls.

const SIMULATED_API_DELAY = 1000; // milliseconds

// In a real app, this would be a configuration environment variable
// const API_BASE_URL = 'https://api.krs.gov.pl/v1';

class ApiService {
  // Companies
  async getCompanies(): Promise<Company[]> {
    // In a real app, this would be:
    // return axios.get(`${API_BASE_URL}/companies`).then(response => response.data);

    // Simulated API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "1",
            name: "Sample Polish Company",
            krsNumber: "KRS0000123456",
            address: "ul. Example 123, 00-000 Warsaw",
            industry: "Technology",
            legalStatus: "Active",
            financials: {
              revenue: [1200000, 1500000, 1800000],
              profit: [200000, 300000, 450000],
              years: ["2020", "2021", "2022"],
              profitMargin: [16.7, 20, 25],
              marketShare: 5.2,
            },
          },
          {
            id: "2",
            name: "Another Polish Business",
            krsNumber: "KRS0000789012",
            address: "ul. Sample 456, 00-000 Krakow",
            industry: "Retail",
            legalStatus: "Active",
          },
        ]);
      }, SIMULATED_API_DELAY);
    });
  }

  async getCompanyById(id: string): Promise<Company> {
    // In a real app: return axios.get(`${API_BASE_URL}/companies/${id}`).then(response => response.data);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (id === "1") {
          resolve({
            id: "1",
            name: "Sample Polish Company",
            krsNumber: "KRS0000123456",
            address: "ul. Example 123, 00-000 Warsaw",
            industry: "Technology",
            legalStatus: "Active",
            financials: {
              revenue: [1200000, 1500000, 1800000],
              profit: [200000, 300000, 450000],
              years: ["2020", "2021", "2022"],
              profitMargin: [16.7, 20, 25],
              marketShare: 5.2,
            },
            contactInfo: {
              phone: "+48 123 456 789",
              email: "contact@example.pl",
              website: "www.example.pl",
            },
          });
        } else if (id === "2") {
          resolve({
            id: "2",
            name: "Another Polish Business",
            krsNumber: "KRS0000789012",
            address: "ul. Sample 456, 00-000 Krakow",
            industry: "Retail",
            legalStatus: "Active",
            financials: {
              revenue: [5000000, 5200000, 5400000],
              profit: [300000, 310000, 350000],
              years: ["2020", "2021", "2022"],
              profitMargin: [6, 6, 6.5],
              marketShare: 3.1,
            },
          });
        } else {
          reject(new Error("Company not found"));
        }
      }, SIMULATED_API_DELAY);
    });
  }

  async searchCompanies(query: SearchQuery): Promise<Company[]> {
    // In a real app: return axios.get(`${API_BASE_URL}/companies/search`, { params: query }).then(...)

    return new Promise((resolve) => {
      setTimeout(() => {
        // Simple search simulation based on company name containing the query term
        const results = [
          {
            id: "1",
            name: "Sample Polish Company",
            krsNumber: "KRS0000123456",
            address: "ul. Example 123, 00-000 Warsaw",
            industry: "Technology",
            legalStatus: "Active",
          },
          {
            id: "2",
            name: "Another Polish Business",
            krsNumber: "KRS0000789012",
            address: "ul. Sample 456, 00-000 Krakow",
            industry: "Retail",
            legalStatus: "Active",
          },
        ].filter(
          (company) =>
            company.name.toLowerCase().includes(query.term.toLowerCase()) ||
            (query.filters?.industry &&
              company.industry.toLowerCase() ===
                query.filters.industry.toLowerCase())
        );

        resolve(results);
      }, SIMULATED_API_DELAY / 2); // Faster search response
    });
  }

  // Sectors
  async getSectors(): Promise<Sector[]> {
    // In a real app: return axios.get(`${API_BASE_URL}/sectors`).then(...)

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "1",
            name: "Technology",
            companies: ["1"],
            trends: {
              growthRate: 12.5,
              averageRevenue: 2500000,
              averageProfitMargin: 18.3,
            },
          },
          {
            id: "2",
            name: "Retail",
            companies: ["2"],
            trends: {
              growthRate: 3.2,
              averageRevenue: 5800000,
              averageProfitMargin: 5.7,
            },
          },
          {
            id: "3",
            name: "Manufacturing",
            companies: [],
            trends: {
              growthRate: 2.1,
              averageRevenue: 12500000,
              averageProfitMargin: 8.2,
            },
          },
        ]);
      }, SIMULATED_API_DELAY);
    });
  }

  async getSectorById(id: string): Promise<Sector> {
    // In a real app: return axios.get(`${API_BASE_URL}/sectors/${id}`).then(...)

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (id === "1") {
          resolve({
            id: "1",
            name: "Technology",
            companies: ["1"],
            trends: {
              growthRate: 12.5,
              averageRevenue: 2500000,
              averageProfitMargin: 18.3,
            },
          });
        } else if (id === "2") {
          resolve({
            id: "2",
            name: "Retail",
            companies: ["2"],
            trends: {
              growthRate: 3.2,
              averageRevenue: 5800000,
              averageProfitMargin: 5.7,
            },
          });
        } else if (id === "3") {
          resolve({
            id: "3",
            name: "Manufacturing",
            companies: [],
            trends: {
              growthRate: 2.1,
              averageRevenue: 12500000,
              averageProfitMargin: 8.2,
            },
          });
        } else {
          reject(new Error("Sector not found"));
        }
      }, SIMULATED_API_DELAY);
    });
  }
}

export default new ApiService();
