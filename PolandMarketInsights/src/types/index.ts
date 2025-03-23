// Company types
export interface Company {
  id: string;
  name: string;
  krsNumber: string;
  address: string;
  industry: string;
  financials?: CompanyFinancials;
  legalStatus: string;
  contactInfo?: ContactInfo;
}

export interface CompanyFinancials {
  revenue: number[];
  profit: number[];
  years: string[];
  profitMargin?: number[];
  marketShare?: number;
}

export interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
}

// Sector types
export interface Sector {
  id: string;
  name: string;
  companies: string[];
  trends?: SectorTrends;
}

export interface SectorTrends {
  growthRate: number;
  averageRevenue: number;
  averageProfitMargin: number;
}

// User types
export interface User {
  id: string;
  watchlist: {
    companies: string[];
    sectors: string[];
  };
  preferences: {
    language: "pl" | "en";
    notifications: boolean;
  };
}

// Search types
export interface SearchQuery {
  term: string;
  filters?: {
    industry?: string;
    location?: string;
    revenueMin?: number;
    revenueMax?: number;
  };
}

export interface SearchResults {
  companies: Company[];
  sectors: Sector[];
}
